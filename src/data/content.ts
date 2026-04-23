/**
 * Centralised, replaceable text content for the app.
 * Structured so it can later be swapped out for a backend / CMS source
 * (e.g. fetched from Lovable Cloud) without touching component code.
 */

export const appContent = {
  appName: "Appliance Efficiency Calculator",
  tagline: "Compare appliances. Save energy. Spend smarter.",
  home: {
    headerTitle: "",
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
      title: "Understand what your appliance costs",
      body: "When purchasing an appliance, it is important to understand how much energy it will use and as a result how much money it costs to run the appliance.",
    },
    {
      title: "Make more informed decisions",
      body: "These calculation tools were created to aid consumers to make more informed decisions by calculating the long-term cost for running an appliance.",
    },
    {
      title: "Use the energy label",
      body: "Enter the kWh/year value from the appliance energy label for accurate results.",
    },
    {
      title: "Know your electricity rate",
      body: "Find your cost per kWh on your municipal electricity bill — it's usually listed as a tariff or rate per kWh.",
    },
  ],
};

export type AppContent = typeof appContent;
