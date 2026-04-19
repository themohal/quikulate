"use client";
import { useState, useMemo } from "react";

function decodeBase64Url(str: string): string {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4;
  const final = pad ? padded + "=".repeat(4 - pad) : padded;
  return decodeURIComponent(escape(atob(final)));
}

export default function JwtDecoder() {
  const [token, setToken] = useState("");

  const decoded = useMemo(() => {
    if (!token.trim()) return null;
    try {
      const parts = token.trim().split(".");
      if (parts.length !== 3) return { error: "Invalid JWT: must have 3 parts separated by dots" };

      const header = JSON.parse(decodeBase64Url(parts[0]));
      const payload = JSON.parse(decodeBase64Url(parts[1]));

      let expired = false;
      let expDate = "";
      let iatDate = "";

      if (payload.exp) {
        const d = new Date(payload.exp * 1000);
        expDate = d.toLocaleString();
        expired = d < new Date();
      }
      if (payload.iat) {
        iatDate = new Date(payload.iat * 1000).toLocaleString();
      }

      return { header, payload, signature: parts[2], expired, expDate, iatDate, error: "" };
    } catch {
      return { error: "Failed to decode JWT. Check the token format." };
    }
  }, [token]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-gray-300 mb-1">Paste JWT Token</label>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white font-mono text-sm focus:border-orange-500 focus:outline-none resize-y min-h-[80px]"
        />
      </div>

      {decoded?.error && <p className="text-red-400 text-sm">{decoded.error}</p>}

      {decoded && !decoded.error && (
        <div className="space-y-4">
          {decoded.expired !== undefined && (
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${decoded.expired ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}>
              {decoded.expired ? "EXPIRED" : "VALID (not expired)"}
            </div>
          )}

          <div>
            <h3 className="text-white text-sm font-medium mb-1">Header</h3>
            <pre className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-blue-400 font-mono text-xs overflow-x-auto">
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
          </div>

          <div>
            <h3 className="text-white text-sm font-medium mb-1">Payload</h3>
            <pre className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-green-400 font-mono text-xs overflow-x-auto">
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
            {(decoded.expDate || decoded.iatDate) && (
              <div className="mt-2 space-y-1 text-xs">
                {decoded.iatDate && <p className="text-gray-400">Issued: {decoded.iatDate}</p>}
                {decoded.expDate && <p className="text-gray-400">Expires: {decoded.expDate}</p>}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-white text-sm font-medium mb-1">Signature</h3>
            <div className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-purple-400 font-mono text-xs break-all">
              {decoded.signature}
            </div>
            <p className="text-xs text-gray-500 mt-1">Signature verification is not performed (client-side only)</p>
          </div>
        </div>
      )}
    </div>
  );
}
