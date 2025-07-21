import Image from 'next/image';

export default function Projects() {
  const projects = [
    {
      name: "keyano",
      description: "An audio recorder for piano generated music.",
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
      description:
        "App for an effective learning based on Feynmann technique with an implementation of AI",
      href: "https://github.com/mugid/feynapp",
      dates: "2023",
    },
  ];

  return (
    <div className='mt-12'>
      <div className="flex flex-row justify-start items-center gap-1 mb-4">
        <Image width={24} height={24} src="icon.svg" alt="icon image" />
        <h1 className="font-semibold text-xl">Projects</h1>
      </div>
      <div className="mb-6 space-y-4 leading-snug">
        {projects.map((p, id) => (
          <div
            key={id}
            className="flex flex-col gap-3 bg-[#2b2b2b] p-4 rounded-lg"
          >
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
    </div>
  );
}
