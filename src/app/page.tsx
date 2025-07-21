import Profile from "@/components/profile";
import About from "@/components/about";
import Projects from "@/components/projects"

export default function Home() {

  return (
    <main className="min-h-screen mx-auto max-w-2xl px-10">
      <Profile />
      <About />
      <Projects />
    </main>
  );
}
