import { RoleScramble } from "./role-scramble";

export default function Profile() {
  return (
    <div className="mt-12 pt-12">
      <div className="flex flex-col items-start justify-center gap-1">
        <h1 className="font-bold md:text-4xl text-xl text-primary">
          Bek Slambek
        </h1>
        <RoleScramble className="text-md font-semibold italic text-foreground/50" />
      </div>
    </div>
  );
}
