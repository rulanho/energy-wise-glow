import eeiLogo from "@/assets/eei-logo.png";
import mineralLogo from "@/assets/mineral-resources-logo.png";
import sanediLogo from "@/assets/sanedi-logo.png";

interface LogoBarProps {
  className?: string;
}

export function LogoBar({ className = "" }: LogoBarProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <img src={eeiLogo} alt="Energy Efficiency Initiative" className="h-12 w-auto object-contain" />
      <img src={mineralLogo} alt="Department of Mineral Resources and Energy" className="h-10 w-auto object-contain" />
      <img src={sanediLogo} alt="SANEDI" className="h-10 w-auto object-contain" />
    </div>
  );
}
