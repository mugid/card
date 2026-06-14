import Link from "next/link";

const navLinks = [
  { href: "./resume.pdf", label: "resume" },
  { href: "https://github.com/mugid", label: "github" },
  { href: "https://linkedin.com/in/sbek22", label: "linkedin" },
  { href: "https://contra.com/bek_slambek_exnck1xg", label: "design work" },
] as const;

function SocialBadge({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      className="group mx-0.5 inline-flex h-[1.55em] -translate-y-px overflow-hidden border border-foreground/15 bg-foreground/[0.03] px-2 font-sans text-[0.86em] normal-case tracking-normal text-foreground/80 transition-colors duration-200 hover:border-primary/70 hover:bg-primary hover:text-background"
    >
      <span className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-[1.55em]">
        {[0, 1].map((item) => (
          <span key={item} className="flex h-[1.55em] items-center">
            {label}
          </span>
        ))}
      </span>
    </Link>
  );
}

export default function About() {
  return (
    <div className="mt-12">
      <div className="font-content tracking-[-0.03em] text-justify text-md leading-snug space-y-4 text-foreground/60 rounded-lg">
        <p>
          I&apos;m Bek, a frontend developer and designer studying computer
          science at Nazarbayev University. I build clean, responsive web apps
          with a love-hate relationship for{" "}
          <span className="text-primary font-semibold">React and Next.js</span>.
        </p>
        <p>
          You can skim my{" "}
          {navLinks.map(({ href, label }, index) => (
            <span key={href} className="inline-block">
              <SocialBadge href={href} label={label} />
              {index < navLinks.length - 1 ? " " : ""}
            </span>
          ))}
          , where I keep the practical proof: shipped projects, source code,
          work history, and a few design experiments.
        </p>
      </div>
    </div>
  );
}
