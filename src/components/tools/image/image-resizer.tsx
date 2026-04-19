"use client";
import { useState, useRef } from "react";

export default function ImageResizer() {
  const [original, setOriginal] = useState<{ url: string; w: number; h: number; name: string } | null>(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lockAspect, setLockAspect] = useState(true);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      setOriginal({ url: URL.createObjectURL(file), w: img.width, h: img.height, name: file.name });
      setWidth(String(img.width));
      setHeight(String(img.height));
      setResizedUrl(null);
    };
    img.src = URL.createObjectURL(file);
  }

  function onWidthChange(val: string) {
    setWidth(val);
    if (lockAspect && original) {
      const w = parseInt(val) || 0;
      setHeight(String(Math.round((w / original.w) * original.h)));
    }
  }

  function onHeightChange(val: string) {
    setHeight(val);
    if (lockAspect && original) {
      const h = parseInt(val) || 0;
      setWidth(String(Math.round((h / original.h) * original.w)));
    }
  }

  function resize() {
    if (!original) return;
    const w = parseInt(width) || original.w;
    const h = parseInt(height) || original.h;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, w, h);
      setResizedUrl(canvas.toDataURL("image/png"));
    };
    img.src = original.url;
  }

  function download() {
    if (!resizedUrl) return;
    const a = document.createElement("a");
    a.href = resizedUrl;
    a.download = `resized-${original?.name || "image"}.png`;
    a.click();
  }

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
          <div className="bg-gray-800/50 rounded-lg p-3 text-center text-sm">
            <span className="text-gray-400">Original: </span>
            <span className="text-white font-mono">{original.w} x {original.h} px</span>
          </div>

          <div className="grid grid-cols-2 gap-4 items-end">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Width (px)</label>
              <input type="number" value={width} onChange={(e) => onWidthChange(e.target.value)} min="1"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Height (px)</label>
              <input type="number" value={height} onChange={(e) => onHeightChange(e.target.value)} min="1"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none" />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input type="checkbox" checked={lockAspect} onChange={(e) => setLockAspect(e.target.checked)} className="rounded" />
            Lock aspect ratio
          </label>

          <div className="flex gap-3">
            <button onClick={resize} className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
              Resize
            </button>
            {resizedUrl && (
              <button onClick={download} className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors">
                Download
              </button>
            )}
          </div>

          {resizedUrl && (
            <div>
              <p className="text-sm text-gray-400 mb-2">Preview ({width} x {height} px)</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={resizedUrl} alt="Resized preview" className="max-w-full max-h-64 rounded-lg border border-gray-700" />
            </div>
          )}
        </>
      )}

      <p className="text-xs text-gray-500">All processing happens in your browser. No images are uploaded to any server.</p>
    </div>
  );
}
