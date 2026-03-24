"use client";

import { useRef, useState, useCallback } from "react";
import { Plus, Monitor, Laptop, Smartphone, ChevronDown } from "lucide-react";
import { MockupState, DeviceLayer, DeviceType, ScenePresetId } from "@/types/mockup";
import { SCENE_PRESETS } from "@/lib/presets";
import { BackgroundPicker } from "@/components/Editor/BackgroundPicker";
import { ExportButton } from "@/components/Editor/ExportButton";
import { ScenePresetSelector } from "@/components/Editor/ScenePresetSelector";
import { LayerPanel } from "@/components/Editor/LayerPanel";
import { Preview } from "@/components/Preview";

let nextId = 1;
function createLayer(device: DeviceType, overrides?: Partial<DeviceLayer>): DeviceLayer {
  return {
    id: `layer-${nextId++}`,
    device,
    image: null,
    x: 0,
    y: 0,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    browserTheme: "light",
    browserUrl: "",
    zIndex: 1,
    ...overrides,
  };
}

const INITIAL_STATE: MockupState = {
  layers: [createLayer("safari")],
  selectedLayerId: "layer-1",
  backgroundColor: "#1e1e1e",
  padding: 80,
  backgroundType: "gradient",
  gradientFrom: "#1e1e1e",
  gradientTo: "#434343",
  gradientDirection: 180,
  canvasWidth: 900,
  canvasHeight: 600,
};

export default function Home() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<MockupState>(INITIAL_STATE);
  const [expandedLayerId, setExpandedLayerId] = useState<string | null>(
    INITIAL_STATE.layers[0]?.id ?? null
  );
  const [showScenes, setShowScenes] = useState(false);

  const update = useCallback(
    (partial: Partial<MockupState>) =>
      setState((prev) => ({ ...prev, ...partial })),
    []
  );

  const updateLayer = useCallback(
    (layerId: string, partial: Partial<DeviceLayer>) =>
      setState((prev) => ({
        ...prev,
        layers: prev.layers.map((l) =>
          l.id === layerId ? { ...l, ...partial } : l
        ),
      })),
    []
  );

  const addLayer = useCallback(
    (device: DeviceType) => {
      const layer = createLayer(device, {
        zIndex: state.layers.length + 1,
      });
      setState((prev) => ({
        ...prev,
        layers: [...prev.layers, layer],
        selectedLayerId: layer.id,
      }));
      setExpandedLayerId(layer.id);
    },
    [state.layers.length]
  );

  const deleteLayer = useCallback(
    (layerId: string) =>
      setState((prev) => {
        const layers = prev.layers.filter((l) => l.id !== layerId);
        return {
          ...prev,
          layers,
          selectedLayerId:
            prev.selectedLayerId === layerId
              ? (layers[0]?.id ?? null)
              : prev.selectedLayerId,
        };
      }),
    []
  );

  const applyPreset = useCallback((presetId: ScenePresetId) => {
    const preset = SCENE_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    nextId = 1;
    const layers = preset.layers.map((l, i) =>
      createLayer(l.device, { ...l, zIndex: i + 1 })
    );

    setState({
      layers,
      selectedLayerId: layers[0]?.id ?? null,
      canvasWidth: preset.canvasWidth,
      canvasHeight: preset.canvasHeight,
      padding: preset.padding,
      backgroundType: preset.background.type,
      backgroundColor: preset.background.color ?? "#000000",
      gradientFrom: preset.background.from ?? "#6366f1",
      gradientTo: preset.background.to ?? "#ec4899",
      gradientDirection: preset.background.direction ?? 135,
    });
    setExpandedLayerId(layers[0]?.id ?? null);
  }, []);

  const handleLayerMove = useCallback(
    (layerId: string, x: number, y: number) => updateLayer(layerId, { x, y }),
    [updateLayer]
  );

  const hasAnyImage = state.layers.some((l) => l.image !== null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <h1 className="text-xl font-bold tracking-tight">MockFrame</h1>
        <p className="text-xs text-muted-foreground">
          Device Mockup Generator
        </p>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-[340px] border-r border-border p-5 space-y-6 overflow-y-auto md:h-[calc(100vh-73px)]">
          {/* Scene presets */}
          <section>
            <button
              onClick={() => setShowScenes((v) => !v)}
              className="flex items-center justify-between w-full text-sm font-semibold mb-2"
            >
              Escenas
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showScenes ? "rotate-180" : ""}`} />
            </button>
            <div
              className="grid transition-all duration-300 ease-in-out"
              style={{ gridTemplateRows: showScenes ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <ScenePresetSelector onApply={applyPreset} />
              </div>
            </div>
          </section>

          {/* Layers */}
          <section>
            <h2 className="text-sm font-semibold mb-2">Dispositivos</h2>
            {/* Add device buttons */}
            <div className="grid grid-cols-4 gap-1.5 mb-3">
              {([
                { device: "safari" as DeviceType, icon: Monitor, label: "Safari" },
                { device: "macbook" as DeviceType, icon: Laptop, label: "MacBook" },
                { device: "iphone15" as DeviceType, icon: Smartphone, label: "iPhone" },
                { device: "android-pixel" as DeviceType, icon: Smartphone, label: "Android" },
              ]).map(({ device, icon: Icon, label }) => (
                <button
                  key={device}
                  onClick={() => addLayer(device)}
                  className="flex flex-col items-center gap-1 p-2 rounded-lg border border-dashed border-border hover:border-primary/40 hover:bg-primary/5 transition-all text-muted-foreground hover:text-primary"
                >
                  <Plus className="w-3 h-3 opacity-50" />
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px]">{label}</span>
                </button>
              ))  }
            </div>
            <div className="space-y-2">
              {state.layers.map((layer) => (
                <LayerPanel
                  key={layer.id}
                  layer={layer}
                  isSelected={state.selectedLayerId === layer.id}
                  isExpanded={expandedLayerId === layer.id}
                  onSelect={() => update({ selectedLayerId: layer.id })}
                  onToggleExpand={() =>
                    setExpandedLayerId((prev) =>
                      prev === layer.id ? null : layer.id
                    )
                  }
                  onUpdate={(partial) => updateLayer(layer.id, partial)}
                  onDelete={() => deleteLayer(layer.id)}
                  onImageUpload={(dataUrl) =>
                    updateLayer(layer.id, { image: dataUrl })
                  }
                />
              ))}
            </div>
          </section>

          {/* Background */}
          <section>
            <h2 className="text-sm font-semibold mb-2">Fondo</h2>
            <BackgroundPicker state={state} onChange={update} />
          </section>

          {/* Export */}
          <ExportButton
            previewRef={previewRef}
            disabled={!hasAnyImage}
            exportWidth={state.canvasWidth + state.padding * 2}
            exportHeight={state.canvasHeight + state.padding * 2}
          />
        </aside>

        {/* Preview area */}
        <main className="flex-1 flex items-center justify-center p-8 md:h-[calc(100vh-73px)] overflow-hidden bg-[#f8f8f8] dark:bg-[#0a0a0a]">
          <div>
            <Preview
              ref={previewRef}
              state={state}
              onLayerSelect={(id) => {
                update({ selectedLayerId: id });
                setExpandedLayerId(id);
              }}
              onLayerMove={handleLayerMove}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
