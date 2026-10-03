import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Words I Like",
  description: "A collection of words by Bek Slambek.",
  alternates: { canonical: "/words" },
  openGraph: {
    title: "Words I Like | Bek Slambek",
    description: "A collection of words by Bek Slambek.",
    url: "/words",
    images: ["/opengraph-image"],
  },
};

export default function WordsPage() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-[clamp(24px,5.4vw,64px)] pb-20 pt-[120px] text-base tracking-[-0.02em]">
      <Link href="/" aria-label="Back to home" className="inline-block">
        <Image src="/logo.svg" alt="" width={62} height={48} priority />
      </Link>

      <section className="mt-12 leading-[1.2]">
        <h1>words i like</h1>
        <p className="mt-9 text-[#909090]">no words added yet.</p>
      </section>

      <Link href="/" className="mt-16 inline-block hover:underline hover:underline-offset-4">
        back home
      </Link>
    </main>
  );
}
