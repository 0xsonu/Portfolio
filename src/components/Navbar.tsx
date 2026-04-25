import { useState } from "react";
import { NavLink } from "react-router-dom";
import { profileData } from "../data/profile";
import SocialLinks from "./SocialLinks";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-bg-primary/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* Site title / logo */}
        <NavLink
          to="/"
          className="font-mono text-lg font-bold tracking-tight text-accent-cyan transition-colors duration-300 hover:text-accent-cyan/80"
        >
          {profileData.name.split(" ")[0]}
          <span className="text-text-secondary">.dev</span>
        </NavLink>

        {/* Desktop navigation links */}
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `font-mono text-sm transition-colors duration-300 ${
                    isActive
                      ? "text-accent-cyan drop-shadow-[0_0_6px_rgba(0,240,255,0.4)]"
                      : "text-text-secondary hover:text-text-primary"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop social links */}
        <div className="hidden md:block">
          <SocialLinks socials={profileData.socials} />
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded p-1.5 text-text-secondary transition-colors duration-300 hover:text-text-primary md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`overflow-hidden border-t border-white/5 bg-bg-primary/95 backdrop-blur-md transition-all duration-300 ease-in-out md:hidden ${
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-2 px-6 py-4">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block font-mono text-sm transition-colors duration-300 ${
                    isActive
                      ? "text-accent-cyan drop-shadow-[0_0_6px_rgba(0,240,255,0.4)]"
                      : "text-text-secondary hover:text-text-primary"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="px-6 pb-4">
          <SocialLinks socials={profileData.socials} />
        </div>
      </div>
    </nav>
  );
}
