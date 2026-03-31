const CO2_FACTOR = 0.95; // kg CO2 per kWh (South Africa grid)

export interface CalcInputs {
  electricityCost: number;
  purchasePrice: number;
  annualKwh?: number;
  wattage?: number;
  hoursPerDay?: number;
  daysPerYear?: number;
}

export interface CalcResults {
  annualRunningCost: number;
  annualCO2: number;
  tenYearRunningCost: number;
  tenYearCO2: number;
  totalCostWithPurchase: number;
}

export function calculate(inputs: CalcInputs, calcType: "annual-kwh" | "wattage-based"): CalcResults {
  let annualKwh: number;

  if (calcType === "wattage-based") {
    const wattage = inputs.wattage ?? 0;
    const hoursPerDay = inputs.hoursPerDay ?? 0;
    const daysPerYear = inputs.daysPerYear ?? 365;
    annualKwh = (wattage * hoursPerDay * daysPerYear) / 1000;
  } else {
    annualKwh = inputs.annualKwh ?? 0;
  }

  const annualRunningCost = annualKwh * inputs.electricityCost;
  const annualCO2 = annualKwh * CO2_FACTOR;
  const tenYearRunningCost = annualRunningCost * 10;
  const tenYearCO2 = annualCO2 * 10;
  const totalCostWithPurchase = inputs.purchasePrice + tenYearRunningCost;

  return {
    annualRunningCost,
    annualCO2,
    tenYearRunningCost,
    tenYearCO2,
    totalCostWithPurchase,
  };
}

export function formatCurrency(value: number): string {
  return `R ${value.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString("en-ZA", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}
