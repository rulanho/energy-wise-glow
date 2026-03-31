import { motion } from "framer-motion";
import { ArrowLeft, Info, Recycle, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LogoBar } from "@/components/LogoBar";

export default function AboutUs() {
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
          <h1 className="text-lg font-bold text-primary-foreground">About Us</h1>
        </div>
      </header>

      <main className="-mt-3 rounded-t-3xl bg-background px-5 pt-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl bg-card p-5 shadow-card"
        >
          <div className="mb-3 flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            <h2 className="text-base font-bold text-foreground">Energy Efficiency Calculator</h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The aim is to estimate annual electricity consumption and operating cost associated with
            a specific residential appliance. This initiative shall be administered by a QR code on
            the energy efficiency (EE) labels that leads users to the energy calculator app and
            other residential EE and product related information.
          </p>
        </motion.div>

        {/* Recycling Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mt-4 rounded-2xl bg-card p-5 shadow-card"
        >
          <div className="mb-3 flex items-center gap-2">
            <Recycle className="h-5 w-5 text-primary" />
            <h2 className="text-base font-bold text-foreground">Recycling & Reporting</h2>
          </div>
          <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              <strong className="text-foreground">Outdated/old appliances:</strong> The EPR Waste
              Association of South Africa (eWASA) is a registered Producer Responsibility
              Organisation (PRO) with The Department of Forestry, Fisheries and the Environment
              (DFFE). For more information on where to recycle appliances, consumers can contact
              eWASA via{" "}
              <a href="mailto:info@ewasa.org" className="font-medium text-primary underline">
                info@ewasa.org
              </a>{" "}
              or call +27 31 535 7146.
            </p>
            <p>
              <strong className="text-foreground">Unlawful trading reporting:</strong> The NRCS
              inspectors maintain constant surveillance of regulated products and services in the
              market. If consumers or members of industry have any information, they are encouraged
              to contact{" "}
              <a href="mailto:info@nrcs.org.za" className="font-medium text-primary underline">
                info@nrcs.org.za
              </a>{" "}
              or call +27 (12) 482 8700/8802.
            </p>
          </div>
        </motion.div>

        {/* Platform Availability */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-4 rounded-2xl bg-card p-5 shadow-card"
        >
          <div className="mb-3 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="text-base font-bold text-foreground">Platform Availability</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <PlatformBadge icon="🌐" label="Web App" />
            <PlatformBadge icon="🤖" label="Android" />
            <PlatformBadge icon="🍎" label="iOS" />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Also compatible with Huawei devices via Android APK.
          </p>
        </motion.div>

        <LogoBar className="mt-8" />
      </main>
    </div>
  );
}

function PlatformBadge({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-xl bg-accent/50 p-3">
      <span className="text-2xl">{icon}</span>
      <span className="text-xs font-semibold text-foreground">{label}</span>
      <span className="text-[10px] font-medium text-primary">Available</span>
    </div>
  );
}
