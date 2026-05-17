"use client";

import { useContext } from "react";
import { BackgroundContext } from "@/app/lib/backgroundContext";
import { embers } from "@/app/lib/embersConfig";

export default function EmbersBackground() {
  const context = useContext(BackgroundContext);

  if (context?.isDisabled) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
      data-embers="true"
      aria-hidden="true"
    >
      {embers.map((ember, index) => (
        <div
          key={`ember-${index}`}
          className={`ember ember-sway-${ember.swayVariant}`}
          style={{
            left: `${ember.x}%`,
            width: `${ember.size}px`,
            height: `${ember.size}px`,
            animationDuration: `${ember.duration}s`,
            animationDelay: `${ember.delay}s`,
            // Pass peak opacity to keyframes via custom property
            ["--ember-opacity" as string]: ember.baseOpacity,
          }}
        />
      ))}
    </div>
  );
}
