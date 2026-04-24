import { motion } from "framer-motion";
import { ArrowLeft, Sun, Snowflake, Lightbulb, AirVent, Wind, WashingMachine, CookingPot, Refrigerator, Droplets, Thermometer, Fan, HelpCircle, type LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTips } from "@/hooks/useContent";

const applianceIcons: Record<string, LucideIcon> = {
  "Air Conditioners": AirVent,
  "Tumble Dryers": Wind,
  "Washing Machines": WashingMachine,
  "Electric Ovens": CookingPot,
  "Refrigerators": Refrigerator,
  "Washer Dryers": Droplets,
  "Water Heaters": Thermometer,
  "Fans": Fan,
};

interface Group { appliance: string; tips: string[]; }

export default function Tips() {
  const navigate = useNavigate();
  const summer = useTips("summer");
  const winter = useTips("winter");

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="eco-gradient px-5 pb-10 pt-14">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-foreground/20 transition-colors hover:bg-primary-foreground/30"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-5 w-5 text-primary-foreground" />
          </button>
          <h1 className="text-lg font-bold text-primary-foreground">Energy Saving Tips</h1>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-5 flex items-start gap-3 rounded-2xl bg-primary-foreground/10 p-4"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/20">
            <Lightbulb className="h-5 w-5 text-secondary" />
          </div>
          <p className="text-xs leading-relaxed text-primary-foreground/85">
            Practical, season-aware tips to cut consumption and lower your bill all year round.
          </p>
        </motion.div>
      </header>

      <main className="-mt-6 rounded-t-3xl bg-background px-5 pt-7">
        <Tabs defaultValue="summer" className="w-full">
          <TabsList className="mb-5 grid w-full grid-cols-2 rounded-2xl bg-muted/60 p-1">
            <TabsTrigger value="summer" className="flex items-center gap-2 rounded-xl text-xs font-semibold data-[state=active]:bg-card data-[state=active]:text-secondary data-[state=active]:shadow-sm">
              <Sun className="h-4 w-4" />
              Summer
            </TabsTrigger>
            <TabsTrigger value="winter" className="flex items-center gap-2 rounded-xl text-xs font-semibold data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm">
              <Snowflake className="h-4 w-4" />
              Winter
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summer">
            <TipsGroupList groups={summer.data ?? []} accent="secondary" />
          </TabsContent>
          <TabsContent value="winter">
            <TipsGroupList groups={winter.data ?? []} accent="primary" />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function TipsGroupList({ groups, accent }: { groups: Group[]; accent: "primary" | "secondary" }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-3">
      {groups.map((group, i) => (
        <TipCard key={group.appliance} group={group} accent={accent} index={i} />
      ))}
    </motion.div>
  );
}

function TipCard({ group, accent = "primary", index = 0 }: { group: Group; accent?: "primary" | "secondary"; index?: number }) {
  const IconComponent = applianceIcons[group.appliance] ?? HelpCircle;
  const accentBg = accent === "secondary" ? "bg-secondary/15" : "bg-primary/15";
  const accentText = accent === "secondary" ? "text-secondary" : "text-primary";
  const accentDot = accent === "secondary" ? "bg-secondary" : "bg-primary";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.25 }}
      className="rounded-2xl bg-card p-4 shadow-card transition-shadow hover:shadow-elevated"
    >
      <div className="mb-3 flex items-center gap-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${accentBg}`}>
          <IconComponent className={`h-4 w-4 ${accentText}`} />
        </div>
        <h3 className="text-sm font-bold text-foreground">{group.appliance}</h3>
      </div>
      <ul className="space-y-2 pl-1">
        {group.tips.map((tip, i) => (
          <li key={i} className="flex gap-2.5 text-xs leading-relaxed text-muted-foreground">
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${accentDot}`} />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
