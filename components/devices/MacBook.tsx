import { DeviceFrameProps } from "@/types/mockup";

export function MacBook({ imageSrc, className }: DeviceFrameProps) {
  return (
    <div className={`flex flex-col items-center max-w-[720px] ${className ?? ""}`}>
      {/* Screen */}
      <div className="bg-[#2D2D2D] rounded-t-xl p-[12px] pt-[28px] relative shadow-2xl">
        {/* Camera notch */}
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#1a1a1a] border border-[#3a3a3a]" />
        {/* Screen content */}
        <div className="rounded-sm overflow-hidden">
          <img
            src={imageSrc}
            alt="Screenshot"
            className="w-full block"
            draggable={false}
          />
        </div>
      </div>
      {/* Hinge / Base */}
      <div className="w-[110%] h-[14px] bg-gradient-to-b from-[#C4C4C4] to-[#A8A8A8] rounded-b-lg relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[15%] h-[4px] bg-[#B0B0B0] rounded-b-sm" />
      </div>
    </div>
  );
}
