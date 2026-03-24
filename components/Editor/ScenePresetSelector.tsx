"use client";

import { Monitor, Smartphone, Globe, Layout } from "lucide-react";
import { SCENE_PRESETS } from "@/lib/presets";
import { ScenePresetId } from "@/types/mockup";

const PRESET_ICONS: Record<ScenePresetId, React.ReactNode> = {
  "single-browser": <Monitor className="w-6 h-6" />,
  "single-phone": <Smartphone className="w-6 h-6" />,
  "hero-section": <Monitor className="w-6 h-6 rotate-[-8deg]" />,
  "app-store": <Smartphone className="w-6 h-6" />,
  "twitter-card": <Globe className="w-6 h-6" />,
  "multi-device": <Layout className="w-6 h-6" />,
};

interface ScenePresetSelectorProps {
  onApply: (presetId: ScenePresetId) => void;
}

export function ScenePresetSelector({ onApply }: ScenePresetSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {SCENE_PRESETS.map((preset) => (
        <button
          key={preset.id}
          onClick={() => onApply(preset.id)}
          className="group flex flex-col rounded-lg border-2 border-border overflow-hidden hover:border-primary/30 transition-all"
        >
          <div className="h-14 w-full bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
            {PRESET_ICONS[preset.id]}
          </div>
          <div className="p-2 text-left">
            <span className="text-xs font-medium block">{preset.name}</span>
            <span className="text-[10px] text-muted-foreground leading-tight block">
              {preset.description}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
