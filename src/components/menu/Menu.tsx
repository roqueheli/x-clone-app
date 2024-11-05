import Link from "next/link";
import React from "react";
import { LinkType } from "../../types/link.types";

type MenuProps = {
  links: LinkType[];
};

const Menu = ({ links }: MenuProps) => {
  return (
    <nav className="flex flex-col w-full">
      <ul className="mb-4 w-full">
        {links &&
          links.map((link, index) =>
              <li key={`link-menu-${index}`} className="text-2xl w-full hover:bg-blue-400 hover:text-white">
                <Link className="w-full flex p-2 " href={link.href}>
                  {link.title}
                </Link>
              </li>
          )}
      </ul>
      <button className="button-primary uppercase font-semibold">Postear</button>
    </nav>
  );
};

export default Menu;
