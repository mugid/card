"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState, type ChangeEvent } from "react";

import {
  type ProjectItem,
  type SiteContent,
  defaultProjectImageAtIndex,
  defaultSiteContent,
  parseSiteContentFromStorage,
  SITE_CONTENT_STORAGE_KEY,
} from "@/data/site-content";
import { clearSiteContentStorage, persistSiteContent } from "@/hooks/site-content-persist";

function loadInitialContent(): SiteContent {
  if (typeof window === "undefined") return defaultSiteContent;
  const raw = localStorage.getItem(SITE_CONTENT_STORAGE_KEY);
  if (!raw) return defaultSiteContent;
  return parseSiteContentFromStorage(raw) ?? defaultSiteContent;
}

function skillsToText(skills: string[]) {
  return skills.join("\n");
}

function textToSkills(text: string) {
  return text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

const MAX_PROJECT_IMAGE_BYTES = 2.5 * 1024 * 1024;

function readImageFileAsDataUrl(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    return Promise.reject(new Error("Select an image file (PNG, JPEG, WebP, etc.)."));
  }
  if (file.size > MAX_PROJECT_IMAGE_BYTES) {
    return Promise.reject(new Error("Image must be 2.5 MB or smaller for browser storage."));
  }
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => {
      const out = r.result;
      if (typeof out === "string") resolve(out);
      else reject(new Error("Could not read the file."));
    };
    r.onerror = () => reject(new Error("Could not read the file."));
    r.readAsDataURL(file);
  });
}

export default function AdminPage() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [mounted, setMounted] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const [imageFileErrors, setImageFileErrors] = useState<Record<number, string>>({});

  useEffect(() => {
    setContent(loadInitialContent());
    setMounted(true);
  }, []);

  const updateAbout = useCallback(
    (patch: Partial<SiteContent["about"]>) => {
      setContent((c) => ({ ...c, about: { ...c.about, ...patch } }));
    },
    []
  );

  const updateProject = useCallback(
    (index: number, patch: Partial<ProjectItem>) => {
      setContent((c) => {
        const projects = c.projects.map((p, i) => (i === index ? { ...p, ...patch } : p));
        return { ...c, projects };
      });
    },
    []
  );

  const addProject = useCallback(() => {
    setContent((c) => {
      const i = c.projects.length;
      return {
        ...c,
        projects: [
          ...c.projects,
          {
            name: "New project",
            description: "Description",
            href: "https://",
            image: defaultProjectImageAtIndex(i),
          },
        ],
      };
    });
  }, []);

  const removeProject = useCallback((index: number) => {
    setImageFileErrors({});
    setContent((c) => ({
      ...c,
      projects: c.projects.filter((_, i) => i !== index),
    }));
  }, []);

  const onProjectImageFile = useCallback(
    async (index: number, e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = "";
      if (!file) return;
      try {
        const data = await readImageFileAsDataUrl(file);
        updateProject(index, { image: data });
        setImageFileErrors((prev) => {
          const next = { ...prev };
          delete next[index];
          return next;
        });
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Upload failed";
        setImageFileErrors((prev) => ({ ...prev, [index]: msg }));
      }
    },
    [updateProject]
  );

  const onSave = useCallback(() => {
    persistSiteContent(content);
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 2000);
  }, [content]);

  const onReset = useCallback(() => {
    if (!confirm("Remove saved browser overrides and use defaults from the codebase?")) {
      return;
    }
    clearSiteContentStorage();
    setContent(defaultSiteContent);
  }, []);

  const onDownload = useCallback(() => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "site-content.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }, [content]);

  if (!mounted) {
    return (
      <div className="min-h-screen mx-auto max-w-2xl px-6 py-12 text-foreground/60">
        Loading…
      </div>
    );
  }

  return (
    <main className="min-h-screen mx-auto max-w-2xl px-6 py-10 pb-24 text-foreground">
      <p className="text-sm text-foreground/50 mb-6">
        <Link href="/" className="text-primary hover:underline">
          ← Home
        </Link>
      </p>
      <h1 className="text-2xl font-semibold text-primary mb-2">Edit site content</h1>
      <p className="text-sm text-foreground/60 leading-relaxed mb-8">
        Save stores data in <span className="font-mono text-foreground/80">localStorage</span> in
        this browser. The public site will use those values here after you save. Project cover
        uploads are stored as data in the same JSON; use images under 2.5 MB. To make changes
        permanent for all visitors, download the JSON and copy values into{" "}
        <span className="font-mono text-foreground/80">src/data/site-content.ts</span>{" "}
        (<code className="font-mono">defaultSiteContent</code>), or add files to{" "}
        <span className="font-mono text-foreground/80">public</span> and set paths, then deploy.
      </p>

      <div className="space-y-10">
        <section className="space-y-3">
          <h2 className="font-semibold text-lg">About</h2>
          <label className="block space-y-1">
            <span className="text-sm text-foreground/50">First paragraph</span>
            <textarea
              className="w-full min-h-28 rounded border border-foreground/15 bg-background px-3 py-2 text-sm"
              value={content.about.p1}
              onChange={(e) => updateAbout({ p1: e.target.value })}
            />
          </label>
          <label className="block space-y-1">
            <span className="text-sm text-foreground/50">Substring to highlight in primary (optional, must match text exactly once)</span>
            <input
              type="text"
              className="w-full rounded border border-foreground/15 bg-background px-3 py-2 text-sm"
              value={content.about.p1Highlight}
              onChange={(e) => updateAbout({ p1Highlight: e.target.value })}
            />
          </label>
          <label className="block space-y-1">
            <span className="text-sm text-foreground/50">Second paragraph</span>
            <textarea
              className="w-full min-h-20 rounded border border-foreground/15 bg-background px-3 py-2 text-sm"
              value={content.about.p2}
              onChange={(e) => updateAbout({ p2: e.target.value })}
            />
          </label>
          <p className="text-sm text-foreground/50">Third paragraph (link in the middle)</p>
          <div className="grid gap-2 sm:grid-cols-1">
            <input
              type="text"
              className="w-full rounded border border-foreground/15 bg-background px-3 py-2 text-sm"
              placeholder="Text before the link"
              value={content.about.p3Before}
              onChange={(e) => updateAbout({ p3Before: e.target.value })}
            />
            <div className="grid gap-2 sm:grid-cols-2">
              <input
                type="text"
                className="w-full rounded border border-foreground/15 bg-background px-3 py-2 text-sm"
                placeholder="Link label"
                value={content.about.p3LinkText}
                onChange={(e) => updateAbout({ p3LinkText: e.target.value })}
              />
              <input
                type="url"
                className="w-full rounded border border-foreground/15 bg-background px-3 py-2 text-sm"
                placeholder="https://…"
                value={content.about.p3LinkUrl}
                onChange={(e) => updateAbout({ p3LinkUrl: e.target.value })}
              />
            </div>
            <input
              type="text"
              className="w-full rounded border border-foreground/15 bg-background px-3 py-2 text-sm"
              placeholder="Text after the link (optional)"
              value={content.about.p3After}
              onChange={(e) => updateAbout({ p3After: e.target.value })}
            />
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-lg">Skills</h2>
          <label className="block space-y-1">
            <span className="text-sm text-foreground/50">One skill per line</span>
            <textarea
              className="w-full min-h-48 font-mono text-sm rounded border border-foreground/15 bg-background px-3 py-2"
              value={skillsToText(content.skills)}
              onChange={(e) => setContent((c) => ({ ...c, skills: textToSkills(e.target.value) }))}
            />
          </label>
        </section>

        <section className="space-y-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-semibold text-lg">Projects</h2>
            <button
              type="button"
              onClick={addProject}
              className="text-sm text-primary hover:underline"
            >
              + Add project
            </button>
          </div>
          <div className="space-y-4">
            {content.projects.map((p, i) => (
              <div
                key={i}
                className="rounded border border-foreground/15 p-3 space-y-2 bg-foreground/5"
              >
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeProject(i)}
                    className="text-xs text-foreground/40 hover:text-foreground/70"
                  >
                    Remove
                  </button>
                </div>
                <input
                  type="text"
                  className="w-full rounded border border-foreground/15 bg-background px-3 py-2 text-sm"
                  placeholder="Name"
                  value={p.name}
                  onChange={(e) => updateProject(i, { name: e.target.value })}
                />
                <textarea
                  className="w-full min-h-16 rounded border border-foreground/15 bg-background px-3 py-2 text-sm"
                  placeholder="Description"
                  value={p.description}
                  onChange={(e) => updateProject(i, { description: e.target.value })}
                />
                <input
                  type="url"
                  className="w-full rounded border border-foreground/15 bg-background px-3 py-2 text-sm font-mono"
                  placeholder="https://…"
                  value={p.href}
                  onChange={(e) => updateProject(i, { href: e.target.value })}
                />
                <div className="space-y-2">
                  <span className="text-sm text-foreground/50">Cover image</span>
                  <div className="relative h-40 w-full overflow-hidden rounded border border-foreground/15 bg-foreground/5">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      className="object-contain p-1"
                      sizes="(max-width: 42rem) 100vw, 42rem"
                      unoptimized={
                        p.image.startsWith("data:") || /^https?:\/\//.test(p.image)
                      }
                    />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full text-sm file:me-2 file:rounded file:border-0 file:bg-foreground/10 file:px-2 file:py-1 file:text-sm"
                    onChange={(e) => void onProjectImageFile(i, e)}
                  />
                  {imageFileErrors[i] ? (
                    <p className="text-sm text-red-500/90" role="alert">
                      {imageFileErrors[i]}
                    </p>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => {
                      setImageFileErrors((prev) => {
                        const next = { ...prev };
                        delete next[i];
                        return next;
                      });
                      updateProject(i, { image: defaultProjectImageAtIndex(i) });
                    }}
                    className="text-sm text-foreground/50 hover:text-foreground/80"
                  >
                    Use default placeholder image
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onSave}
          className="rounded bg-primary text-background px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          {savedFlash ? "Saved" : "Save in this browser"}
        </button>
        <button
          type="button"
          onClick={onDownload}
          className="rounded border border-foreground/20 px-4 py-2 text-sm hover:border-foreground/40"
        >
          Download JSON
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded border border-foreground/20 px-4 py-2 text-sm text-foreground/60 hover:text-foreground"
        >
          Reset to defaults
        </button>
      </div>
    </main>
  );
}
