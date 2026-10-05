"use client";

import { bind, play, setEnabled, setVolume } from "cuelume";
import { useEffect, useSyncExternalStore } from "react";

const STORAGE_KEY = "sound-enabled";
const CHANGE_EVENT = "sound-preference-change";
let inMemoryEnabled = true;

function getSoundEnabled() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved !== null) return saved !== "false";
  } catch {
    // Use the current-page preference when storage is unavailable.
  }

  return inMemoryEnabled;
}

function subscribeToSound(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

export function SoundToggle() {
  const enabled = useSyncExternalStore(
    subscribeToSound,
    getSoundEnabled,
    () => true,
  );

  useEffect(() => {
    setVolume(0.5);
    setEnabled(enabled);
    bind();
  }, [enabled]);

  const toggle = () => {
    const nextEnabled = !enabled;
    inMemoryEnabled = nextEnabled;
    setEnabled(nextEnabled);
    if (nextEnabled) play("select", { emphasis: "subtle" });

    try {
      window.localStorage.setItem(STORAGE_KEY, String(nextEnabled));
    } catch {
      // Keep the current-page preference when storage is unavailable.
    }

    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  return (
    <button
      type="button"
      aria-pressed={enabled}
      onClick={toggle}
      data-cuelume-select
      className="fixed bottom-6 right-[clamp(24px,5.4vw,64px)] z-10 bg-background text-sm tracking-normal text-[#909090] hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      sound {enabled ? "on" : "off"}
    </button>
  );
}
