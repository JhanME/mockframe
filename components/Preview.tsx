"use client";

import { forwardRef, useCallback, useRef, useState } from "react";
import { MockupState } from "@/types/mockup";
import { DEVICE_COMPONENTS } from "@/components/devices";

interface PreviewProps {
  state: MockupState;
  onLayerSelect: (layerId: string) => void;
  onLayerMove: (layerId: string, x: number, y: number) => void;
}

export const Preview = forwardRef<HTMLDivElement, PreviewProps>(
  function Preview({ state, onLayerSelect, onLayerMove }, ref) {
    const background =
      state.backgroundType === "gradient"
        ? `linear-gradient(${state.gradientDirection}deg, ${state.gradientFrom}, ${state.gradientTo})`
        : state.backgroundColor;

    const [dragging, setDragging] = useState<string | null>(null);
    const dragStart = useRef<{ x: number; y: number; layerX: number; layerY: number } | null>(null);

    const clamp = (val: number, limit: number) =>
      Math.max(-limit, Math.min(limit, val));

    const handleMouseDown = useCallback(
      (e: React.MouseEvent, layerId: string, layerX: number, layerY: number) => {
        e.stopPropagation();
        onLayerSelect(layerId);
        setDragging(layerId);
        dragStart.current = { x: e.clientX, y: e.clientY, layerX, layerY };
      },
      [onLayerSelect]
    );

    const handleMouseMove = useCallback(
      (e: React.MouseEvent) => {
        if (!dragging || !dragStart.current) return;
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        const rawX = dragStart.current.layerX + dx;
        const rawY = dragStart.current.layerY + dy;
        const maxX = state.canvasWidth / 2;
        const maxY = state.canvasHeight / 2;
        onLayerMove(dragging, clamp(rawX, maxX), clamp(rawY, maxY));
      },
      [dragging, onLayerMove, state.canvasWidth, state.canvasHeight]
    );

    const handleMouseUp = useCallback(() => {
      setDragging(null);
      dragStart.current = null;
    }, []);

    const sortedLayers = [...state.layers].sort((a, b) => a.zIndex - b.zIndex);

    return (
      <div
        ref={ref}
        className="inline-block"
        style={{
          background,
          padding: `${state.padding}px`,
        }}
      >
        <div
          className="relative"
          style={{
            width: `${state.canvasWidth}px`,
            height: `${state.canvasHeight}px`,
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {sortedLayers.map((layer) => {
            const DeviceComponent = DEVICE_COMPONENTS[layer.device];

            return (
              <div
                key={layer.id}
                className={`absolute cursor-grab select-none ${
                  dragging === layer.id ? "cursor-grabbing" : ""
                }`}
                style={{
                  left: `calc(50% + ${layer.x}px)`,
                  top: `calc(50% + ${layer.y}px)`,
                  width: "max-content",
                  transform: `perspective(800px) translate(-50%, -50%) scale(${layer.scale}) rotateX(${layer.rotateX}deg) rotateY(${layer.rotateY}deg) rotateZ(${layer.rotateZ}deg)`,
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                  zIndex: layer.zIndex,
                }}
                onMouseDown={(e) => handleMouseDown(e, layer.id, layer.x, layer.y)}
              >
                {layer.image ? (
                  <DeviceComponent
                    imageSrc={layer.image}
                    browserTheme={layer.browserTheme}
                    browserUrl={layer.browserUrl}
                  />
                ) : (
                  <div className="w-[400px] h-[280px] rounded-xl bg-white/10 border-2 border-dashed border-white/20 flex items-center justify-center">
                    <span className="text-white/40 text-xs">Sin imagen</span>
                  </div>
                )}
              </div>
            );
          })}

          {state.layers.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-white/40 text-sm">
              Agrega un dispositivo para comenzar
            </div>
          )}
        </div>
      </div>
    );
  }
);
