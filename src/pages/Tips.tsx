import { motion } from "framer-motion";
import { ArrowLeft, Sun, Snowflake, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";


interface Tip {
  appliance: string;
  tips: string[];
}

const summerTips: Tip[] = [
  {
    appliance: "Air Conditioners",
    tips: [
      "Increase the temperature when you're out so your AC processes less unneeded cool air.",
      "Clean filters periodically or replace to retain efficiency.",
      "Keep blinds or curtains closed during the hottest parts of the day to reduce heat gains.",
    ],
  },
  {
    appliance: "Tumble Dryers",
    tips: [
      "Air dry your clothes.",
      "For greater efficiency and less drying time, maintain a lint-free screen.",
    ],
  },
  {
    appliance: "Washing Machines",
    tips: ["Washing clothes in cold water will eliminate the need to heat for them."],
  },
  {
    appliance: "Electric Ovens",
    tips: [
      "Make use of smaller appliances like a toaster oven or microwave to ensure economic cooking.",
      "Only preheat oven when needed and use the remaining heat to end baking.",
    ],
  },
  {
    appliance: "Refrigerators",
    tips: [
      "Keep the fridge to operate at least 3°C and the freezer at -18°C for efficiency.",
      "Keep the fridge full as it operates better in this condition.",
    ],
  },
  {
    appliance: "Washer Dryers",
    tips: ["Choose eco-friendly wash cycles."],
  },
  {
    appliance: "Water Heaters",
    tips: ["Adjust thermostat to 49°C to save electricity."],
  },
];

const winterTips: Tip[] = [
  {
    appliance: "Fans",
    tips: [
      "Open windows on cooler days to allow fresh air circulate and decrease heating usage.",
      "Adjust thermostat to a higher setting or change mode from a/c unit if it is also set for heating.",
    ],
  },
  {
    appliance: "Tumble Dryers",
    tips: [
      "Do smaller loads in the dryer.",
      "The dryer vent must be cleared to avoid the moisture built-up.",
    ],
  },
  {
    appliance: "Washing Machines",
    tips: ["Pre-treatment prevents the need to use a longer wash cycle and higher heat."],
  },
  {
    appliance: "Electric Ovens",
    tips: [
      "Cook in huge quantities to take advantage of the oven's heat.",
      "Check through oven light than frequently opening the door to check on food.",
    ],
  },
  {
    appliance: "Refrigerators",
    tips: ["Adjust to higher temperatures to save energy."],
  },
  {
    appliance: "Washer Dryers",
    tips: ["Avoid overloading the washer dryer to conserve energy."],
  },
  {
    appliance: "Water Heaters",
    tips: ["Take shorter showers and use cold for laundry."],
  },
];
export default function Tips() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-10">
      <header className="eco-gradient px-5 pb-8 pt-14">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-foreground/20"
          >
            <ArrowLeft className="h-5 w-5 text-primary-foreground" />
          </button>
          <h1 className="text-lg font-bold text-primary-foreground">Energy Saving Tips</h1>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <Lightbulb className="h-8 w-8 text-secondary" />
          <p className="text-sm text-primary-foreground/70">
            Practical tips to reduce your energy consumption and save money throughout the year.
          </p>
        </div>
      </header>

      <main className="-mt-3 rounded-t-3xl bg-background px-5 pt-6">
        {/* Summer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-4 flex items-center gap-2">
            <Sun className="h-5 w-5 text-secondary" />
            <h2 className="text-base font-bold text-foreground">Tips for Summer</h2>
          </div>
          <div className="space-y-3">
            {summerTips.map((group) => (
              <TipCard key={group.appliance} group={group} />
            ))}
          </div>
        </motion.div>

        {/* Winter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mt-8"
        >
          <div className="mb-4 flex items-center gap-2">
            <Snowflake className="h-5 w-5 text-primary" />
            <h2 className="text-base font-bold text-foreground">Tips for Winter</h2>
          </div>
          <div className="space-y-3">
            {winterTips.map((group) => (
              <TipCard key={group.appliance} group={group} />
            ))}
          </div>
        </motion.div>

      </main>
    </div>
  );
}

function TipCard({ group }: { group: Tip }) {
  return (
    <div className="rounded-2xl bg-card p-4 shadow-card">
      <h3 className="mb-2 text-sm font-bold text-foreground">{group.appliance}</h3>
      <ul className="space-y-1.5">
        {group.tips.map((tip, i) => (
          <li key={i} className="flex gap-2 text-xs text-muted-foreground">
            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
