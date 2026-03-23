"use client";

import { useRef, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { MockupState } from "@/types/mockup";
import { ImageUploader } from "@/components/Editor/ImageUploader";
import { TemplateSelector } from "@/components/Editor/TemplateSelector";
import { BackgroundPicker } from "@/components/Editor/BackgroundPicker";
import { ExportButton } from "@/components/Editor/ExportButton";
import { Preview } from "@/components/Preview";

export default function Home() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<MockupState>({
    image: null,
    selectedDevice: "safari",
    browserTheme: "light",
    backgroundColor: "#6366f1",
    padding: 40,
    backgroundType: "gradient",
    gradientFrom: "#6366f1",
    gradientTo: "#ec4899",
    gradientDirection: 135,
  });

  const update = (partial: Partial<MockupState>) =>
    setState((prev) => ({ ...prev, ...partial }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <h1 className="text-xl font-bold tracking-tight">MockFrame</h1>
        <p className="text-xs text-muted-foreground">
          Device Mockup Generator
        </p>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-[340px] border-r border-border p-5 space-y-6 overflow-y-auto md:h-[calc(100vh-73px)]">
          {/* Upload */}
          <section>
            <h2 className="text-sm font-semibold mb-2">Imagen</h2>
            <ImageUploader
              image={state.image}
              onImageUpload={(image) => update({ image })}
            />
          </section>

          {/* Device selector */}
          <section>
            <h2 className="text-sm font-semibold mb-2">Dispositivo</h2>
            <TemplateSelector
              selected={state.selectedDevice}
              onSelect={(selectedDevice) => update({ selectedDevice })}
            />
          </section>

          {/* Browser theme (only for Safari) */}
          {state.selectedDevice === "safari" && (
            <section>
              <h2 className="text-sm font-semibold mb-2">Tema del browser</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => update({ browserTheme: "light" })}
                  className={`flex-1 flex items-center justify-center gap-1.5 p-2.5 rounded-lg border-2 transition-all text-sm ${
                    state.browserTheme === "light"
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:border-primary/30 text-muted-foreground"
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  <span className="text-xs font-medium">Claro</span>
                </button>
                <button
                  onClick={() => update({ browserTheme: "dark" })}
                  className={`flex-1 flex items-center justify-center gap-1.5 p-2.5 rounded-lg border-2 transition-all text-sm ${
                    state.browserTheme === "dark"
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:border-primary/30 text-muted-foreground"
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  <span className="text-xs font-medium">Oscuro</span>
                </button>
              </div>
            </section>
          )}

          {/* Background */}
          <section>
            <h2 className="text-sm font-semibold mb-2">Fondo</h2>
            <BackgroundPicker state={state} onChange={update} />
          </section>

          {/* Export */}
          <ExportButton previewRef={previewRef} disabled={!state.image} />
        </aside>

        {/* Preview area */}
        <main className="flex-1 flex items-center justify-center p-8 md:h-[calc(100vh-73px)] overflow-auto bg-[#f8f8f8] dark:bg-[#0a0a0a]">
          <div className="max-w-full overflow-auto">
            <Preview ref={previewRef} state={state} />
          </div>
        </main>
      </div>
    </div>
  );
}
