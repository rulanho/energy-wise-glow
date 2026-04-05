import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { appliances } from "@/data/appliances";
import { ApplianceCard } from "@/components/ApplianceCard";
import eeiLogo from "@/assets/eei-logo.png";

export default function Index() {
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
            <img src={eeiLogo} alt="EEI Logo" className="h-9 w-9 object-contain" />
          </div>
          <div>
            <span className="text-sm font-bold leading-tight text-primary-foreground">
              Energy Efficiency
            </span>
            <br />
            <span className="text-xs text-primary-foreground/70">Appliance Calculator</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-6"
        >
          <h1 className="text-2xl font-extrabold leading-tight text-primary-foreground">
            Appliance Energy
            <br />
            Calculator
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/70">
            Compare energy costs & CO₂ emissions to make smarter choices
          </p>
        </motion.div>

        {/* Quick stat */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-5 flex items-center gap-3 rounded-2xl bg-primary-foreground/15 p-4"
        >
          <Zap className="h-8 w-8 text-secondary" />
          <div>
            <p className="text-xs font-medium text-primary-foreground/70">South Africa avg.</p>
            <p className="text-lg font-bold text-primary-foreground">
              R 2.40{" "}
              <span className="text-xs font-normal text-primary-foreground/60">per kWh</span>
            </p>
          </div>
        </motion.div>
      </header>

      {/* Appliance Grid */}
      <main className="-mt-4 rounded-t-3xl bg-background px-5 pt-6 pb-6">
        <h2 className="mb-4 text-base font-bold text-foreground">Select an appliance</h2>
        <div className="grid grid-cols-2 gap-3">
          {appliances.map((appliance, i) => (
            <ApplianceCard key={appliance.id} appliance={appliance} index={i} />
          ))}
        </div>

        <LogoBar className="mt-8" />
      </main>
    </div>
  );
}
