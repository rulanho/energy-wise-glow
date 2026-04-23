import { motion } from "framer-motion";
import { ArrowLeft, Info, Recycle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import eeiLogo from "@/assets/eei-logo.png";
import mineralLogo from "@/assets/mineral-resources-logo.png";
import sanediLogo from "@/assets/sanedi-logo.png";

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-28">
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
            <h2 className="text-base font-bold text-foreground">Appliance Efficiency Calculator</h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The aim is to estimate annual electricity consumption and operating cost associated with
            a specific residential appliance. This initiative shall be administered by a QR code on
            the energy efficiency (EE) labels that leads users to the energy calculator app and
            other residential EE and product related information.
          </p>
        </motion.div>

        {/* Old/Broken Appliances Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mt-4 rounded-2xl bg-card p-5 shadow-card"
        >
          <div className="mb-3 flex items-center gap-2">
            <Recycle className="h-5 w-5 text-primary" />
            <h2 className="text-base font-bold text-foreground">Use of Old/Broken Appliances</h2>
          </div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">Recycling and Reporting Data</h3>
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <div>
              <p className="mb-1 font-semibold text-foreground">Outdated/old appliances</p>
              <p>
                The EPR Waste Association of South Africa (eWASA) is a registered Producer
                Responsibility Organisation (PRO) with The Department of Forestry, Fisheries and
                the Environment (DFFE) for the Electrical and Electronic Equipment (EEE), Lighting,
                Portable Batteries, Lubricant Oils and Paper and Packaging Sectors. For more
                information on where to recycle appliances, consumers can contact eWASA via{" "}
                <a href="mailto:info@ewasa.org" className="font-medium text-primary underline">
                  info@ewasa.org
                </a>{" "}
                or call{" "}
                <a href="tel:+27315357146" className="font-medium text-primary underline">
                  +27 31 535 7146
                </a>.
              </p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-foreground">Unlawful trading reporting</p>
              <p>
                EE Appliances Consumer and Industry watch dog — The NRCS inspectors maintain
                constant surveillance of regulated products and services in the market. In executing
                its mandate, the NRCS relies heavily on intelligence and information provided by
                industry, commerce, and consumers.
              </p>
              <p className="mt-2">
                If consumers or members of industry have information about any of the products and
                services that are regulated in South Africa, or if they have any suggestions that
                will assist government in becoming more effective, they are encouraged to contact:{" "}
                <a href="mailto:info@nrcs.org.za" className="font-medium text-primary underline">
                  info@nrcs.org.za
                </a>{" "}
                or call{" "}
                <a href="tel:+27124828700" className="font-medium text-primary underline">
                  +27 (12) 482 8700/8802
                </a>.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Powered By */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-4 rounded-2xl bg-card p-5 shadow-card"
        >
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Powered by
          </p>
          <div className="flex flex-col items-center justify-center gap-4">
            <img src={eeiLogo} alt="Energy Efficiency Initiative" className="h-16 w-auto object-contain" />
            <img src={mineralLogo} alt="Department of Mineral Resources and Energy" className="h-14 w-auto object-contain" />
            <img src={sanediLogo} alt="SANEDI" className="h-14 w-auto object-contain" />
          </div>
        </motion.div>
      </main>
    </div>
  );
}
