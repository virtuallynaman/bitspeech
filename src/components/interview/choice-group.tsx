import { Button } from "@/components/ui/button";

type Props<T extends string> = {
  label: string;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  description?: string;
  disabled?: boolean;
};

export default function ChoiceGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  description,
  disabled,
}: Props<T>) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>

      <div role="group" aria-label={label} className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = option.value === value;

          return (
            <Button
              key={option.value}
              type="button"
              variant={isSelected ? "default" : "outline"}
              className="h-10 px-5"
              aria-pressed={isSelected}
              disabled={disabled}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </Button>
          );
        })}
      </div>

      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}
