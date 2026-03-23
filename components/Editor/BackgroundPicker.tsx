"use client";

import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MockupState } from "@/types/mockup";

const PRESET_COLORS = [
  "#6366f1",
  "#ec4899",
  "#f97316",
  "#10b981",
  "#0ea5e9",
  "#8b5cf6",
  "#000000",
  "#ffffff",
];

interface BackgroundPickerProps {
  state: Pick<
    MockupState,
    | "backgroundColor"
    | "padding"
    | "backgroundType"
    | "gradientFrom"
    | "gradientTo"
    | "gradientDirection"
  >;
  onChange: (partial: Partial<MockupState>) => void;
}

export function BackgroundPicker({ state, onChange }: BackgroundPickerProps) {
  return (
    <div className="space-y-4">
      <Tabs
        value={state.backgroundType}
        onValueChange={(v) =>
          onChange({ backgroundType: v as "solid" | "gradient" })
        }
      >
        <TabsList className="w-full">
          <TabsTrigger value="solid" className="flex-1">
            Solido
          </TabsTrigger>
          <TabsTrigger value="gradient" className="flex-1">
            Gradiente
          </TabsTrigger>
        </TabsList>

        <TabsContent value="solid" className="space-y-3 mt-3">
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={state.backgroundColor}
              onChange={(e) => onChange({ backgroundColor: e.target.value })}
              className="w-8 h-8 rounded cursor-pointer border border-border"
            />
            <span className="text-xs text-muted-foreground font-mono">
              {state.backgroundColor}
            </span>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => onChange({ backgroundColor: color })}
                className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${
                  state.backgroundColor === color
                    ? "border-primary scale-110"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gradient" className="space-y-3 mt-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <input
                type="color"
                value={state.gradientFrom}
                onChange={(e) => onChange({ gradientFrom: e.target.value })}
                className="w-7 h-7 rounded cursor-pointer border border-border"
              />
              <span className="text-xs text-muted-foreground">Desde</span>
            </div>
            <div className="flex items-center gap-1.5">
              <input
                type="color"
                value={state.gradientTo}
                onChange={(e) => onChange({ gradientTo: e.target.value })}
                className="w-7 h-7 rounded cursor-pointer border border-border"
              />
              <span className="text-xs text-muted-foreground">Hasta</span>
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">
              Direccion: {state.gradientDirection}°
            </label>
            <Slider
              value={[state.gradientDirection]}
              onValueChange={([v]) => onChange({ gradientDirection: v })}
              min={0}
              max={360}
              step={5}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Padding */}
      <div>
        <label className="text-xs text-muted-foreground mb-1 block">
          Padding: {state.padding}px
        </label>
        <Slider
          value={[state.padding]}
          onValueChange={([v]) => onChange({ padding: v })}
          min={0}
          max={120}
          step={4}
        />
      </div>
    </div>
  );
}
