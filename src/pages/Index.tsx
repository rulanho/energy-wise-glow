import { motion } from "framer-motion";
import { Zap, Tag } from "lucide-react";
import { appliances } from "@/data/appliances";
import { ApplianceCard } from "@/components/ApplianceCard";
import { appContent } from "@/data/content";
import eeiLogo from "@/assets/eei-logo.png";

export default function Index() {
  const c = appContent.home;
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="eco-gradient px-5 pb-10 pt-14">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-foreground/20 p-1">
            <img src={eeiLogo} alt="App logo" className="h-9 w-9 object-contain" />
          </div>
          <div>
            <span className="text-sm font-bold leading-tight text-primary-foreground">
              Appliance Efficiency
            </span>
            <br />
            <span className="text-xs text-primary-foreground/70">Calculator</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-6"
        >
          <p className="text-sm leading-relaxed text-primary-foreground/85">
            Enter the details of an appliance to calculate its energy usage and cost.
          </p>
        </motion.div>
      </header>

      {/* Appliance Grid */}
      <main className="-mt-4 rounded-t-3xl bg-background px-5 pt-6 pb-6">
        <h2 className="mb-4 text-base font-bold text-foreground">{c.selectHeading}</h2>
        <div className="grid grid-cols-2 gap-3">
          {appliances.map((appliance, i) => (
            <ApplianceCard key={appliance.id} appliance={appliance} index={i} />
          ))}
        </div>
      </main>
    </div>
  );
}

