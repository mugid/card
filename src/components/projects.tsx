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
      <div className="mb-4">
        <h1 className="font-semibold text-base text-primary">I&apos;m proud of.</h1>
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
    </>
  );

  if ("href" in project && project.href) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="group block pb-4 transition-colors hover:text-primary"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="group pb-4">
      {content}
    </div>
  );
}
