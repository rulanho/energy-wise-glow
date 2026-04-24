import { motion } from "framer-motion";
import {
  ArrowLeft, HelpCircle, Search,
  Target, Building2, Scale, Refrigerator, Tag, Wallet, Gauge, FileCheck, ShieldAlert, Megaphone, ShipWheel,
  type LucideIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { useFaqs } from "@/hooks/useContent";
import { cleanHtml } from "@/lib/sanitize";

const ICONS: Record<string, LucideIcon> = {
  Target, Building2, Scale, Refrigerator, Tag, Wallet, Gauge, FileCheck, ShieldAlert, Megaphone, ShipWheel, HelpCircle,
};

export default function FAQ() {
  const navigate = useNavigate();
  const { data: faqs = [] } = useFaqs();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    faqs.forEach((f) => set.add(f.category));
    return Array.from(set);
  }, [faqs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((f) => {
      const matchesCategory = activeCategory === "All" || f.category === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        f.question.toLowerCase().includes(q) ||
        (f.keywords ?? "").toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
      );
    });
  }, [query, activeCategory, faqs]);

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="eco-gradient px-5 pb-16 pt-14">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/")} className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-foreground/20 transition-colors hover:bg-primary-foreground/30" aria-label="Back to home">
            <ArrowLeft className="h-5 w-5 text-primary-foreground" />
          </button>
          <h1 className="text-lg font-bold text-primary-foreground">FAQs</h1>
        </div>

        <div className="mt-6 flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-foreground/15 backdrop-blur">
            <HelpCircle className="h-6 w-6 text-secondary" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-primary-foreground">How can we help you?</h2>
            <p className="mt-1 text-sm text-primary-foreground/80">Common questions about appliance energy standards &amp; labelling.</p>
          </div>
        </div>
      </header>

      <main className="-mt-10 rounded-t-3xl bg-background px-5 pt-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search questions…" className="h-12 rounded-2xl border-0 bg-muted pl-9 text-sm shadow-card focus-visible:ring-2 focus-visible:ring-primary/40" />
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${active ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <p className="mt-5 text-xs font-medium text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "question" : "questions"}
          {activeCategory !== "All" && ` in ${activeCategory}`}
        </p>

        {filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center">
            <HelpCircle className="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm font-medium text-foreground">No results found</p>
            <p className="mt-1 text-xs text-muted-foreground">Try a different search term or category.</p>
          </motion.div>
        ) : (
          <div className="mt-3 w-full space-y-3">
            {filtered.map((item, i) => {
              const Icon = ICONS[item.icon_name] ?? HelpCircle;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.03, 0.2), duration: 0.22 }}
                  className="rounded-2xl border border-border/60 bg-card shadow-card transition-shadow hover:shadow-md"
                >
                  <Accordion type="single" collapsible>
                    <AccordionItem value="q" className="border-0">
                      <AccordionTrigger className="px-4 py-4 text-left text-sm font-semibold text-foreground hover:no-underline [&>svg]:text-primary">
                        <span className="flex items-start gap-3 pr-2">
                          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Icon className="h-[18px] w-[18px]" />
                          </span>
                          <span className="flex flex-col items-start gap-1.5">
                            <span className="inline-flex items-center rounded-full bg-secondary/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-secondary-foreground">
                              {item.category}
                            </span>
                            <span className="leading-snug">{item.question}</span>
                          </span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="mx-4 border-t border-border/40 pb-4 pt-3 text-xs leading-relaxed text-muted-foreground">
                        <div className="prose prose-sm max-w-none [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
                             dangerouslySetInnerHTML={{ __html: cleanHtml(item.answer_html) }} />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
