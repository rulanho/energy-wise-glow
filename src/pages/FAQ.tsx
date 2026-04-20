import { motion } from "framer-motion";
import { ArrowLeft, HelpCircle, Search, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface FAQItem {
  q: string;
  a: React.ReactNode;
  category: string;
  keywords: string;
}

const faqs: FAQItem[] = [
  {
    category: "Governance",
    keywords: "sabs nrcs department energy responsible implementing",
    q: "Who is responsible for implementing Appliance Standards and Labelling?",
    a: (
      <>
        The Department of Energy has primary responsibility for establishing and overseeing
        Appliance Standards and Labelling. Implementation is shared by the{" "}
        <span className="font-semibold text-foreground">South African Bureau of Standards (SABS)</span>
        , which sets national standards and test procedures, and the{" "}
        <span className="font-semibold text-foreground">
          National Regulator for Compulsory Specifications (NRCS)
        </span>
        , which enforces and administers the regulations.
      </>
    ),
  },
  {
    category: "Purpose",
    keywords: "why introduced reduce electricity cost co2 emissions manufacturers",
    q: "Why has Appliance Standards and Labelling been introduced?",
    a: (
      <ul className="list-disc space-y-1 pl-5">
        <li>Reduce the amount of electricity used to run appliances in South Africa.</li>
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
        <li>Ensure appliances sold in South Africa meet minimum energy performance standards.</li>
        <li>
          Ensure consumers can easily understand the likely energy consumption of an appliance
          before purchase.
        </li>
      </ul>
    ),
  },
  {
    category: "Legislation",
    keywords: "national energy act 34 2008 vc 9110 9109 8043 9006 9008 9091 regulations gazette",
    q: "What legislation regulates Appliance Standards and Labelling?",
    a: (
      <>
        <p>
          The <span className="font-semibold text-foreground">National Energy Act No 34 of 2008</span>{" "}
          allows the Minister of Energy to make regulations on labelling for energy efficiency purposes
          of household appliances, devices and motor vehicles, and the prohibition of the manufacture,
          importation or sale of electrical and electronic products and fuel-burning appliances for
          reasons of poor energy efficiency. Key compulsory specifications (VCs) include:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>VC 9110 — Safety Requirements of General Service Lamps (GSLs), 2023</li>
          <li>VC 9109 — Energy Efficiency &amp; Functional Performance of GSLs, 2023</li>
          <li>VC 8043 — Incandescent Lamps, 2014</li>
          <li>VC 9006 — Hot Water Storage Tanks for domestic use, 2016</li>
          <li>VC 9008 — Energy Efficiency &amp; Labelling of Electrical &amp; Electronic Apparatus, 2014</li>
          <li>VC 9091 — Single-Capped Fluorescent Lamps, 2014</li>
        </ul>
      </>
    ),
  },
  {
    category: "Appliances",
    keywords: "which appliances label fridge freezer aircon dishwasher washing machine bulb",
    q: "Which appliances must display a South African Energy Efficiency Label?",
    a: (
      <ul className="list-disc space-y-1 pl-5">
        <li>Air Conditioners</li>
        <li>Dishwashers</li>
        <li>Electric Ovens</li>
        <li>Fridges and Freezers</li>
        <li>Storage Water Heaters</li>
        <li>Tumble Dryers</li>
        <li>Washer-dryers</li>
        <li>Washing Machines</li>
        <li>Light bulbs (optional)</li>
      </ul>
    ),
  },
  {
    category: "Costs",
    keywords: "cost energy run appliance calculator long term",
    q: "What would the cost be of the energy required to run an appliance?",
    a: (
      <>
        When purchasing an appliance, it is important to understand how much energy it will use
        and as a result how much money it costs to run. These calculation tools were created to
        aid consumers to make more informed decisions by calculating the long-term cost of running
        an appliance. The tools also estimate the CO₂ emissions of running various appliances.
      </>
    ),
  },
  {
    category: "Standards",
    keywords: "meps minimum energy performance standards class b aircon",
    q: "What are Minimum Energy Performance Standards (MEPS)?",
    a: (
      <>
        MEPS define the minimum level of energy performance an appliance must meet before it can
        be sold in South Africa. It is illegal to sell appliances that do not meet the MEPS
        specified in the regulations. For example, all air conditioners sold in South Africa must
        have a rating of Class B or better.
      </>
    ),
  },
  {
    category: "Standards",
    keywords: "loa letter authority nrcs manufacturer importer",
    q: "What is a Letter of Authority (LOA)?",
    a: (
      <>
        Manufacturers and importers must have a Letter of Authority (LOA) issued by the NRCS
        before an appliance can be sold in South Africa. The LOA verifies that the appliance
        conforms to the MEPS for its category. LOAs are valid for 3 years.
      </>
    ),
  },
  {
    category: "Compliance",
    keywords: "non compliance recall confiscate destroy regulations",
    q: "What happens if manufacturers do not conform to the regulations?",
    a: (
      <>
        Under the National Regulator for Compulsory Specifications Act, the NRCS can recall
        non-conforming products, direct importers to return consignments to the country of origin,
        or order that the consignment be confiscated or destroyed.
      </>
    ),
  },
  {
    category: "Compliance",
    keywords: "report non compliance false label nrcs",
    q: "How can non-compliance be reported?",
    a: (
      <>
        Appliances carrying a false label or that do not comply with MEPS can be reported to the{" "}
        <a
          href="mailto:info@nrcs.org.za"
          className="font-medium text-primary underline"
        >
          NRCS
        </a>
        .
      </>
    ),
  },
];

export default function FAQ() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

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

        <div className="mt-5 flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-foreground/15 backdrop-blur-sm">
            <HelpCircle className="h-6 w-6 text-secondary" />
          </div>
          <div>
            <h2 className="text-base font-bold text-primary-foreground">
              How can we help?
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-primary-foreground/75">
              Common questions about Appliance Energy Efficiency, Standards and Labelling in South Africa.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mt-5">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions…"
            className="h-11 rounded-xl border-0 bg-background pl-9 text-sm shadow-card focus-visible:ring-2 focus-visible:ring-secondary"
          />
        </div>
      </header>

      <main className="-mt-5 rounded-t-3xl bg-background px-5 pt-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "question" : "questions"}
          </p>
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs font-medium text-primary hover:underline"
            >
              Clear
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center"
          >
            <HelpCircle className="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm font-medium text-foreground">No results found</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Try a different search term.
            </p>
          </motion.div>
        ) : (
          <Accordion type="single" collapsible className="w-full space-y-3">
            {filtered.map((item, i) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.25 }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="overflow-hidden rounded-2xl border border-border/60 bg-card px-4 shadow-card transition-shadow data-[state=open]:shadow-lg"
                >
                  <AccordionTrigger className="gap-3 py-4 text-left text-sm font-semibold text-foreground hover:no-underline">
                    <div className="flex flex-1 flex-col items-start gap-1.5">
                      <Badge
                        variant="secondary"
                        className="rounded-full bg-primary/10 px-2 py-0 text-[10px] font-medium uppercase tracking-wide text-primary hover:bg-primary/10"
                      >
                        {item.category}
                      </Badge>
                      <span>{item.q}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="border-t border-border/40 pt-3 text-xs leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        )}

        <a
          href="https://www.savingenergy.org.za/asl/faqs/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex items-center justify-center gap-1.5 rounded-xl border border-border/60 bg-card py-3 text-xs font-medium text-primary shadow-card transition-colors hover:bg-primary/5"
        >
          More on savingenergy.org.za
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </main>
    </div>
  );
}
