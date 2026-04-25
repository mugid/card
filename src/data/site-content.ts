export type ProjectItem = {
  name: string;
  description: string;
  href: string;
  /**
   * Cover: `/file` in `public`, `https://` URL, or `data:image/…;base64,…` from admin upload
   * (kept in localStorage; keep files small).
   */
  image: string;
};

export type AboutContent = {
  /** First paragraph. If `p1Highlight` is a non-empty substring, it is styled as primary. */
  p1: string;
  p1Highlight: string;
  p2: string;
  p3Before: string;
  p3LinkText: string;
  p3LinkUrl: string;
  p3After: string;
};

export type SiteContent = {
  about: AboutContent;
  skills: string[];
  projects: ProjectItem[];
};

export const defaultSiteContent: SiteContent = {
  about: {
    p1: "I'm a frontend developer and designer. Currently, a cs student at Nazarbayev University. Being in love-hate relationship with React and Next.js, I build clean, responsive web apps — often blending development with design.",
    p1Highlight: "React and Next.js",
    p2: "I'm passionate about learning fast, building things that people actually use, and creating experiences that feel intuitive and thoughtful.",
    p3Before: "If you want to explore the design I do, check it out ",
    p3LinkText: "here",
    p3LinkUrl: "https://contra.com/bek_slambek_exnck1xg",
    p3After: "",
  },
  skills: [
    "react",
    "next.js",
    "tailwindcss",
    "shadcn/ui",
    "drizzle",
    "prisma",
    "postgresql",
    "supabase",
    "vercel",
    "motion",
    "zustand",
    "javascript",
    "typescript",
    "node.js",
    "html",
    "css",
    "git",
    "github",
    "python",
    "figma",
    "illustrator",
    "framer",
    "ui/ux",
  ],
  projects: [
    {
      name: "keyano",
      description: "An audio recorder for piano generated music.",
      href: "https://keyano.vercel.app",
      image: "https://placehold.co/800x500/101010/737373?text=keyano&font=montserrat",
    },
    {
      name: "distr.",
      description:
        "Generates distribution charts and tables based on input information. Currently involves bynomial and poisson distributions.",
      href: "https://distr.vercel.app",
      image: "https://placehold.co/800x500/101010/737373?text=distr&font=montserrat",
    },
    {
      name: "higgsprompt",
      description:
        "A web marketplace for AI prompt engineers. The backend is done with FastAPI, and the database is managed with Supabase",
      href: "https://higgsprompt.vercel.app",
      image: "https://placehold.co/800x500/101010/737373?text=higgsprompt&font=montserrat",
    },
    {
      name: "feynapp",
      description:
        "App for an effective learning based on Feynmann technique with an implementation of AI",
      href: "https://github.com/mugid/feynapp",
      image: "https://placehold.co/800x500/101010/737373?text=feynapp&font=montserrat",
    },
  ],
};

/** Placeholder or bundled default for project `i` (used for new projects and "reset" in admin). */
export function defaultProjectImageAtIndex(index: number): string {
  const list = defaultSiteContent.projects;
  return list[Math.min(index, list.length - 1)]!.image;
}

export const SITE_CONTENT_STORAGE_KEY = "card-site-content";

/** Same-tab refresh for `useSiteContent` when admin saves. */
export const SITE_CONTENT_UPDATE_EVENT = "card-site-content-updated";

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function mergeProject(
  raw: unknown,
  index: number,
  defaults: ProjectItem[]
): ProjectItem | null {
  if (!isRecord(raw)) return null;
  const fallback = defaults[index] ?? defaults[defaults.length - 1]!;
  const name = typeof raw.name === "string" && raw.name ? raw.name : fallback.name;
  const description =
    typeof raw.description === "string" ? raw.description : fallback.description;
  const href = typeof raw.href === "string" && raw.href ? raw.href : fallback.href;
  const image =
    typeof raw.image === "string" && raw.image.trim() ? raw.image.trim() : fallback.image;
  return { name, description, href, image };
}

export function parseSiteContentFromStorage(raw: string): SiteContent | null {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!isRecord(parsed)) return null;
    return normalizeSiteContent(parsed);
  } catch {
    return null;
  }
}

function normalizeSiteContent(partial: Record<string, unknown>): SiteContent {
  const d = defaultSiteContent;
  const aboutIn = isRecord(partial.about) ? partial.about : {};
  const about: AboutContent = {
    p1: typeof aboutIn.p1 === "string" ? aboutIn.p1 : d.about.p1,
    p1Highlight:
      typeof aboutIn.p1Highlight === "string" ? aboutIn.p1Highlight : d.about.p1Highlight,
    p2: typeof aboutIn.p2 === "string" ? aboutIn.p2 : d.about.p2,
    p3Before: typeof aboutIn.p3Before === "string" ? aboutIn.p3Before : d.about.p3Before,
    p3LinkText:
      typeof aboutIn.p3LinkText === "string" ? aboutIn.p3LinkText : d.about.p3LinkText,
    p3LinkUrl: typeof aboutIn.p3LinkUrl === "string" ? aboutIn.p3LinkUrl : d.about.p3LinkUrl,
    p3After: typeof aboutIn.p3After === "string" ? aboutIn.p3After : d.about.p3After,
  };
  const skills = Array.isArray(partial.skills)
    ? partial.skills.filter((s): s is string => typeof s === "string")
    : d.skills;
  const projects = Array.isArray(partial.projects)
    ? partial.projects
        .map((p, i) => mergeProject(p, i, d.projects))
        .filter((p): p is ProjectItem => p !== null)
    : d.projects;
  return { about, skills, projects };
}
