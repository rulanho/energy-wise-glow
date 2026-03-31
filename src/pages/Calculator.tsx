import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { appliances } from "@/data/appliances";
import { calculate, type CalcInputs } from "@/lib/calculator";
import { InputField } from "@/components/InputField";
import { ResultCard } from "@/components/ResultCard";

type ValuesMap = Record<string, number>;

export default function Calculator() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const appliance = appliances.find((a) => a.id === id);

  const householdFields = appliance?.fields.filter((f) => f.isHousehold) ?? [];
  const itemFields = appliance?.fields.filter((f) => !f.isHousehold) ?? [];

  const defaultValues = (): ValuesMap => {
    const v: ValuesMap = {};
    appliance?.fields.forEach((f) => {
      v[f.key] = f.defaultValue ?? 0;
    });
    return v;
  };

  const [household, setHousehold] = useState<ValuesMap>(defaultValues);
  const [item1, setItem1] = useState<ValuesMap>({});
  const [item2, setItem2] = useState<ValuesMap>({});
  const [showResults, setShowResults] = useState(false);

  const makeInputs = (itemVals: ValuesMap): CalcInputs => ({
    electricityCost: household.electricityCost ?? 2.4,
    purchasePrice: itemVals.purchasePrice ?? 0,
    annualKwh: itemVals.annualKwh ?? 0,
    wattage: itemVals.wattage ?? 0,
    hoursPerDay: household.hoursPerDay ?? 0,
    daysPerYear: household.daysPerYear ?? 365,
  });

  const results1 = useMemo(
    () => (appliance ? calculate(makeInputs(item1), appliance.calcType) : null),
    [household, item1, appliance]
  );
  const results2 = useMemo(
    () => (appliance ? calculate(makeInputs(item2), appliance.calcType) : null),
    [household, item2, appliance]
  );

  if (!appliance) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Appliance not found</p>
      </div>
    );
  }

  const better =
    results1 && results2
      ? results1.totalCostWithPurchase <= results2.totalCostWithPurchase
        ? 1
        : 2
      : null;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Top bar */}
      <header className="eco-gradient px-5 pb-8 pt-14">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-foreground/20"
          >
            <ArrowLeft className="h-5 w-5 text-primary-foreground" />
          </button>
          <h1 className="text-lg font-bold text-primary-foreground">{appliance.name}</h1>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <img
            src={appliance.image}
            alt={appliance.name}
            width={64}
            height={64}
            className="h-16 w-16 rounded-xl bg-primary-foreground/10 object-contain p-2"
          />
          <p className="text-sm text-primary-foreground/70">
            Compare two {appliance.name.toLowerCase()} options to find the most cost-effective & eco-friendly choice.
          </p>
        </div>
      </header>

      <main className="-mt-3 rounded-t-3xl bg-background px-5 pt-5">
        {/* Household section */}
        {householdFields.length > 0 && (
          <Section title="Household Details" defaultOpen>
            <div className="space-y-4">
              {householdFields.map((f) => (
                <InputField
                  key={f.key}
                  label={f.label}
                  value={household[f.key] ?? 0}
                  onChange={(v) => setHousehold((prev) => ({ ...prev, [f.key]: v }))}
                  min={f.min}
                  max={f.max}
                  unit={f.unit}
                />
              ))}
            </div>
          </Section>
        )}

        {/* Appliance 1 */}
        <Section title={`${appliance.name} 1`} defaultOpen>
          <div className="space-y-4">
            {itemFields.map((f) => (
              <InputField
                key={f.key}
                label={f.label}
                value={item1[f.key] ?? 0}
                onChange={(v) => setItem1((prev) => ({ ...prev, [f.key]: v }))}
                min={f.min}
                max={f.max}
                unit={f.unit}
              />
            ))}
          </div>
        </Section>

        {/* Appliance 2 */}
        <Section title={`${appliance.name} 2`} defaultOpen>
          <div className="space-y-4">
            {itemFields.map((f) => (
              <InputField
                key={f.key}
                label={f.label}
                value={item2[f.key] ?? 0}
                onChange={(v) => setItem2((prev) => ({ ...prev, [f.key]: v }))}
                min={f.min}
                max={f.max}
                unit={f.unit}
              />
            ))}
          </div>
        </Section>

        {/* Calculate button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowResults(true)}
          className="mt-6 w-full rounded-2xl eco-gradient py-4 text-base font-bold text-primary-foreground shadow-elevated"
        >
          Compare Results
        </motion.button>

        {/* Results */}
        <AnimatePresence>
          {showResults && results1 && results2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="mt-6"
            >
              <h2 className="mb-4 text-base font-bold text-foreground">Comparison Results</h2>
              <div className="flex flex-col gap-3 sm:flex-row">
                <ResultCard
                  label={`${appliance.name} 1`}
                  results={results1}
                  isBetter={better === 1}
                  index={0}
                />
                <ResultCard
                  label={`${appliance.name} 2`}
                  results={results2}
                  isBetter={better === 2}
                  index={1}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function Section({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mt-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl bg-card px-4 py-3 shadow-card"
      >
        <span className="text-sm font-bold text-foreground">{title}</span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-1 pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
