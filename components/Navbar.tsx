"use client";

import { useScrollPosition } from "@/hooks/useScrollPosition";

const navLinks = [
  { label: "Hero", href: "#hero" },
  { label: "Experience", href: "#experience" },
  { label: "Skill Bridge", href: "#skill-bridge" },
];

export default function Navbar() {
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 0;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={`transition-all duration-300 px-6 py-4 flex items-center justify-between ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <span className="font-semibold text-sm tracking-wide">RSH</span>
        <ul className="flex gap-6 list-none m-0 p-0">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm hover:opacity-70 transition-opacity duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
