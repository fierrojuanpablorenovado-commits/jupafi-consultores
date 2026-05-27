import { ReactNode } from "react";

/**
 * macOS-style browser window frame. Used to mock product UIs.
 * Pure CSS — zero assets needed.
 */
export function BrowserFrame({
  url = "app.example.com",
  children,
  className = "",
}: {
  url?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-zinc-700/80 bg-zinc-900 shadow-2xl shadow-black/40 ${className}`}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-3 py-2.5 bg-zinc-800/80 border-b border-zinc-700/60">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-3 py-0.5 rounded-md bg-zinc-900/80 text-[10px] font-mono text-zinc-500 max-w-xs truncate">
            🔒 {url}
          </div>
        </div>
        <div className="w-12" />
      </div>
      {/* Content */}
      <div className="bg-zinc-950">{children}</div>
    </div>
  );
}
