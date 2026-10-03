import Image from "next/image";
import Link from "next/link";

const pages = [
  { updated: "oct 4", name: "things i write about", href: "/blog" },
  { updated: "oct 6", name: "words i like", href: "/words" },
];

const socials = [
  { name: "x", href: "https://x.com/bekslambek" },
  { name: "github", href: "https://github.com/mugid" },
  { name: "linkedin", href: "https://linkedin.com/in/sbek22" },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-[clamp(24px,5.4vw,64px)] pb-20 pt-[120px] text-base tracking-[-0.02em]">
      <Image
        src="/logo.svg"
        alt="Bek Slambek"
        width={62}
        height={48}
        priority
        className="h-12 w-auto"
      />

      <section aria-label="About" className="mt-12 max-w-[720px] leading-[1.2]">
        <h1 className="font-normal">hi, i&apos;m Bek</h1>
        <p className="mt-9">
          a design engineer. currently, building Hireke to make some cash.
          <br />
          i’m also studying computer science at Nazarbayev University.
        </p>
      </section>

      <section aria-labelledby="pages-heading" className="mt-16">
        <h2
          id="pages-heading"
          className="text-sm leading-[1.2] tracking-normal text-[#909090]"
        >
          last
          <br />
          updated
        </h2>
        <ul className="mt-8 space-y-2">
          {pages.map((page) => (
            <li
              key={page.name}
              className="grid grid-cols-[max-content_1fr] items-baseline gap-x-12"
            >
              <span className="text-sm tracking-normal text-[#909090]">
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
