import Image from "next/image";

const projects = [

  {
    name: "tigerznuet",
    description:
      "A platform for students to prepare to NUET exams",
    href: "https://tigerznuet.com",
    image: "/tigerznuet-demo.png",
  },
  {
    name: "stormy",
    description:
      "Brand design AI brainstorming tool",
    href: "https://stormy-pi.vercel.app/",
    image: "/stormy-demo.png",
  },
  {
    name: "distr.",
    description:
      "Generates distribution charts and tables based on input information.",
    href: "https://distr.vercel.app",
    image: "/distr-demo.png",
  },
  {
    name: "feynapp",
    description:
      "App for an effective learning based on Feynmann technique with an implementation of AI",
    href: "https://feynapp-one.vercel.app/",
    image: "/feynapp-demo.png",
  },
  {
    name: "higgsprompt",
    description:
      "A web marketplace for AI prompt engineers. The backend is done with FastAPI, and the database is managed with Supabase",
    href: "https://higgsprompt.vercel.app",
    image: "/higgsprompt-demo.png",
  },
];

export default function Projects() {
  return (
    <div className="mt-12">
      <div className="flex flex-row justify-start items-center gap-2 mb-4">
        <Image width={24} height={24} src="icon.svg" alt="icon image" />
        <h1 className="font-semibold text-xl">Projects</h1>
      </div>
      <div className="leading-snug md:columns-2">
        {projects.map((p) => {
          const remote = /^https?:\/\//.test(p.image);
          const unoptimized = remote || p.image.startsWith("data:");
          return (
            <a
              key={`${p.name}-${p.href}-${p.image}`}
              href={p.href}
              target="_blank"
              rel="noreferrer"
            >
              <div className="group relative flex flex-col h-min bg-[#101010] mb-4 border border-foreground/10 overflow-hidden break-inside-avoid">
                <div className="relative aspect-[16/10] w-full bg-foreground/5">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    unoptimized={unoptimized}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col gap-2 p-4">
                  <h1 className="font-semibold">{p.name}</h1>
                  <p className="text-foreground/60">{p.description}</p>
                </div>

                <div className="absolute top-[100%] left-0 h-full w-full bg-[#101010]/80 group-hover:top-0 transition-all duration-800 flex items-center justify-center pointer-events-none">
                  <span className="text-primary">view more...</span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
