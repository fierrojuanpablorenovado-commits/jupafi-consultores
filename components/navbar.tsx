"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "Servicios", href: "#servicios" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const bg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(9,9,11,0)", "rgba(9,9,11,0.8)"]
  );
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.6]);
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      style={{ backgroundColor: bg }}
      className="fixed top-10 inset-x-0 z-50 backdrop-blur-md"
    >
      <motion.div
        style={{ opacity: borderOpacity }}
        className="absolute inset-x-0 bottom-0 h-px bg-zinc-800"
      />
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-bold text-zinc-50">
          <span className="w-7 h-7 rounded-md bg-accent flex items-center justify-center text-zinc-950 font-black text-sm">
            J
          </span>
          <span className="tracking-tight">JuPaFi</span>
          <span className="text-zinc-500 font-normal text-sm hidden sm:inline">
            Consultores
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-300">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="px-4 py-2 rounded-lg bg-accent text-zinc-950 font-semibold hover:bg-accent-hover transition-colors"
          >
            Agendar consulta
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-zinc-100"
          aria-label="Menú"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="md:hidden border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-md overflow-hidden"
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-zinc-300 hover:text-accent transition-colors py-2"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-3 rounded-lg bg-accent text-zinc-950 font-semibold text-center"
            >
              Agendar consulta
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
