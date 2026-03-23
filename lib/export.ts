import { toPng } from "html-to-image";

export async function exportMockup(
  element: HTMLElement,
  filename: string = "mockframe-export"
): Promise<void> {
  const dataUrl = await toPng(element, {
    quality: 1,
    pixelRatio: 3,
    cacheBust: true,
  });

  const link = document.createElement("a");
  link.download = `${filename}.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
