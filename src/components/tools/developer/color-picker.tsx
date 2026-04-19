"use client";
import { useState, useCallback } from "react";

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace("#", "").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : null;
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((x) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360; s /= 100; l /= 100;
  if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [Math.round(hue2rgb(p, q, h + 1/3) * 255), Math.round(hue2rgb(p, q, h) * 255), Math.round(hue2rgb(p, q, h - 1/3) * 255)];
}

export default function ColorPicker() {
  const [hex, setHex] = useState("#ff6600");
  const rgb = hexToRgb(hex) || [255, 102, 0];
  const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);

  const updateFromHex = useCallback((h: string) => {
    if (/^#[0-9a-f]{6}$/i.test(h)) setHex(h.toLowerCase());
  }, []);

  const updateFromRgb = useCallback((r: number, g: number, b: number) => {
    setHex(rgbToHex(r, g, b));
  }, []);

  const updateFromHsl = useCallback((h: number, s: number, l: number) => {
    const [r, g, b] = hslToRgb(h, s, l);
    setHex(rgbToHex(r, g, b));
  }, []);

  const shades = Array.from({ length: 9 }, (_, i) => {
    const l = 10 + i * 10;
    const [r, g, b] = hslToRgb(hsl[0], hsl[1], l);
    return rgbToHex(r, g, b);
  });

  const copyText = (t: string) => navigator.clipboard.writeText(t);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="w-32 h-32 rounded-xl border border-gray-700 shrink-0" style={{ backgroundColor: hex }} />
        <div className="flex-1 space-y-4 w-full">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Color Picker</label>
            <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="w-full h-10 rounded cursor-pointer bg-transparent" />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">HEX</label>
            <div className="flex gap-2">
              <input value={hex} onChange={(e) => updateFromHex(e.target.value)} className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white font-mono text-sm focus:border-orange-500 focus:outline-none" />
              <button onClick={() => copyText(hex)} className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-white">Copy</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {["R", "G", "B"].map((ch, i) => (
          <div key={ch}>
            <label className="block text-xs text-gray-400 mb-1">{ch}</label>
            <input
              type="number" min="0" max="255"
              value={rgb[i]}
              onChange={(e) => { const v = [...rgb] as [number, number, number]; v[i] = parseInt(e.target.value) || 0; updateFromRgb(...v); }}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white font-mono text-sm focus:border-orange-500 focus:outline-none"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[{ l: "H", max: 360, i: 0 }, { l: "S%", max: 100, i: 1 }, { l: "L%", max: 100, i: 2 }].map(({ l, max, i }) => (
          <div key={l}>
            <label className="block text-xs text-gray-400 mb-1">{l}</label>
            <input
              type="number" min="0" max={max}
              value={hsl[i]}
              onChange={(e) => { const v = [...hsl] as [number, number, number]; v[i] = parseInt(e.target.value) || 0; updateFromHsl(...v); }}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white font-mono text-sm focus:border-orange-500 focus:outline-none"
            />
          </div>
        ))}
      </div>

      <div className="bg-gray-800/50 rounded-lg p-4 space-y-2">
        <h3 className="text-white text-sm font-medium mb-2">CSS Values</h3>
        {[
          { label: "HEX", value: hex },
          { label: "RGB", value: `rgb(${rgb.join(", ")})` },
          { label: "HSL", value: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)` },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <code className="text-gray-300 font-mono text-xs">{item.value}</code>
            <button onClick={() => copyText(item.value)} className="text-xs text-orange-400 hover:text-orange-300">Copy</button>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-white text-sm font-medium mb-2">Shades</h3>
        <div className="flex rounded-lg overflow-hidden">
          {shades.map((s) => (
            <button
              key={s}
              onClick={() => setHex(s)}
              className="flex-1 h-10 cursor-pointer hover:scale-110 transition-transform"
              style={{ backgroundColor: s }}
              title={s}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
