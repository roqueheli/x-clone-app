"use client";
import Link from "next/link";
import React, { FC, PropsWithChildren } from "react";
import Menu from "../../components/menu/Menu";
import ExploreTrending from "../../components/explore/ExploreTrending";
import exploreApi from "../../service/explore/explore.service";
import ExploreUsers from "../../components/explore/ExploreUsers";

const LINKS = [
  { title: "Inicio", href: "/" },
  { title: "Explorar", href: "/explore" },
  { title: "Perfil", href: "/profile" },
];

const UsersLayout: FC<PropsWithChildren> = async ({ children }) => {
  const hashesPromise = exploreApi.getTrendingHashtags(0, 3);
  const recommendationsPromise = exploreApi.getFollowRecommendations(0, 5);

  const [hashes, recommendations] = await Promise.all([
    hashesPromise,
    recommendationsPromise,
  ]);

  return (
    <>
      <div className="w-full h-full grid grid-cols-12 gap-4 px-4">
        <div className="col-span-3">
          <Menu links={LINKS} />
        </div>
        <main className="col-span-6">{children}</main>
        <div className="col-span-3">
          <div className="mb-4">
            <ExploreTrending hashes={hashes.content} />
          </div>
          <div className="mb-4"></div><div>
            <ExploreUsers recommendations={recommendations.content} />
          </div>
          <Link href={"/faq"}>
            <div className="link-primary">Preguntas frecuentes</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UsersLayout;
