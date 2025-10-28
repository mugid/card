import Link from "next/link";

export default function About() {
  return (
    <div className="mt-12 flex flex-row gap-4">
      <div className="flex-1 leading-snug space-y-4 text-foreground/60 rounded-lg">
        <p>
          I&apos;m a frontend developer and designer. Currently, a cs student at Nazarbayev University. Being in love-hate relationship with{" "}
          <span className="text-primary font-semibold">
            React and Next.js,
          </span>{" "}
          I build clean, responsive web apps — often blending development with
          design.
        </p>
        <p>
          I&apos;m passionate about learning fast, building things that people
          actually use, and creating experiences that feel intuitive and
          thoughtful.
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
    </div>
  );
}
