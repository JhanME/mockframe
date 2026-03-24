export type DeviceType = "safari" | "macbook" | "iphone15" | "android-pixel";

export interface DeviceTemplate {
  id: DeviceType;
  name: string;
  category: "browser" | "laptop" | "phone";
  icon: string;
}

export type BrowserTheme = "light" | "dark";

export interface DeviceLayer {
  id: string;
  device: DeviceType;
  image: string | null;
  x: number;
  y: number;
  scale: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  browserTheme: BrowserTheme;
  browserUrl: string;
  zIndex: number;
}

export interface MockupState {
  layers: DeviceLayer[];
  selectedLayerId: string | null;
  backgroundColor: string;
  padding: number;
  backgroundType: "solid" | "gradient";
  gradientFrom: string;
  gradientTo: string;
  gradientDirection: number;
  canvasWidth: number;
  canvasHeight: number;
}

export interface DeviceFrameProps {
  imageSrc: string;
  className?: string;
  browserTheme?: BrowserTheme;
  browserUrl?: string;
}

export type ScenePresetId =
  | "single-browser"
  | "single-phone"
  | "hero-section"
  | "app-store"
  | "twitter-card"
  | "multi-device";

export interface ScenePreset {
  id: ScenePresetId;
  name: string;
  description: string;
  canvasWidth: number;
  canvasHeight: number;
  layers: Omit<DeviceLayer, "id" | "image">[];
  background: {
    type: "solid" | "gradient";
    color?: string;
    from?: string;
    to?: string;
    direction?: number;
  };
  padding: number;
}
