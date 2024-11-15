"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StarWarsLogo from "../../../public/star_wars_logo.png";
import authAPI from "../../service/auth/auth.api";

type NavbarProps = {
  loggedUsername?: string;
  photoUrl?: string;
};

const Navbar = ({ loggedUsername, photoUrl }: NavbarProps) => {
  const router = useRouter();
  const logout = async () => {
    await authAPI.logout();
    router.push("/login");
    router.refresh();
  };  

  return (
    <header className="w-full">
      <nav className="flex justify-between w-full bg-blue-500 text-white p-2 mb-2">
        <Link href={"/"}>
          <Image
            priority
            width={80}
            height={80}
            className="cursor-pointer"
            src={StarWarsLogo}
            alt={""}
          />
        </Link>
        {loggedUsername && photoUrl &&(
          <div className="flex items-center justify-center">
            <Link href={`/users/${loggedUsername}`}>
              <Image
                priority
                width={40}
                height={40}
                className="cursor-pointer rounded-full"
                src={photoUrl}
                alt={""}
              />
            </Link>
            <button className="ml-3 button-secondary" onClick={() => logout()}>
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
