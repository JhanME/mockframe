import { DeviceFrameProps } from "@/types/mockup";

export function AndroidPixel({ imageSrc, className }: DeviceFrameProps) {
  return (
    <div
      className={`bg-[#1A1A1A] rounded-[40px] p-[12px] shadow-2xl relative max-w-[320px] ${className ?? ""}`}
    >
      {/* Power button */}
      <div className="absolute -right-[3px] top-[100px] w-[3px] h-[50px] bg-[#2D2D2D] rounded-r" />
      {/* Volume buttons */}
      <div className="absolute -left-[3px] top-[90px] w-[3px] h-[30px] bg-[#2D2D2D] rounded-l" />
      <div className="absolute -left-[3px] top-[130px] w-[3px] h-[30px] bg-[#2D2D2D] rounded-l" />
      {/* Screen */}
      <div className="rounded-[30px] overflow-hidden relative bg-black">
        {/* Punch-hole camera */}
        <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[16px] h-[16px] bg-black rounded-full z-10 border-2 border-[#2a2a2a]" />
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
