import Link from "next/link";

export default function About() {
  return (
    <div className="mt-12 flex flex-row gap-4">
      <div className="flex-1 leading-snug space-y-4 text-foreground/60 rounded-lg">
        <p>
          I&apos;m a frontend developer and designer from Almaty, Kazakhstan. I
          use{" "}
          <span className="text-primary font-semibold">
            React, Next.js, and Tailwind CSS
          </span>{" "}
          to build clean, responsive web apps — often blending development with
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
            href="https://comingsoon.com"
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
