import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";

interface Row { id: string; key: string; label: string; value: string; group_name: string; sort_order: number; }

export default function AdminStrings() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin_strings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("app_strings").select("*").order("group_name").order("sort_order");
      if (error) throw error;
      return data as Row[];
    },
  });

  const [edits, setEdits] = useState<Record<string, string>>({});

  useEffect(() => {
    if (data) {
      const init: Record<string, string> = {};
      data.forEach((r) => (init[r.id] = r.value));
      setEdits(init);
    }
  }, [data]);

  if (isLoading || !data) return <p className="text-sm text-muted-foreground">Loading…</p>;

  const groups = Array.from(new Set(data.map((r) => r.group_name)));

  const save = async (row: Row) => {
    const { error } = await supabase.from("app_strings").update({ value: edits[row.id], updated_at: new Date().toISOString() }).eq("id", row.id);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    toast({ title: "Saved", description: row.label });
    qc.invalidateQueries({ queryKey: ["app_strings"] });
    qc.invalidateQueries({ queryKey: ["admin_strings"] });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">App strings</h2>
        <p className="text-sm text-muted-foreground">Edit text shown across the app: home page, onboarding, tagline.</p>
      </div>
      {groups.map((g) => (
        <Card key={g} className="p-5">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-muted-foreground">{g}</h3>
          <div className="space-y-4">
            {data.filter((r) => r.group_name === g).map((row) => (
              <div key={row.id} className="grid gap-2">
                <Label className="text-xs">{row.label} <span className="text-muted-foreground">({row.key})</span></Label>
                <div className="flex gap-2">
                  {edits[row.id]?.length > 60 ? (
                    <Textarea rows={3} value={edits[row.id] ?? ""} onChange={(e) => setEdits({ ...edits, [row.id]: e.target.value })} />
                  ) : (
                    <Input value={edits[row.id] ?? ""} onChange={(e) => setEdits({ ...edits, [row.id]: e.target.value })} />
                  )}
                  <Button size="sm" onClick={() => save(row)} disabled={edits[row.id] === row.value}>
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
