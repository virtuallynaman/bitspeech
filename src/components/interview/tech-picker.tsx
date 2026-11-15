import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Technology } from "@/lib/constants/interview";
import { technologyOptions } from "./options";

type Props = {
  selected: Technology[];
  onChange: (selected: Technology[]) => void;
  disabled?: boolean;
};

export default function TechPicker({ selected, onChange, disabled }: Props) {
  const allSelected = selected.length === technologyOptions.length;

  function toggle(tech: Technology) {
    if (selected.includes(tech)) {
      onChange(selected.filter((t) => t !== tech));
    } else {
      onChange([...selected, tech]);
    }
  }

  function toggleAll() {
    onChange(allSelected ? [] : technologyOptions.map((t) => t));
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Technologies & topics</p>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{selected.length} selected</span>
          <Button type="button" variant="ghost" size="sm" disabled={disabled} onClick={toggleAll}>
            {allSelected ? "Clear all" : "Select all"}
          </Button>
        </div>
      </div>

      <div role="group" aria-label="Technologies and topics" className="flex flex-wrap gap-2">
        {technologyOptions.map((tech) => {
          const isSelected = selected.includes(tech);

          return (
            <Button
              key={tech}
              type="button"
              size="sm"
              variant={isSelected ? "default" : "outline"}
              className="h-9 px-4"
              aria-pressed={isSelected}
              disabled={disabled}
              onClick={() => toggle(tech)}
            >
              {isSelected && <Check />}
              {tech}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
