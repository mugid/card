import Image from "next/image";
import { ArrowUpRightRect } from "@/components/arrow-up-right-rect";

const projects = [
  {
    name: "hireke",
    description: "Changing hiring workflows with a product-focused team.",
    href: "https://hireke.com",
  },
  {
    name: "tigerznuet",
    description: "A platform for students to prepare to NUET exams",
    href: "https://tigerznuet.vercel.app",
  },
  {
    name: "azul",
    description: "Visual brand name generation tool.",
    href: "https://azul-rho.vercel.app",
  },
  // {
  //   name: "bloq",
  //   description: "Bento portfolio constructor.",
  // },
  // {
  //   name: "uso",
  //   description: "Labyrinth game inspired by Usogui manga.",
  // },
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
          <ProjectRow key={p.name} project={p} />
        ))}
      </div>
    </div>
  );
}

function ProjectRow({ project }: { project: (typeof projects)[number] }) {
  const content = (
    <>
      <h2 className="font-semibold">{project.name}</h2>
      <p className="font-content tracking-[-0.03em] text-foreground/60 transition-colors group-hover:text-primary/70">
        {project.description}
      </p>
      {"href" in project && project.href ? (
        <ArrowUpRightRect className="hidden size-[1em] text-foreground/40 transition-colors group-hover:text-primary sm:block" />
      ) : (
        <span aria-hidden className="hidden size-[1em] sm:block" />
      )}
    </>
  );

  if ("href" in project && project.href) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="group grid gap-2 py-4 transition-colors hover:text-primary sm:grid-cols-[160px_1fr_auto] sm:items-baseline sm:gap-6"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="group grid gap-2 py-4 sm:grid-cols-[160px_1fr_auto] sm:items-baseline sm:gap-6">
      {content}
    </div>
  );
}
