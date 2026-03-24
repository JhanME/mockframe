import { DeviceFrameProps } from "@/types/mockup";

export function iPhone15({ imageSrc, className }: DeviceFrameProps) {
  return (
    <div
      className={`bg-[#1A1A1A] rounded-[50px] p-[14px] shadow-2xl relative max-w-[320px] ${className ?? ""}`}
      style={{ imageRendering: "auto", WebkitFontSmoothing: "antialiased" }}
    >
      {/* Side button right */}
      <div className="absolute -right-[3px] top-[120px] w-[3px] h-[60px] bg-[#2D2D2D] rounded-r" />
      {/* Volume buttons left */}
      <div className="absolute -left-[3px] top-[100px] w-[3px] h-[30px] bg-[#2D2D2D] rounded-l" />
      <div className="absolute -left-[3px] top-[140px] w-[3px] h-[30px] bg-[#2D2D2D] rounded-l" />
      {/* Screen */}
      <div className="rounded-[38px] overflow-hidden relative bg-black">
        <img
          src={imageSrc}
          alt="Screenshot"
          className="w-full block"
          draggable={false}
        />
      </div>
    </div>
  );
}
