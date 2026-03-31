import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Appliance } from "@/data/appliances";

interface ApplianceCardProps {
  appliance: Appliance;
  index: number;
}

export function ApplianceCard({ appliance, index }: ApplianceCardProps) {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: "easeOut" }}
      whileTap={{ scale: 0.96 }}
      onClick={() => navigate(`/calculator/${appliance.id}`)}
      className="flex flex-col items-center gap-3 rounded-2xl bg-card p-5 shadow-card transition-shadow hover:shadow-elevated active:shadow-card"
    >
      <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-accent/50 p-3">
        <img
          src={appliance.image}
          alt={appliance.name}
          loading="lazy"
          width={80}
          height={80}
          className="h-20 w-20 object-contain"
        />
      </div>
      <span className="text-sm font-semibold text-foreground">{appliance.name}</span>
    </motion.button>
  );
}
