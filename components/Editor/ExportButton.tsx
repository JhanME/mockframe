"use client";

import { RefObject, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportMockup } from "@/lib/export";

interface ExportButtonProps {
  previewRef: RefObject<HTMLDivElement | null>;
  disabled: boolean;
}

export function ExportButton({ previewRef, disabled }: ExportButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    if (!previewRef.current) return;
    setLoading(true);
    try {
      await exportMockup(previewRef.current);
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={disabled || loading}
      className="w-full"
      size="lg"
    >
      <Download className="w-4 h-4 mr-2" />
      {loading ? "Exportando..." : "Exportar PNG"}
    </Button>
  );
}
