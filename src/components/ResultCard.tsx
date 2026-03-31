import { motion } from "framer-motion";
import type { CalcResults } from "@/lib/calculator";
import { formatCurrency, formatNumber } from "@/lib/calculator";

interface ResultCardProps {
  label: string;
  results: CalcResults;
  isBetter?: boolean;
  index: number;
}

export function ResultCard({ label, results, isBetter, index }: ResultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
      className={`flex-1 rounded-2xl p-4 shadow-card ${
        isBetter ? "bg-accent ring-2 ring-primary" : "bg-card"
      }`}
    >
      <div className="mb-3 flex items-center gap-2">
        <h3 className="text-sm font-bold text-foreground">{label}</h3>
        {isBetter && (
          <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
            BETTER
          </span>
        )}
      </div>

      <div className="space-y-2.5">
        <ResultRow label="Annual Running Cost" value={formatCurrency(results.annualRunningCost)} />
        <ResultRow label="Annual CO₂ (kg)" value={formatNumber(results.annualCO2)} />
        <div className="h-px bg-border" />
        <ResultRow label="10-Year Running Cost" value={formatCurrency(results.tenYearRunningCost)} />
        <ResultRow label="10-Year CO₂ (kg)" value={formatNumber(results.tenYearCO2)} />
        <div className="h-px bg-border" />
        <ResultRow label="Total (Purchase + 10yr)" value={formatCurrency(results.totalCostWithPurchase)} highlight />
      </div>
    </motion.div>
  );
}

function ResultRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <span className={`text-sm font-bold ${highlight ? "text-gradient-eco" : "text-foreground"}`}>
        {value}
      </span>
    </div>
  );
}
