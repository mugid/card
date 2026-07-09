"use client";
import { motion } from "motion/react";

import Profile from "@/components/profile";
import About from "@/components/about";
import Projects from "@/components/projects";

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen mx-auto max-w-xl px-6 sm:px-10"
    >
      <Profile />
      <About />
      {/* <Skills /> */}
      <Projects />
    </motion.main>
  );
}
