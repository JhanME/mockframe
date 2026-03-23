export type DeviceType = "safari" | "macbook" | "iphone15" | "android-pixel";

export interface DeviceTemplate {
  id: DeviceType;
  name: string;
  category: "browser" | "laptop" | "phone";
  icon: string;
}

export type BrowserTheme = "light" | "dark";

export interface MockupState {
  image: string | null;
  selectedDevice: DeviceType;
  browserTheme: BrowserTheme;
  backgroundColor: string;
  padding: number;
  backgroundType: "solid" | "gradient";
  gradientFrom: string;
  gradientTo: string;
  gradientDirection: number;
}

export interface DeviceFrameProps {
  imageSrc: string;
  className?: string;
  browserTheme?: BrowserTheme;
}
