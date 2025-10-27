import Image from "next/image";
import { motion } from "framer-motion";

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
    "framer",
    "ui/ux",
  ];

  return (
    <div className="mt-12">
      <div className="flex flex-row justify-start items-center gap-2 mb-4">
        <Image width={24} height={24} src="icon.svg" alt="icon image" />
        <h1 className="font-semibold text-xl">Skills</h1>
      </div>
      <div className="flex flex-wrap gap-2 columns-2xl">
        {skills.map((skill, id) => (
          <motion.div
            key={id}
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ delay: id * 0.07, duration: 0.4}}
            className="font-mono text-sm bg-foreground hover:bg-primary transition-all text-background py-1 px-2 w-max rounded-md cursor-pointer"
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
