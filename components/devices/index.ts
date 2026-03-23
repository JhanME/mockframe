import { ComponentType } from "react";
import { DeviceType, DeviceFrameProps } from "@/types/mockup";
import { SafariBrowser } from "./SafariBrowser";
import { MacBook } from "./MacBook";
import { iPhone15 } from "./iPhone15";
import { AndroidPixel } from "./AndroidPixel";

export const DEVICE_COMPONENTS: Record<
  DeviceType,
  ComponentType<DeviceFrameProps>
> = {
  safari: SafariBrowser,
  macbook: MacBook,
  iphone15: iPhone15,
  "android-pixel": AndroidPixel,
};
