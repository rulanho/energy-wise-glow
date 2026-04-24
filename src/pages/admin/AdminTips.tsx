import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, Save } from "lucide-react";

interface Tip { id: string; season: string; appliance: string; body: string; sort_order: number; }

function TipsList({ season }: { season: "summer" | "winter" }) {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin_tips", season],
    queryFn: async () => {
      const { data, error } = await supabase.from("tips").select("*").eq("season", season).order("appliance").order("sort_order");
      if (error) throw error;
      return data as Tip[];
    },
  });
  const [newAppliance, setNewAppliance] = useState("");
  const [newBody, setNewBody] = useState("");

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ["admin_tips", season] });
    qc.invalidateQueries({ queryKey: ["tips", season] });
  };

  const add = async () => {
    if (!newAppliance || !newBody) return;
    const { error } = await supabase.from("tips").insert({ season, appliance: newAppliance, body: newBody });
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    setNewAppliance(""); setNewBody("");
    toast({ title: "Tip added" });
    refresh();
  };

  const update = async (id: string, fields: Partial<Tip>) => {
    const { error } = await supabase.from("tips").update({ ...fields, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    toast({ title: "Saved" });
    refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this tip?")) return;
    const { error } = await supabase.from("tips").delete().eq("id", id);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    refresh();
  };

  if (!data) return <p className="text-sm text-muted-foreground">Loading…</p>;

  // group by appliance for display
  const grouped = new Map<string, Tip[]>();
  data.forEach((t) => {
    if (!grouped.has(t.appliance)) grouped.set(t.appliance, []);
    grouped.get(t.appliance)!.push(t);
  });

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="mb-3 text-sm font-bold">Add new tip</h3>
        <div className="grid gap-2 sm:grid-cols-[200px_1fr_auto]">
          <Input placeholder="Appliance" value={newAppliance} onChange={(e) => setNewAppliance(e.target.value)} />
          <Input placeholder="Tip text" value={newBody} onChange={(e) => setNewBody(e.target.value)} />
          <Button onClick={add}><Plus className="h-4 w-4" /> Add</Button>
        </div>
      </Card>
      {Array.from(grouped.entries()).map(([appliance, tips]) => (
        <Card key={appliance} className="p-4">
          <h3 className="mb-3 text-sm font-bold">{appliance}</h3>
          <div className="space-y-2">
            {tips.map((t) => (
              <TipRow key={t.id} tip={t} onSave={(body, app, order) => update(t.id, { body, appliance: app, sort_order: order })} onDelete={() => remove(t.id)} />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function TipRow({ tip, onSave, onDelete }: { tip: Tip; onSave: (body: string, appliance: string, order: number) => void; onDelete: () => void }) {
  const [body, setBody] = useState(tip.body);
  const [appliance, setAppliance] = useState(tip.appliance);
  const [order, setOrder] = useState(tip.sort_order);
  const dirty = body !== tip.body || appliance !== tip.appliance || order !== tip.sort_order;
  return (
    <div className="grid gap-2 rounded-md border bg-background p-2 sm:grid-cols-[160px_60px_1fr_auto_auto]">
      <Input value={appliance} onChange={(e) => setAppliance(e.target.value)} />
      <Input type="number" value={order} onChange={(e) => setOrder(parseInt(e.target.value) || 0)} />
      <Textarea rows={1} value={body} onChange={(e) => setBody(e.target.value)} className="min-h-[40px]" />
      <Button size="sm" disabled={!dirty} onClick={() => onSave(body, appliance, order)}><Save className="h-4 w-4" /></Button>
      <Button size="sm" variant="ghost" onClick={onDelete}><Trash2 className="h-4 w-4 text-destructive" /></Button>
    </div>
  );
}

export default function AdminTips() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Energy-saving tips</h2>
        <p className="text-sm text-muted-foreground">Manage seasonal tips by appliance.</p>
      </div>
      <Tabs defaultValue="summer">
        <TabsList>
          <TabsTrigger value="summer">Summer</TabsTrigger>
          <TabsTrigger value="winter">Winter</TabsTrigger>
        </TabsList>
        <TabsContent value="summer" className="mt-4"><TipsList season="summer" /></TabsContent>
        <TabsContent value="winter" className="mt-4"><TipsList season="winter" /></TabsContent>
      </Tabs>
    </div>
  );
}
