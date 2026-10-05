import Image from "next/image";
import Link from "next/link";

const pages = [
  { updated: "oct 6", name: "words i like", href: "/words" },
  { updated: "oct 4", name: "things i write about", href: "/blog" },
];

const socials = [
  { name: "x", href: "https://x.com/bekslambek" },
  { name: "github", href: "https://github.com/mugid" },
  { name: "linkedin", href: "https://linkedin.com/in/sbek22" },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 pt-30 pb-20 text-sm tracking-tight sm:text-base md:px-10 xl:px-16">
      <Image
        src="/logo.svg"
        alt="Bek Slambek"
        width={62}
        height={48}
        priority
        className="h-12 w-auto"
      />

      <section aria-label="About" className="mt-12 w-full leading-tight sm:max-w-120">
        <h1 className="font-normal">hi, i&apos;m Bek</h1>
        <p className="mt-9">
          a design engineer. currently, building Hireke to make some cash.
          i’m also studying computer science at Nazarbayev University.
        </p>
      </section>

      <section aria-labelledby="pages-heading" className="mt-16">
        <h2
          id="pages-heading"
          className="text-sm leading-tight tracking-normal text-neutral-400"
        >
          last
          <br />
          updated
        </h2>
        <ul className="page-timeline mt-8 space-y-2">
          {pages.map((page) => (
            <li
              key={page.name}
              className="flex items-baseline gap-12"
            >
              <span className="shrink-0 text-sm tracking-normal text-neutral-400">
                {page.updated}
              </span>
              <Link
                href={page.href}
                data-cuelume-navigate
                className="hover:underline hover:underline-offset-4"
              >
                {page.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <nav aria-label="Social links" className="mt-16 flex flex-wrap gap-x-1">
        {socials.map((social, index) => (
          <span key={social.name}>
            {index > 0 && <span aria-hidden="true">/ </span>}
            <a
              href={social.href}
              data-cuelume-tap
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:underline-offset-4"
            >
              {social.name}
            </a>
          </span>
        ))}
      </nav>
    </main>
  );
}
