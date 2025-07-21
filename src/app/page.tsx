import Image from "next/image";
import Profile from "@/components/profile";
import About from "@/components/about";

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
    <main className="min-h-screen mx-auto max-w-2xl">
      <Profile />
      <About />
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
