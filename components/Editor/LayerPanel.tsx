"use client";

import { useRef, useCallback } from "react";
import {
  Sun,
  Moon,
  Globe,
  Trash2,
  Upload,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { DeviceLayer, DeviceType } from "@/types/mockup";
import { DEVICE_TEMPLATES } from "@/lib/templates";

interface LayerPanelProps {
  layer: DeviceLayer;
  isSelected: boolean;
  isExpanded: boolean;
  onSelect: () => void;
  onToggleExpand: () => void;
  onUpdate: (partial: Partial<DeviceLayer>) => void;
  onDelete: () => void;
  onImageUpload: (dataUrl: string) => void;
}

export function LayerPanel({
  layer,
  isSelected,
  isExpanded,
  onSelect,
  onToggleExpand,
  onUpdate,
  onDelete,
  onImageUpload,
}: LayerPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const template = DEVICE_TEMPLATES.find((t) => t.id === layer.device);

  const processFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) onImageUpload(e.target.result as string);
      };
      reader.readAsDataURL(file);
    },
    [onImageUpload]
  );

  return (
    <div
      className={`rounded-lg border-2 transition-all ${
        isSelected ? "border-primary bg-primary/5" : "border-border"
      }`}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 p-2.5 cursor-pointer"
        onClick={() => {
          onSelect();
          if (!isExpanded) onToggleExpand();
        }}
      >
        <div className="flex-1 min-w-0">
          <span className="text-xs font-medium block truncate">
            {template?.name ?? layer.device}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {layer.image ? "Con imagen" : "Sin imagen"}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleExpand();
          }}
          className="p-1 hover:bg-muted rounded"
        >
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1 hover:bg-destructive/10 hover:text-destructive rounded"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {isExpanded && (
        <div className="px-2.5 pb-2.5 space-y-3 border-t border-border pt-2.5">
          {/* Image upload */}
          {layer.image ? (
            <div className="space-y-1.5">
              <div className="rounded overflow-hidden border border-border">
                <img
                  src={layer.image}
                  alt=""
                  className="w-full h-20 object-cover"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full h-7 text-xs"
                onClick={() => inputRef.current?.click()}
              >
                Cambiar imagen
              </Button>
            </div>
          ) : (
            <button
              onClick={() => inputRef.current?.click()}
              className="w-full border border-dashed border-muted-foreground/25 rounded p-3 text-center hover:border-primary/50 transition-colors"
            >
              <Upload className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Subir imagen
              </span>
            </button>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) processFile(file);
            }}
          />

          {/* Device type */}
          <div>
            <label className="text-[10px] text-muted-foreground mb-1 block">
              Dispositivo
            </label>
            <div className="grid grid-cols-4 gap-1">
              {DEVICE_TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onUpdate({ device: t.id as DeviceType })}
                  className={`text-[10px] p-1.5 rounded border transition-all ${
                    layer.device === t.id
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:border-primary/30 text-muted-foreground"
                  }`}
                >
                  {t.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Safari-specific controls */}
          {layer.device === "safari" && (
            <>
              <div>
                <label className="text-[10px] text-muted-foreground mb-1 block">
                  Tema
                </label>
                <div className="flex gap-1">
                  <button
                    onClick={() => onUpdate({ browserTheme: "light" })}
                    className={`flex-1 flex items-center justify-center gap-1 p-1.5 rounded border text-xs ${
                      layer.browserTheme === "light"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    <Sun className="w-3 h-3" />
                    Claro
                  </button>
                  <button
                    onClick={() => onUpdate({ browserTheme: "dark" })}
                    className={`flex-1 flex items-center justify-center gap-1 p-1.5 rounded border text-xs ${
                      layer.browserTheme === "dark"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    <Moon className="w-3 h-3" />
                    Oscuro
                  </button>
                </div>
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground mb-1 block">
                  URL
                </label>
                <div className="flex items-center gap-1.5 border border-border rounded px-2 py-1">
                  <Globe className="w-3 h-3 text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    value={layer.browserUrl}
                    onChange={(e) => onUpdate({ browserUrl: e.target.value })}
                    placeholder="tuapp.com"
                    className="flex-1 text-xs bg-transparent outline-none placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>
            </>
          )}

          {/* Scale */}
          <div>
            <label className="text-[10px] text-muted-foreground mb-1 block">
              Escala: {Math.round(layer.scale * 100)}%
            </label>
            <Slider
              value={[layer.scale * 100]}
              onValueChange={([v]) => onUpdate({ scale: v / 100 })}
              min={10}
              max={150}
              step={5}
            />
          </div>

          {/* 3D Rotation */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[10px] text-muted-foreground">
                Rotacion 3D
              </label>
              <button
                onClick={() =>
                  onUpdate({ rotateX: 0, rotateY: 0, rotateZ: 0 })
                }
                className="p-0.5 hover:bg-muted rounded"
                title="Resetear rotacion"
              >
                <RotateCcw className="w-3 h-3 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-2">
              <div>
                <label className="text-[10px] text-muted-foreground">
                  X: {layer.rotateX}°
                </label>
                <Slider
                  value={[layer.rotateX]}
                  onValueChange={([v]) => onUpdate({ rotateX: v })}
                  min={-45}
                  max={45}
                  step={1}
                />
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground">
                  Y: {layer.rotateY}°
                </label>
                <Slider
                  value={[layer.rotateY]}
                  onValueChange={([v]) => onUpdate({ rotateY: v })}
                  min={-45}
                  max={45}
                  step={1}
                />
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground">
                  Z: {layer.rotateZ}°
                </label>
                <Slider
                  value={[layer.rotateZ]}
                  onValueChange={([v]) => onUpdate({ rotateZ: v })}
                  min={-30}
                  max={30}
                  step={1}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
