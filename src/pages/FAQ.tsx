import { motion } from "framer-motion";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  q: string;
  a: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
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

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="eco-gradient px-5 pb-8 pt-14">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-foreground/20"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-5 w-5 text-primary-foreground" />
          </button>
          <h1 className="text-lg font-bold text-primary-foreground">FAQs</h1>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <HelpCircle className="h-8 w-8 text-secondary" />
          <p className="text-sm text-primary-foreground/70">
            Frequently asked questions about Appliance Energy Efficiency, Standards and Labelling
            in South Africa.
          </p>
        </div>
      </header>

      <main className="-mt-3 rounded-t-3xl bg-background px-5 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-2xl border border-border bg-card px-4 shadow-card"
              >
                <AccordionTrigger className="text-left text-sm font-bold text-foreground hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-xs leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="mt-6 text-center text-[11px] text-muted-foreground">
            Source:{" "}
            <a
              href="https://www.savingenergy.org.za/asl/faqs/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline"
            >
              savingenergy.org.za
            </a>
          </p>
        </motion.div>
      </main>
    </div>
  );
}
