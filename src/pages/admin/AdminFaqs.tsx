import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/RichTextEditor";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, Save, ChevronDown, ChevronRight } from "lucide-react";

interface Faq { id: string; category: string; question: string; answer_html: string; keywords: string; icon_name: string; sort_order: number; }

export default function AdminFaqs() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin_faqs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("faqs").select("*").order("sort_order");
      if (error) throw error;
      return data as Faq[];
    },
  });

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ["admin_faqs"] });
    qc.invalidateQueries({ queryKey: ["faqs"] });
  };

  const add = async () => {
    const { error } = await supabase.from("faqs").insert({
      category: "General",
      question: "New question",
      answer_html: "<p>Answer here…</p>",
      keywords: "",
      icon_name: "HelpCircle",
      sort_order: (data?.length ?? 0) + 1,
    });
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this FAQ?")) return;
    const { error } = await supabase.from("faqs").delete().eq("id", id);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    refresh();
  };

  if (!data) return <p className="text-sm text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">FAQs</h2>
          <p className="text-sm text-muted-foreground">Add, edit, reorder, or delete questions.</p>
        </div>
        <Button onClick={add}><Plus className="h-4 w-4" /> Add FAQ</Button>
      </div>
      <div className="space-y-3">
        {data.map((f) => (
          <FaqRow key={f.id} faq={f} onDelete={() => remove(f.id)} onSaved={refresh} />
        ))}
      </div>
    </div>
  );
}

function FaqRow({ faq, onDelete, onSaved }: { faq: Faq; onDelete: () => void; onSaved: () => void }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(faq);
  const dirty = JSON.stringify(draft) !== JSON.stringify(faq);

  const save = async () => {
    const { error } = await supabase.from("faqs").update({
      category: draft.category,
      question: draft.question,
      answer_html: draft.answer_html,
      keywords: draft.keywords,
      icon_name: draft.icon_name,
      sort_order: draft.sort_order,
      updated_at: new Date().toISOString(),
    }).eq("id", faq.id);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    toast({ title: "Saved" });
    onSaved();
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2">
        <button onClick={() => setOpen(!open)} className="flex flex-1 items-center gap-2 text-left">
          {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          <span className="text-xs font-semibold uppercase text-muted-foreground">{faq.category}</span>
          <span className="text-sm font-medium">{faq.question}</span>
        </button>
        <Button size="sm" variant="ghost" onClick={onDelete}><Trash2 className="h-4 w-4 text-destructive" /></Button>
      </div>
      {open && (
        <div className="mt-4 space-y-3 border-t pt-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <Label className="text-xs">Category</Label>
              <Input value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs">Icon (lucide name)</Label>
              <Input value={draft.icon_name} onChange={(e) => setDraft({ ...draft, icon_name: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs">Order</Label>
              <Input type="number" value={draft.sort_order} onChange={(e) => setDraft({ ...draft, sort_order: parseInt(e.target.value) || 0 })} />
            </div>
          </div>
          <div>
            <Label className="text-xs">Question</Label>
            <Input value={draft.question} onChange={(e) => setDraft({ ...draft, question: e.target.value })} />
          </div>
          <div>
            <Label className="text-xs">Answer</Label>
            <RichTextEditor value={draft.answer_html} onChange={(v) => setDraft({ ...draft, answer_html: v })} />
          </div>
          <div>
            <Label className="text-xs">Search keywords</Label>
            <Input value={draft.keywords} onChange={(e) => setDraft({ ...draft, keywords: e.target.value })} />
          </div>
          <Button onClick={save} disabled={!dirty}><Save className="h-4 w-4" /> Save changes</Button>
        </div>
      )}
    </Card>
  );
}
