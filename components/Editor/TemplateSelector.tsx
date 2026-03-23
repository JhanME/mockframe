"use client";

import { Monitor, Laptop, Smartphone } from "lucide-react";
import { DeviceType } from "@/types/mockup";
import { DEVICE_TEMPLATES } from "@/lib/templates";

const ICONS = {
  browser: Monitor,
  laptop: Laptop,
  phone: Smartphone,
} as const;

interface TemplateSelectorProps {
  selected: DeviceType;
  onSelect: (device: DeviceType) => void;
}

export function TemplateSelector({
  selected,
  onSelect,
}: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {DEVICE_TEMPLATES.map((template) => {
        const Icon = ICONS[template.category];
        const isSelected = selected === template.id;
        return (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all text-sm ${
              isSelected
                ? "border-primary bg-primary/5 text-primary"
                : "border-border hover:border-primary/30 text-muted-foreground"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium text-xs">{template.name}</span>
          </button>
        );
      })}
    </div>
  );
}
