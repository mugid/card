import { ArrowUpRightRect } from "@/components/arrow-up-right-rect";
import Link from "next/link";

const navLinks = [
  { href: "./resume.pdf", label: "resume" },
  { href: "https://github.com/mugid", label: "github" },
  { href: "https://linkedin.com/in/sbek22", label: "linkedin" },
] as const;

export default function About() {
  return (
    <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-stretch sm:justify-between sm:gap-10">
      <div className="md:max-w-[60%] text-justify flex-1 text-md leading-snug space-y-4 text-foreground/60 rounded-lg">
        <p>
          I&apos;m a frontend developer and designer. Currently, a cs student at Nazarbayev
          University. Being in love-hate relationship with{" "}
          <span className="text-primary font-semibold">React and Next.js</span>, I build
          clean, responsive web apps.
        </p>
        <p>
          If you want to explore the design I do, check it out{" "}
          <Link
            href="https://contra.com/bek_slambek_exnck1xg"
            rel="noopener noreferrer"
            target="_blank"
            className="hover:border-b-1 transition-all text-primary font-semibold"
          >
            here
          </Link>
        </p>
      </div>
      <nav
        className="flex shrink-0 md:flex-col justify-between items-end"
        aria-label="Social and resume links"
      >
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            rel="noopener noreferrer"
            target="_blank"
            className="flex flex-row items-center gap-1 font-mono text-sm uppercase tracking-wide text-foreground/80 transition-all hover:text-primary hover:font-semibold sm:min-h-0"
          >
            <ArrowUpRightRect className="size-[1em] shrink-0" />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
