"use client";

import React from "react";
import * as LucideIcons from "lucide-react";

interface DynamicIconProps {
  name: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

/**
 * Renders a Lucide icon dynamically by name string.
 * Falls back to a Circle icon if the name isn't found.
 */
export default function DynamicIcon({
  name,
  size = 24,
  strokeWidth = 1.5,
  className = "",
}: DynamicIconProps) {
  // Convert kebab-case to PascalCase for Lucide component lookup
  const pascalName = name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

  const icons = LucideIcons as unknown as Record<string, React.FC<LucideIcons.LucideProps>>;
  const IconComponent = icons[pascalName] || LucideIcons.Circle;

  return <IconComponent size={size} strokeWidth={strokeWidth} className={className} />;
}
