"use client";
import { useState, useRef } from "react";

export default function ImageCompressor() {
  const [original, setOriginal] = useState<{ url: string; size: number; name: string } | null>(null);
  const [compressed, setCompressed] = useState<{ url: string; size: number } | null>(null);
  const [quality, setQuality] = useState(75);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setOriginal({ url: URL.createObjectURL(file), size: file.size, name: file.name });
    setCompressed(null);
    compress(file, quality);
  }

  function compress(file: File | null, q: number) {
    if (!file && !original) return;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (blob) setCompressed({ url: URL.createObjectURL(blob), size: blob.size });
        },
        "image/jpeg",
        q / 100
      );
    };
    img.src = file ? URL.createObjectURL(file) : original!.url;
  }

  function handleQualityChange(q: number) {
    setQuality(q);
    if (original) {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => { if (blob) setCompressed({ url: URL.createObjectURL(blob), size: blob.size }); },
          "image/jpeg", q / 100
        );
      };
      img.src = original.url;
    }
  }

  function download() {
    if (!compressed) return;
    const a = document.createElement("a");
    a.href = compressed.url;
    a.download = `compressed-${original?.name || "image"}.jpg`;
    a.click();
  }

  const reduction = original && compressed ? Math.round((1 - compressed.size / original.size) * 100) : 0;

  return (
    <div className="space-y-6">
      <canvas ref={canvasRef} className="hidden" />

      <div>
        <label className="block text-sm text-gray-300 mb-1">Upload Image</label>
        <input type="file" accept="image/*" onChange={handleFile}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-500 file:text-white file:font-medium file:cursor-pointer" />
      </div>

      {original && (
        <>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Quality: {quality}%</label>
            <input type="range" min="1" max="100" value={quality} onChange={(e) => handleQualityChange(Number(e.target.value))}
              className="w-full accent-orange-500" />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1% (smallest)</span><span>100% (best quality)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-gray-800/50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-400">Original</p>
              <p className="text-white font-semibold text-sm">{(original.size / 1024).toFixed(1)} KB</p>
            </div>
            {compressed && (
              <>
                <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-400">Compressed</p>
                  <p className="text-white font-semibold text-sm">{(compressed.size / 1024).toFixed(1)} KB</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-400">Reduction</p>
                  <p className={`font-semibold text-sm ${reduction > 0 ? "text-green-400" : "text-red-400"}`}>{reduction}%</p>
                </div>
              </>
            )}
          </div>

          {compressed && (
            <button onClick={download} className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
              Download Compressed Image
            </button>
          )}

          {original.url && (
            <div>
              <p className="text-sm text-gray-400 mb-2">Preview</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={compressed?.url || original.url} alt="Preview" className="max-w-full max-h-64 rounded-lg border border-gray-700" />
            </div>
          )}
        </>
      )}

      <p className="text-xs text-gray-500">All processing happens in your browser. No images are uploaded to any server.</p>
    </div>
  );
}
