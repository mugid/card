import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-6 pt-20 sm:px-10">
      <h1 className="text-2xl font-bold">404</h1>
      <p className="mt-4">Page not found.</p>
      <Link href="/" className="mt-6 inline-block underline underline-offset-4">
        Back to home
      </Link>
    </main>
  );
}
