import { DeviceFrameProps } from "@/types/mockup";

export function SafariBrowser({ imageSrc, className, browserTheme = "light" }: DeviceFrameProps) {
  const isDark = browserTheme === "dark";

  return (
    <div className={`rounded-xl overflow-hidden shadow-2xl ${className ?? ""}`}>
      {/* Title bar */}
      <div
        className="h-[52px] flex items-center px-4 gap-2 relative"
        style={{ backgroundColor: isDark ? "#2B2B2B" : "#E2E2E2" }}
      >
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <div
          className="flex-1 mx-12 h-7 rounded-md flex items-center justify-center"
          style={{ backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF" }}
        />
      </div>
      {/* Screen */}
      <img
        src={imageSrc}
        alt="Screenshot"
        className="w-full block"
        draggable={false}
      />
    </div>
  );
}
