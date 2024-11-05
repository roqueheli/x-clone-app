import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href={"/users"}>Ver usuarios</Link>
    </main>
  );
}
