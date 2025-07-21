import Image from "next/image";

export default function Skills() {
  const skills: string[] = [
    "react",
    "next.js",
    "tailwindcss",
    "shadcn/ui",
    "drizzle",
    "prisma",
    "postgresql",
    "supabase",
    "vercel",
    "motion",
    "zustand",
    "javascript",
    "typescript",
    "node.js",
    "html",
    "css",
    "git",
    "github",
    "python",
    "figma",
    "illustrator",
  ];

  return (
    <div className="mt-12">
      <div className="flex flex-row justify-start items-center gap-2 mb-4">
        <Image width={24} height={24} src="icon.svg" alt="icon image" />
        <h1 className="font-semibold text-xl">Skills</h1>
      </div>
      <div className="flex flex-wrap gap-2 columns-2xl">
        {skills.map((skill, id) => (
          <div
            key={id}
            className="font-mono bg-foreground/60 hover:bg-primary/80 transition-all text-background py-1 px-2 w-max rounded-md cursor-pointer"
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
}
