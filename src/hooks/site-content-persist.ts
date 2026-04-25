"use client";

import {
  type SiteContent,
  SITE_CONTENT_STORAGE_KEY,
  SITE_CONTENT_UPDATE_EVENT,
} from "@/data/site-content";

export function persistSiteContent(content: SiteContent) {
  localStorage.setItem(SITE_CONTENT_STORAGE_KEY, JSON.stringify(content));
  window.dispatchEvent(new Event(SITE_CONTENT_UPDATE_EVENT));
}

export function clearSiteContentStorage() {
  localStorage.removeItem(SITE_CONTENT_STORAGE_KEY);
  window.dispatchEvent(new Event(SITE_CONTENT_UPDATE_EVENT));
}
