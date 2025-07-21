import Link from "next/link";

export default function Profile() {
  return (
    <div className="flex flex-row justify-between items-center mt-12 pt-12">
      <div className="flex flex-col items-start justify-center gap-1">
        <h1 className="font-bold text-4xl text-primary">Bek Slambek</h1>
        <p className="text-md font-semibold italic text-foreground/50">design & build</p>
      </div>
      <div className="flex flex-row justify-between gap-3">
        <Link
          href="./resume.pdf"
          rel="noopener noreferrer"
          target="_blank"
          className="hover:text-primary hover:font-semibold transition-all"
        >
          /resume
        </Link>{" "}
        <Link
          href="https://github.com/mugid"
          rel="noopener noreferrer"
          target="_blank"
          className="hover:text-primary hover:font-semibold transition-all"
        >
          /github
        </Link>{" "}
        <Link
          href="https://linkedin.com/in/sbek22"
          rel="noopener noreferrer"
          target="_blank"
          className="hover:text-primary hover:font-semibold transition-all"
        >
          /linkedin
        </Link>
      </div>
    </div>
  );
}
