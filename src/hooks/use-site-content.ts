"use client";

import { useCallback, useEffect, useState } from "react";

import {
  type SiteContent,
  defaultSiteContent,
  parseSiteContentFromStorage,
  SITE_CONTENT_STORAGE_KEY,
  SITE_CONTENT_UPDATE_EVENT,
} from "@/data/site-content";

export function useSiteContent(): SiteContent {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);

  const readFromStorage = useCallback((): SiteContent => {
    if (typeof window === "undefined") return defaultSiteContent;
    const raw = localStorage.getItem(SITE_CONTENT_STORAGE_KEY);
    if (!raw) return defaultSiteContent;
    const parsed = parseSiteContentFromStorage(raw);
    return parsed ?? defaultSiteContent;
  }, []);

  useEffect(() => {
    setContent(readFromStorage());
  }, [readFromStorage]);

  useEffect(() => {
    const sync = () => setContent(readFromStorage());
    window.addEventListener("storage", sync);
    window.addEventListener(SITE_CONTENT_UPDATE_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(SITE_CONTENT_UPDATE_EVENT, sync);
    };
  }, [readFromStorage]);

  return content;
}
