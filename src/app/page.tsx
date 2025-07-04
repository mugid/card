import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const projects = [
    {
      name: "keyano",
      description:
        "An audio recorder for piano generated music.",
      href: "https://keyano.vercel.app",
      dates: "2025",
    },
    {
      name: "distr.",
      description:
        "Generates distribution charts and tables based on input information. Currently involves bynomial and poisson distributions.",
      href: "https://distr.vercel.app",
      dates: "2024",
    },
    {
      name: "feynapp",
      description: "App for an effective learning based on Feynmann technique with an implementation of AI",
      href: "https://github.com/mugid/feynapp",
      dates: "2023",
    }
  ];

  return (
    <main className="flex flex-col min-h-screen mx-auto max-w-2xl px-6 py-12">
      <div className="flex flex-row justify-between items-center mt-12 mb-4">
        <div className="flex flex-row items-center gap-0.5">
          <Image width={36} height={36} src="favicon.svg" alt="icon image" />
          <h1 className="font-bold">Bek Slambek</h1>
        </div>
        <div className="flex flex-row justify-between gap-3">
          <Link
            href="./resume.pdf"
            rel="noopener noreferrer"
            target="_blank"
            className="hover:underline underline-offset-2"
          >
            /resume
          </Link>{" "}
          <Link
            href="https://github.com/mugid"
            rel="noopener noreferrer"
            target="_blank"
            className="hover:underline underline-offset-2"
          >
            /github
          </Link>{" "}
          <Link
            href="https://linkedin.com/in/sbek22"
            rel="noopener noreferrer"
            target="_blank"
            className="hover:underline underline-offset-2"
          >
            /linkedin
          </Link>
        </div>
      </div>
      <div className="mb-12 flex flex-row gap-4">
        <div className="flex-1 leading-snug space-y-4 bg-[#2b2b2b] p-4 rounded-lg">
          <p>
            I&apos;m a frontend developer and designer from Almaty,
            Kazakhstan. I use{" "}
            <span className="text-[#fff3b0]">
              React, Next.js, and Tailwind CSS
            </span>{" "}
            to build clean, responsive web apps — often blending development
            with design.
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
              className="hover:underline underline-offset-2 text-[#fff3b0]"
            >
              here
            </Link>
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-end items-center gap-0.5">
        <Image width={36} height={36} src="favicon.svg" alt="icon image" />
        <h1 className="font-bold">Projects</h1>
      </div>
      <div className="mb-6 space-y-4 leading-snug">
        {projects.map((p, id) => (
          <div key={id} className="flex flex-col gap-3 bg-[#2b2b2b] p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:underline underline-offset-2"
              >
                {p.name}
              </a>
              <span className="text-sm font-mono">{p.dates}</span>
            </div>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
