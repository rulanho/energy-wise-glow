import { motion } from "framer-motion";
import { ArrowLeft, HelpCircle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

interface FAQItem {
  q: string;
  a: React.ReactNode;
  category: string;
  keywords: string;
}

const faqs: FAQItem[] = [
  {
    category: "Purpose",
    keywords: "why introduced reduce electricity cost co2 emissions manufacturers",
    q: "Why has Appliance Standards and Labelling been introduced?",
    a: (
      <ul className="list-disc space-y-1 pl-5">
        <li>Reduce electricity used to run appliances in South Africa.</li>
        <li>Reduce the cost to consumers of using appliances.</li>
        <li>Reduce CO₂ emissions from power stations.</li>
        <li>Incentivise manufacturers to produce more efficient appliances.</li>
      </ul>
    ),
  },
  {
    category: "Purpose",
    keywords: "objectives minimum energy performance consumer understanding",
    q: "What are the objectives of Appliance Standards and Labelling?",
    a: (
      <ul className="list-disc space-y-1 pl-5">
        <li>Ensure appliances sold in SA meet minimum energy performance standards.</li>
        <li>Help consumers easily understand an appliance's energy use before buying.</li>
      </ul>
    ),
  },
  {
    category: "Governance",
    keywords: "sabs nrcs department energy responsible implementing gef undp funding",
    q: "Who is responsible for implementing Appliance Standards and Labelling?",
    a: (
      <p>
        The <span className="font-semibold text-foreground">Department of Energy</span> oversees
        the programme, funded by the GEF and administered by the UNDP. Implementation is shared
        by the <span className="font-semibold text-foreground">SABS</span> (sets standards and
        tests appliances) and the{" "}
        <span className="font-semibold text-foreground">NRCS</span> (enforces the regulations).
      </p>
    ),
  },
  {
    category: "Legislation",
    keywords: "national energy act 34 2008 vc 9110 9109 8043 9006 9008 9091 regulations",
    q: "What legislation regulates Appliance Standards and Labelling?",
    a: (
      <>
        <p>
          The <span className="font-semibold text-foreground">National Energy Act No 34 of 2008</span>{" "}
          empowers the Minister to regulate energy efficiency labelling and ban inefficient
          products. Key compulsory specifications (VCs):
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>VC 9110 / 9109 — General Service Lamps (safety &amp; efficiency), 2023</li>
          <li>VC 8043 — Incandescent Lamps, 2014</li>
          <li>VC 9006 — Hot Water Storage Tanks, 2016</li>
          <li>VC 9008 — Energy Efficiency &amp; Labelling of Electrical Apparatus, 2014</li>
          <li>VC 9091 — Single-Capped Fluorescent Lamps, 2014</li>
        </ul>
      </>
    ),
  },
  {
    category: "Appliances",
    keywords: "which appliances label fridge freezer aircon dishwasher washing machine bulb",
    q: "Which appliances must display a SA Energy Efficiency Label?",
    a: (
      <ul className="list-disc space-y-1 pl-5">
        <li>Air Conditioners</li>
        <li>Dishwashers</li>
        <li>Electric Ovens</li>
        <li>Fridges &amp; Freezers</li>
        <li>Storage Water Heaters</li>
        <li>Tumble Dryers, Washer-dryers &amp; Washing Machines</li>
        <li>Light bulbs (optional)</li>
      </ul>
    ),
  },
  {
    category: "Labelling",
    keywords: "label specifications design size sabs guide retailers manufacturers",
    q: "Are there specifications for how the label should look?",
    a: (
      <p>
        Yes — design and use of the label are set out in SABS national standards. See the{" "}
        <a
          href="https://www.savingenergy.org.za/wp-content/uploads/2017/11/A-guide-to-energy-efficiency-labelling.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline"
        >
          guide to energy efficiency labelling
        </a>
        . Most labels are 110×200 mm; light bulb labels are 55×100 mm.
      </p>
    ),
  },
  {
    category: "Costs",
    keywords: "cost energy run appliance calculator long term",
    q: "What would the cost be of the energy required to run an appliance?",
    a: (
      <p>
        These calculators help you estimate the long-term running cost and CO₂ emissions of an
        appliance, so you can make a more informed purchase decision.
      </p>
    ),
  },
  {
    category: "Standards",
    keywords: "meps minimum energy performance standards class b aircon ratings",
    q: "What are Minimum Energy Performance Standards (MEPS)?",
    a: (
      <>
        <p>
          MEPS define the minimum energy performance an appliance must meet to be sold in SA.
          Selling appliances below MEPS is illegal. Examples:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Air Conditioners — Class B+</li>
          <li>Dishwashers, Washing Machines, Washer-dryers — Class A</li>
          <li>Fridges &amp; Fridge-freezers — Class B</li>
          <li>Freezers — Class C</li>
          <li>Storage Water Heater — Class B</li>
          <li>Tumble Dryers — Class D</li>
          <li>Audio-visual Equipment — ≤1 W standby</li>
        </ul>
      </>
    ),
  },
  {
    category: "Standards",
    keywords: "loa letter authority nrcs manufacturer importer 3 years",
    q: "What is a Letter of Authority (LOA)?",
    a: (
      <p>
        Manufacturers and importers must hold an LOA from the NRCS confirming the appliance meets
        MEPS before it can be sold in SA. LOAs are valid for 3 years.
      </p>
    ),
  },
  {
    category: "Compliance",
    keywords: "non compliance recall confiscate destroy regulations",
    q: "What happens if manufacturers do not conform?",
    a: (
      <p>
        The NRCS can recall non-conforming products, return imports to their country of origin,
        or order them to be confiscated or destroyed.
      </p>
    ),
  },
  {
    category: "Compliance",
    keywords: "report non compliance false label nrcs",
    q: "How can non-compliance be reported?",
    a: (
      <p>
        False labels or non-compliant appliances can be reported to the{" "}
        <a href="mailto:info@nrcs.org.za" className="font-medium text-primary underline">
          NRCS
        </a>
        .
      </p>
    ),
  },
  {
    category: "Compliance",
    keywords: "border sars customs excise prevent imports loa nrcs",
    q: "How are non-compliant appliances kept out of SA?",
    a: (
      <p>
        Through an agreement with SARS Customs &amp; Excise, no importer is granted market entry
        for in-scope appliances without a valid LOA from the NRCS.
      </p>
    ),
  },
];

const CATEGORY_ORDER = [
  "Purpose",
  "Governance",
  "Legislation",
  "Appliances",
  "Labelling",
  "Standards",
  "Costs",
  "Compliance",
];

export default function FAQ() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [openCategory, setOpenCategory] = useState<string | undefined>("Purpose");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter(
      (f) =>
        f.q.toLowerCase().includes(q) ||
        f.keywords.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q),
    );
  }, [query]);

  // Group by category
  const grouped = useMemo(() => {
    const map = new Map<string, FAQItem[]>();
    filtered.forEach((f) => {
      if (!map.has(f.category)) map.set(f.category, []);
      map.get(f.category)!.push(f);
    });
    // Sort categories by predefined order
    return Array.from(map.entries()).sort(
      (a, b) => CATEGORY_ORDER.indexOf(a[0]) - CATEGORY_ORDER.indexOf(b[0]),
    );
  }, [filtered]);

  // When searching, expand all categories that have matches
  const searching = query.trim().length > 0;
  const categoryValue = searching ? grouped.map(([c]) => c) : openCategory ? [openCategory] : [];

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="eco-gradient px-5 pb-10 pt-14">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-foreground/20 transition-colors hover:bg-primary-foreground/30"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-5 w-5 text-primary-foreground" />
          </button>
          <h1 className="text-lg font-bold text-primary-foreground">FAQs</h1>
        </div>
      </header>

      <main className="-mt-6 rounded-t-3xl bg-background px-5 pt-7">
        <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-foreground">
          Frequently Asked
          <br />
          Questions:
        </h2>

        {/* Search */}
        <div className="relative mt-5">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions…"
            className="h-11 rounded-2xl border-0 bg-muted pl-9 text-sm shadow-none focus-visible:ring-2 focus-visible:ring-primary/40"
          />
        </div>

        {grouped.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center"
          >
            <HelpCircle className="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm font-medium text-foreground">No results found</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Try a different search term.
            </p>
          </motion.div>
        ) : (
          <Accordion
            type="multiple"
            value={categoryValue}
            onValueChange={(vals) => {
              if (searching) return;
              // single-category open behaviour
              const last = vals[vals.length - 1];
              setOpenCategory(last);
            }}
            className="mt-6 w-full space-y-3"
          >
            {grouped.map(([category, items], catIdx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIdx * 0.04, duration: 0.25 }}
              >
                <AccordionItem
                  value={category}
                  className="overflow-hidden rounded-2xl border-0 bg-muted/60 px-4 shadow-none data-[state=open]:bg-muted"
                >
                  <AccordionTrigger className="py-4 text-left text-sm font-bold text-foreground hover:no-underline">
                    <span className="flex items-center gap-2">
                      {category} related questions:
                      <span className="rounded-full bg-background/70 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                        {items.length}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-1">
                    <div className="space-y-2 pb-2">
                      {items.map((item, i) => (
                        <FAQQuestion key={item.q} item={item} index={i} />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        )}
      </main>
    </div>
  );
}

function FAQQuestion({ item, index }: { item: FAQItem; index: number }) {
  return (
    <Accordion type="single" collapsible defaultValue={index === 0 ? "q" : undefined}>
      <AccordionItem
        value="q"
        className="overflow-hidden rounded-xl border-0 bg-card px-3 shadow-card data-[state=open]:shadow-md"
      >
        <AccordionTrigger className="py-3 text-left text-xs font-semibold text-foreground hover:no-underline">
          {item.q}
        </AccordionTrigger>
        <AccordionContent className="border-t border-border/40 pt-3 text-xs leading-relaxed text-muted-foreground">
          {item.a}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
