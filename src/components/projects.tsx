import Image from "next/image";
import { ArrowUpRightRect } from "@/components/arrow-up-right-rect";

const projects = [
  {
    name: "tigerznuet",
    description: "A platform for students to prepare to NUET exams",
    href: "https://tigerznuet.com",
  },
  {
    name: "stormy",
    description: "Brand design AI brainstorming tool",
    href: "https://stormy-pi.vercel.app/",
  },
  {
    name: "distr.",
    description:
      "Generates distribution charts and tables based on input information.",
    href: "https://distr.vercel.app",
  },
  {
    name: "feynapp",
    description:
      "App for an effective learning based on Feynmann technique with an implementation of AI",
    href: "https://feynapp-one.vercel.app/",
  },
  {
    name: "higgsprompt",
    description:
      "A web marketplace for AI prompt engineers. The backend is done with FastAPI, and the database is managed with Supabase",
    href: "https://higgsprompt.vercel.app",
  },
];

export default function Projects() {
  return (
    <div className="mt-12">
      <div className="flex flex-row justify-start items-center gap-2 mb-4">
        <Image width={24} height={24} src="icon.svg" alt="icon image" />
        <h1 className="font-semibold text-xl">I work on.</h1>
      </div>
      <div className="flex flex-col gap-1 leading-snug">
        {projects.map((p) => (
          <a
            key={`${p.name}-${p.href}`}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="group grid gap-2 py-4 transition-colors hover:text-primary sm:grid-cols-[160px_1fr_auto] sm:items-baseline sm:gap-6"
          >
            <h2 className="font-semibold">{p.name}</h2>
            <p className="font-content tracking-[-0.03em] text-foreground/60 transition-colors group-hover:text-primary/70">
              {p.description}
            </p>
            <ArrowUpRightRect className="hidden size-[1em] text-foreground/40 transition-colors group-hover:text-primary sm:block" />
          </a>
        ))}
      </div>
    </div>
  );
}
