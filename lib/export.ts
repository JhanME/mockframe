import { toPng, toSvg } from "html-to-image";

export type ExportFormat = "png" | "svg";

export async function exportMockup(
  element: HTMLElement,
  format: ExportFormat = "png",
  filename: string = "mockframe-export",
  width?: number,
  height?: number
): Promise<void> {
  // Temporarily force the element to its natural size for export
  const prevMinWidth = element.style.minWidth;
  const prevMinHeight = element.style.minHeight;
  if (width) element.style.minWidth = `${width}px`;
  if (height) element.style.minHeight = `${height}px`;

  let dataUrl: string;

  const baseOptions: Record<string, unknown> = { cacheBust: true };
  if (width) baseOptions.width = width;
  if (height) baseOptions.height = height;

  try {
    if (format === "svg") {
      dataUrl = await toSvg(element, baseOptions);
    } else {
      dataUrl = await toPng(element, {
        ...baseOptions,
        quality: 1,
        pixelRatio: 3,
      });
    }
  } finally {
    // Restore original styles
    element.style.minWidth = prevMinWidth;
    element.style.minHeight = prevMinHeight;
  }

  const link = document.createElement("a");
  link.download = `${filename}.${format}`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
