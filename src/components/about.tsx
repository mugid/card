"use client";

import Link from "next/link";

import { useSiteContent } from "@/hooks/use-site-content";

function ParagraphOne({ text, highlight }: { text: string; highlight: string }) {
  if (!highlight.trim() || !text.includes(highlight)) {
    return <p>{text}</p>;
  }
  const [before, afterRest] = text.split(highlight, 2) as [string, string | undefined];
  if (afterRest === undefined) {
    return <p>{text}</p>;
  }
  return (
    <p>
      {before}
      <span className="text-primary font-semibold">{highlight}</span>
      {afterRest}
    </p>
  );
}

export default function About() {
  const { about } = useSiteContent();
  return (
    <div className="mt-12 flex flex-row gap-4">
      <div className="flex-1 leading-snug space-y-4 text-foreground/60 rounded-lg">
        <ParagraphOne text={about.p1} highlight={about.p1Highlight} />
        <p>{about.p2}</p>
        <p>
          {about.p3Before}
          {about.p3LinkUrl && about.p3LinkText ? (
            <Link
              href={about.p3LinkUrl}
              rel="noopener noreferrer"
              target="_blank"
              className="hover:border-b-1 transition-all text-primary font-semibold"
            >
              {about.p3LinkText}
            </Link>
          ) : null}
          {about.p3After}
        </p>
      </div>
    </div>
  );
}
