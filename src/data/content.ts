/**
 * Centralised, replaceable text content for the app.
 * Structured so it can later be swapped out for a backend / CMS source
 * (e.g. fetched from Lovable Cloud) without touching component code.
 */

export const appContent = {
  appName: "Appliance Efficiency Calculator",
  tagline: "Compare appliances. Save energy. Spend smarter.",
  home: {
    headerTitle: "Compare Appliances",
    intro:
      "Enter the details of an appliance to calculate its energy usage and cost. You can compare two appliances before making a purchase decision.",
    helper:
      "Find the Annual Energy Consumption (kWh/year) on the appliance energy label.",
    avgRateLabel: "South Africa avg.",
    avgRate: "R 2.40",
    avgRateUnit: "per kWh",
    selectHeading: "Select an appliance",
  },
  onboarding: [
    {
      title: "Welcome to Appliance Efficiency Calculator",
      body: "Your everyday companion for smarter, greener appliance decisions.",
    },
    {
      title: "Compare appliances before you buy",
      body: "Estimate energy costs for two appliances side-by-side and pick the better deal.",
    },
    {
      title: "Use the energy label",
      body: "Enter the kWh/year value from the appliance energy label for accurate results.",
    },
    {
      title: "Save money. Save energy.",
      body: "Make energy-efficient choices that lower your bill and your carbon footprint.",
    },
  ],
};

export type AppContent = typeof appContent;
