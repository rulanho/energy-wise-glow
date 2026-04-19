import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  unit?: string;
  hint?: string;
}

export function InputField({ label, value, onChange, min, max, unit, hint }: InputFieldProps) {
  const isMobile = useIsMobile();

  const HintIcon = hint ? (
    isMobile ? (
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label={`More info about ${label}`}
            className="inline-flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground hover:text-primary"
          >
            <Info className="h-3.5 w-3.5" />
          </button>
        </PopoverTrigger>
        <PopoverContent side="top" className="max-w-[260px] text-xs leading-relaxed">
          {hint}
        </PopoverContent>
      </Popover>
    ) : (
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label={`More info about ${label}`}
            className="inline-flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground hover:text-primary"
          >
            <Info className="h-3.5 w-3.5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[260px] text-xs leading-relaxed">
          {hint}
        </TooltipContent>
      </Tooltip>
    )
  ) : null;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <label className="text-xs font-medium text-muted-foreground">{label}</label>
        {HintIcon}
      </div>
      <div className="relative">
        <input
          type="number"
          value={value || ""}
          onChange={(e) => {
            const v = parseFloat(e.target.value) || 0;
            onChange(Math.min(Math.max(v, min), max));
          }}
          placeholder="0"
          min={min}
          max={max}
          className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            {unit}
          </span>
        )}
      </div>
      <p className="text-[10px] text-muted-foreground">
        Min: {min} — Max: {max.toLocaleString()}
      </p>
    </div>
  );
}
