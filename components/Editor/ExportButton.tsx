"use client";

import { RefObject, useState } from "react";
import { FileImage, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportMockup, ExportFormat } from "@/lib/export";

interface ExportButtonProps {
  previewRef: RefObject<HTMLDivElement | null>;
  disabled: boolean;
  exportWidth?: number;
  exportHeight?: number;
}

export function ExportButton({ previewRef, disabled, exportWidth, exportHeight }: ExportButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleExport = async (format: ExportFormat) => {
    if (!previewRef.current) return;
    setLoading(true);
    try {
      await exportMockup(previewRef.current, format, "mockframe-export", exportWidth, exportHeight);
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => handleExport("png")}
        disabled={disabled || loading}
        className="flex-1"
        size="lg"
      >
        <FileImage className="w-4 h-4 mr-2" />
        {loading ? "..." : "PNG"}
      </Button>
      <Button
        onClick={() => handleExport("svg")}
        disabled={disabled || loading}
        variant="outline"
        className="flex-1"
        size="lg"
      >
        <FileCode className="w-4 h-4 mr-2" />
        {loading ? "..." : "SVG"}
      </Button>
    </div>
  );
}
