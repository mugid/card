"use client";
import { motion } from "motion/react";

import Profile from "@/components/profile";
import About from "@/components/about";
import Skills from "@/components/skills";
import Projects from "@/components/projects";

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen mx-auto max-w-2xl px-10"
    >
      <Profile />
      <About />
      <Skills />
      <Projects />
      <div className="my-12">
        <p className="text-center">
          contact me via telegram:{" "}
          <a
            href="https://t.me/wanderbeck"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary hover:font-semibold transition-all"
          >
            @wanderbeck
          </a>
        </p>
      </div>
    </motion.main>
  );
}
