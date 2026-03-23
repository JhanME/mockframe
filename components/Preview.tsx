"use client";

import { forwardRef } from "react";
import { MockupState } from "@/types/mockup";
import { DEVICE_COMPONENTS } from "@/components/devices";

interface PreviewProps {
  state: MockupState;
}

export const Preview = forwardRef<HTMLDivElement, PreviewProps>(
  function Preview({ state }, ref) {
    const DeviceComponent = DEVICE_COMPONENTS[state.selectedDevice];

    const background =
      state.backgroundType === "gradient"
        ? `linear-gradient(${state.gradientDirection}deg, ${state.gradientFrom}, ${state.gradientTo})`
        : state.backgroundColor;

    return (
      <div
        ref={ref}
        className="inline-block"
        style={{
          background,
          padding: `${state.padding}px`,
        }}
      >
        {state.image ? (
          <DeviceComponent imageSrc={state.image} browserTheme={state.browserTheme} />
        ) : (
          <div className="w-[600px] h-[400px] flex items-center justify-center text-white/50 text-sm">
            Sube una imagen para comenzar
          </div>
        )}
      </div>
    );
  }
);
