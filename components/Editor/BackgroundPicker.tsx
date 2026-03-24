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

const PRESET_GRADIENTS = [
  { from: "#6366f1", to: "#ec4899", dir: 135, label: "Violeta Rosa" },
  { from: "#0ea5e9", to: "#22d3ee", dir: 135, label: "Ocean" },
  { from: "#f97316", to: "#eab308", dir: 135, label: "Sunset" },
  { from: "#10b981", to: "#06b6d4", dir: 135, label: "Emerald" },
  { from: "#8b5cf6", to: "#6366f1", dir: 135, label: "Purple" },
  { from: "#ef4444", to: "#f97316", dir: 135, label: "Fire" },
  { from: "#1e1e1e", to: "#434343", dir: 180, label: "Dark" },
  { from: "#667eea", to: "#764ba2", dir: 135, label: "Cosmic" },
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
          <div className="grid grid-cols-4 gap-1.5">
            {PRESET_GRADIENTS.map((g) => (
              <button
                key={g.label}
                title={g.label}
                onClick={() =>
                  onChange({
                    gradientFrom: g.from,
                    gradientTo: g.to,
                    gradientDirection: g.dir,
                  })
                }
                className={`h-7 rounded-md border-2 transition-transform hover:scale-105 ${
                  state.gradientFrom === g.from && state.gradientTo === g.to
                    ? "border-primary scale-105"
                    : "border-transparent"
                }`}
                style={{
                  background: `linear-gradient(${g.dir}deg, ${g.from}, ${g.to})`,
                }}
              />
            ))}
          </div>
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
