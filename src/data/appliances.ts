import fridgeImg from "@/assets/fridge.png";
import airconImg from "@/assets/aircon.png";
import washerImg from "@/assets/washer.png";
import ovenImg from "@/assets/oven.png";
import lightbulbImg from "@/assets/lightbulb.png";
import dryerImg from "@/assets/dryer.png";
import dishwasherImg from "@/assets/dishwasher.png";
import washingMachineImg from "@/assets/washing-machine.png";

export type InputFieldType = "electricityCost" | "purchasePrice" | "annualKwh" | "wattage" | "hoursPerDay" | "daysPerYear";

export interface ApplianceField {
  key: InputFieldType;
  label: string;
  min: number;
  max: number;
  unit?: string;
  defaultValue?: number;
  isHousehold?: boolean;
}

export interface Appliance {
  id: string;
  name: string;
  image: string;
  fields: ApplianceField[];
  calcType: "annual-kwh" | "wattage-based";
}

const householdElectricity: ApplianceField = {
  key: "electricityCost",
  label: "Electricity cost (R/kWh)",
  min: 0,
  max: 100,
  unit: "R",
  defaultValue: 2.4,
  isHousehold: true,
};

const annualKwhFields: (maxPrice: number) => ApplianceField[] = (maxPrice) => [
  householdElectricity,
  { key: "purchasePrice", label: "Purchase Price", min: 0, max: maxPrice, unit: "R" },
  { key: "annualKwh", label: "Annual energy consumption (kWh)", min: 0, max: 10000, unit: "kWh" },
];

export const appliances: Appliance[] = [
  {
    id: "fridge",
    name: "Fridge or Freezer",
    image: fridgeImg,
    fields: annualKwhFields(1000000),
    calcType: "annual-kwh",
  },
  {
    id: "aircon",
    name: "Air Conditioner",
    image: airconImg,
    fields: annualKwhFields(50000),
    calcType: "annual-kwh",
  },
  {
    id: "washer-dryer",
    name: "Washer Dryer",
    image: washerImg,
    fields: annualKwhFields(50000),
    calcType: "annual-kwh",
  },
  {
    id: "oven",
    name: "Electric Oven",
    image: ovenImg,
    fields: annualKwhFields(50000),
    calcType: "annual-kwh",
  },
  {
    id: "lightbulb",
    name: "Light Bulb",
    image: lightbulbImg,
    fields: [
      householdElectricity,
      { key: "hoursPerDay", label: "Hours used per day", min: 0, max: 24, unit: "hrs", defaultValue: 0, isHousehold: true },
      { key: "daysPerYear", label: "Days used per year", min: 0, max: 366, unit: "days", defaultValue: 365, isHousehold: true },
      { key: "purchasePrice", label: "Purchase Price", min: 0, max: 5000, unit: "R" },
      { key: "wattage", label: "Wattage", min: 0, max: 1000, unit: "W" },
    ],
    calcType: "wattage-based",
  },
  {
    id: "tumble-dryer",
    name: "Tumble Dryer",
    image: dryerImg,
    fields: annualKwhFields(50000),
    calcType: "annual-kwh",
  },
  {
    id: "dishwasher",
    name: "Dishwasher",
    image: dishwasherImg,
    fields: annualKwhFields(50000),
    calcType: "annual-kwh",
  },
  {
    id: "washing-machine",
    name: "Washing Machine",
    image: washingMachineImg,
    fields: annualKwhFields(50000),
    calcType: "annual-kwh",
  },
];
