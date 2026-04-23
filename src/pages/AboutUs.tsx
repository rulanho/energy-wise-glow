import { motion } from "framer-motion";
import { ArrowLeft, Info, Recycle, Mail, Phone, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import eeiLogo from "@/assets/eei-logo.png";
import mineralLogo from "@/assets/mineral-resources-logo.png";
import sanediLogo from "@/assets/sanedi-logo.png";

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="eco-gradient px-5 pb-12 pt-14">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-foreground/20 transition-colors hover:bg-primary-foreground/30"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-5 w-5 text-primary-foreground" />
          </button>
          <h1 className="text-lg font-bold text-primary-foreground">About</h1>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-5"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-primary-foreground/70">
            About this app
          </p>
          <h2 className="mt-1 text-2xl font-extrabold leading-tight text-primary-foreground">
            Appliance Efficiency Calculator
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-primary-foreground/85">
            Estimate annual electricity usage and running costs for residential appliances — and
            shop smarter.
          </p>
        </motion.div>
      </header>

      <main className="-mt-7 rounded-t-3xl bg-background px-5 pt-7">
        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl bg-card p-5 shadow-card"
        >
          <div className="mb-3 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15">
              <Info className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-base font-bold text-foreground">Our purpose</h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            This initiative is administered through a QR code on the energy efficiency (EE) labels
            that leads users to the calculator and other residential EE and product information,
            helping consumers make better-informed purchase decisions.
          </p>
        </motion.div>

        {/* Recycling */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.4 }}
          className="mt-4 rounded-2xl bg-card p-5 shadow-card"
        >
          <div className="mb-3 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15">
              <Recycle className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-base font-bold text-foreground">Recycle old appliances</h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The EPR Waste Association of South Africa (eWASA) is a registered Producer
            Responsibility Organisation for Electrical &amp; Electronic Equipment, lighting,
            batteries, and more. Reach out to find a drop-off near you.
          </p>
          <div className="mt-4 grid gap-2">
            <a
              href="mailto:info@ewasa.org"
              className="flex items-center gap-3 rounded-xl bg-muted/60 p-3 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Mail className="h-4 w-4 text-primary" />
              info@ewasa.org
            </a>
            <a
              href="tel:+27315357146"
              className="flex items-center gap-3 rounded-xl bg-muted/60 p-3 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Phone className="h-4 w-4 text-primary" />
              +27 31 535 7146
            </a>
          </div>
        </motion.div>

        {/* Report non-compliance */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.4 }}
          className="mt-4 rounded-2xl bg-card p-5 shadow-card"
        >
          <div className="mb-3 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/20">
              <ShieldAlert className="h-4 w-4 text-secondary" />
            </div>
            <h2 className="text-base font-bold text-foreground">Report non-compliance</h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            NRCS inspectors monitor regulated products in the market. If you see a false energy
            label or suspect non-compliance, let them know.
          </p>
          <div className="mt-4 grid gap-2">
            <a
              href="mailto:info@nrcs.org.za"
              className="flex items-center gap-3 rounded-xl bg-muted/60 p-3 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Mail className="h-4 w-4 text-secondary" />
              info@nrcs.org.za
            </a>
            <a
              href="tel:+27124828700"
              className="flex items-center gap-3 rounded-xl bg-muted/60 p-3 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Phone className="h-4 w-4 text-secondary" />
              +27 (12) 482 8700 / 8802
            </a>
          </div>
        </motion.div>

        {/* Powered By */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.4 }}
          className="mt-4 rounded-2xl border border-border/60 bg-gradient-to-br from-card to-muted/40 p-5 shadow-card"
        >
          <div className="mb-5 flex items-center justify-center gap-2">
            <span className="h-px w-10 bg-border" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Powered by
            </p>
            <span className="h-px w-10 bg-border" />
          </div>
          <div className="grid grid-cols-3 items-center gap-3">
            <div className="flex h-20 items-center justify-center rounded-xl bg-background/70 p-3">
              <img src={eeiLogo} alt="Energy Efficiency Initiative" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="flex h-20 items-center justify-center rounded-xl bg-background/70 p-3">
              <img src={mineralLogo} alt="Department of Mineral Resources and Energy" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="flex h-20 items-center justify-center rounded-xl bg-background/70 p-3">
              <img src={sanediLogo} alt="SANEDI" className="max-h-full max-w-full object-contain" />
            </div>
          </div>
          <p className="mt-4 text-center text-[10px] text-muted-foreground">
            © {new Date().getFullYear()} Appliance Efficiency Calculator
          </p>
        </motion.div>
      </main>
    </div>
  );
}
