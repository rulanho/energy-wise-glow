interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  unit?: string;
}

export function InputField({ label, value, onChange, min, max, unit }: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
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
