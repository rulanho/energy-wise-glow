import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, Plus, Tag, X } from "lucide-react";
import { appliances } from "@/data/appliances";
import { calculate, type CalcInputs } from "@/lib/calculator";
import { InputField } from "@/components/InputField";
import { ResultCard } from "@/components/ResultCard";
import { toast } from "@/hooks/use-toast";

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
  const [compareEnabled, setCompareEnabled] = useState(false);

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
    [household, item1, appliance],
  );
  const results2 = useMemo(
    () => (appliance ? calculate(makeInputs(item2), appliance.calcType) : null),
    [household, item2, appliance],
  );

  if (!appliance) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Appliance not found</p>
      </div>
    );
  }

  const isFilled = (vals: ValuesMap) => itemFields.every((f) => (vals[f.key] ?? 0) > 0);
  const filled1 = isFilled(item1);
  const filled2 = isFilled(item2);

  const better =
    results1 && results2 && filled1 && filled2
      ? results1.totalCostWithPurchase <= results2.totalCostWithPurchase
        ? 1
        : 2
      : null;

  const validateHousehold = () => {
    const errors: string[] = [];
    householdFields.forEach((f) => {
      const v = household[f.key] ?? 0;
      if (v <= 0) errors.push(`${f.label} must be greater than 0`);
    });
    return errors;
  };

  const handleCalculate = () => {
    const errors = validateHousehold();
    if (errors.length > 0) {
      toast({
        title: "Please complete household details",
        description: errors.slice(0, 3).join(" • "),
        variant: "destructive",
      });
      setShowResults(false);
      return;
    }
    if (!filled1) {
      toast({
        title: `Enter ${appliance.name} details`,
        description: `Fill in all fields to see results.`,
        variant: "destructive",
      });
      setShowResults(false);
      return;
    }
    if (compareEnabled && filled2) {
      const sameInputs = itemFields.every((f) => (item1[f.key] ?? 0) === (item2[f.key] ?? 0));
      if (sameInputs) {
        toast({
          title: "Inputs are identical",
          description: `Enter different values to compare both ${appliance.name.toLowerCase()}s.`,
        });
      }
    }
    setShowResults(true);
  };

  const removeSecond = () => {
    setCompareEnabled(false);
    setItem2({});
  };

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
          <p className="text-sm leading-relaxed text-primary-foreground/85">
            Enter the details of an appliance to calculate its energy usage and cost.
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
                  hint={f.hint}
                />
              ))}
            </div>
          </Section>
        )}

        {/* Appliance 1 */}
        <Section title={compareEnabled ? `${appliance.name} 1` : appliance.name} defaultOpen>
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
                hint={f.hint}
              />
            ))}
          </div>
        </Section>

        {/* Appliance 2 — only when comparing */}
        <AnimatePresence>
          {compareEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <Section
                title={`${appliance.name} 2`}
                defaultOpen
                rightSlot={
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSecond();
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                    aria-label="Remove second appliance"
                  >
                    <X className="h-4 w-4" />
                  </button>
                }
              >
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
                      hint={f.hint}
                    />
                  ))}
                </div>
              </Section>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Calculate button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleCalculate}
          className="mt-6 w-full rounded-2xl eco-gradient py-4 text-base font-bold text-primary-foreground shadow-elevated"
        >
          Calculate Results
        </motion.button>

        {/* Results */}
        <AnimatePresence>
          {showResults && results1 && filled1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="mt-6"
            >
              <h2 className="mb-4 text-base font-bold text-foreground">
                {compareEnabled && filled2 ? "Comparison Results" : "Results"}
              </h2>
              <div className="flex flex-col gap-3 sm:flex-row">
                <ResultCard
                  label={compareEnabled ? `${appliance.name} 1` : appliance.name}
                  results={results1}
                  isBetter={compareEnabled && filled2 && better === 1}
                  index={0}
                />
                {compareEnabled && filled2 && results2 && (
                  <ResultCard
                    label={`${appliance.name} 2`}
                    results={results2}
                    isBetter={better === 2}
                    index={1}
                  />
                )}
              </div>

              <p className="mt-4 rounded-xl bg-muted/60 p-3 text-[11px] leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">Disclaimer:</span> The above are
                estimated running costs for the {appliance.name.toLowerCase()}. Calculations are
                based on the estimated kWh per annum and should be used as a guide only. Actual
                kWh per annum will vary depending on how the appliance is used.
              </p>

              {/* Compare prompt */}
              {!compareEnabled && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.35 }}
                  className="mt-5 rounded-2xl border border-primary/20 bg-accent/40 p-4"
                >
                  <p className="text-sm font-semibold text-foreground">
                    Would you like to compare with another appliance?
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Add a second {appliance.name.toLowerCase()} to see which one costs less to
                    run over 10 years.
                  </p>
                  <button
                    onClick={() => {
                      setCompareEnabled(true);
                      setTimeout(() => {
                        window.scrollTo({
                          top: document.body.scrollHeight,
                          behavior: "smooth",
                        });
                      }, 50);
                    }}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-card"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add appliance to compare
                  </button>
                </motion.div>
              )}
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
  rightSlot,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  rightSlot?: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mt-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl bg-card px-4 py-3 shadow-card"
      >
        <span className="text-sm font-bold text-foreground">{title}</span>
        <span className="flex items-center gap-1">
          {rightSlot}
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          />
        </span>
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
