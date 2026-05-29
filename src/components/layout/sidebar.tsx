"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, APP_NAME } from "@/lib/constants";
import {
  Mic,
  MessageSquare,
  Smile,
  Heart,
  Calendar,
  BarChart2,
  Home,
  Menu,
  X,
} from "lucide-react";

/** Map icon string names to Lucide components */
const ICON_MAP: Record<string, React.FC<{ size?: number; strokeWidth?: number }>> = {
  mic: Mic,
  "message-square": MessageSquare,
  smile: Smile,
  heart: Heart,
  calendar: Calendar,
  "bar-chart-2": BarChart2,
};

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        {/* Logo */}
        <Link href="/" className="sidebar-logo" onClick={() => setIsOpen(false)}>
          <Home size={24} strokeWidth={2} />
          <span className="sidebar-logo-text">{APP_NAME}</span>
        </Link>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => {
            const IconComponent = ICON_MAP[item.icon];
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-link ${isActive ? "sidebar-link--active" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                {IconComponent && (
                  <IconComponent size={22} strokeWidth={isActive ? 2.5 : 2} />
                )}
                <span className="sidebar-link-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <p className="sidebar-footer-text">Made with care</p>
        </div>
      </aside>
    </>
  );
}
