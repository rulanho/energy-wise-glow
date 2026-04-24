import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/RichTextEditor";
import { toast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

interface Section { id: string; key: string; title: string; body_html: string; sort_order: number; }

export default function AdminAbout() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin_about"],
    queryFn: async () => {
      const { data, error } = await supabase.from("about_sections").select("*").order("sort_order");
      if (error) throw error;
      return data as Section[];
    },
  });

  if (!data) return <p className="text-sm text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">About page</h2>
        <p className="text-sm text-muted-foreground">Edit the content blocks shown on the About screen.</p>
      </div>
      {data.map((s) => (
        <SectionRow key={s.id} section={s} onSaved={() => {
          qc.invalidateQueries({ queryKey: ["admin_about"] });
          qc.invalidateQueries({ queryKey: ["about_sections"] });
        }} />
      ))}
    </div>
  );
}

function SectionRow({ section, onSaved }: { section: Section; onSaved: () => void }) {
  const [title, setTitle] = useState(section.title);
  const [body, setBody] = useState(section.body_html);
  useEffect(() => { setTitle(section.title); setBody(section.body_html); }, [section.id]);

  const dirty = title !== section.title || body !== section.body_html;

  const save = async () => {
    const { error } = await supabase.from("about_sections").update({ title, body_html: body, updated_at: new Date().toISOString() }).eq("id", section.id);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    toast({ title: "Saved" });
    onSaved();
  };

  return (
    <Card className="p-5">
      <div className="mb-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{section.key}</div>
      <div className="space-y-3">
        <div>
          <Label className="text-xs">Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <Label className="text-xs">Body</Label>
          <RichTextEditor value={body} onChange={setBody} />
        </div>
        <Button onClick={save} disabled={!dirty}><Save className="h-4 w-4" /> Save</Button>
      </div>
    </Card>
  );
}
