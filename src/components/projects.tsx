import Image from "next/image";

export default function Projects() {
  const projects = [
    {
      name: "keyano",
      description: "An audio recorder for piano generated music.",
      href: "https://keyano.vercel.app",
    },
    {
      name: "distr.",
      description:
        "Generates distribution charts and tables based on input information. Currently involves bynomial and poisson distributions.",
      href: "https://distr.vercel.app",
    },
    {
      name: "higgsprompt",
      description:
        "A web marketplace for AI prompt engineers. The backend is done with FastAPI, and the database is managed with Supabase",
      href: "https://higgsprompt.vercel.app",
    },
    {
      name: "feynapp",
      description:
        "App for an effective learning based on Feynmann technique with an implementation of AI",
      href: "https://github.com/mugid/feynapp",
    },
  ];

  return (
    <div className="mt-12">
      <div className="flex flex-row justify-start items-center gap-2 mb-4">
        <Image width={24} height={24} src="icon.svg" alt="icon image" />
        <h1 className="font-semibold text-xl">Projects</h1>
      </div>
      <div className="leading-snug md:columns-2">
        {projects.map((p, id) => (
          <a key={id} href={p.href} target="_blank" rel="noreferrer">
            <div className="group relative flex flex-col justify-end gap-2 h-min bg-[#181818] p-4 pt-25 mb-4 rounded-lg overflow-hidden">
              <h1 className="font-semibold">{p.name}</h1>
              <p className="text-foreground/60">{p.description}</p>

              <div className="absolute top-[100%] h-full w-full bg-[#181818]/80 rounded-lg group-hover:top-0 transition-all duration-500 flex items-center justify-center">
                <span className="text-primary italic">view more...</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
