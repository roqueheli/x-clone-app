"use client";
import { useEffect, useState } from "react";
import { HashtagType } from "../../types/hash.types";
import UserCard, { UserCardLayout } from "../users/UserCard";
import { TrendingUserType } from "../../types/user.types";
import MessageHashtag from "../messages/MessageHashtag";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

enum TabView {
  HASHTAGS,
  RECOMMENDATIONS,
}

type ExploreTabsProps = {
  hashtags: HashtagType[];
  recommendatios: TrendingUserType[];
  initialTab?: string;
};

const ExploreTabs = ({ hashtags, recommendatios, initialTab }: ExploreTabsProps) => {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<TabView>(initialTab ? TabView[initialTab as keyof typeof TabView] : TabView.HASHTAGS);

  useEffect(() => {
    const type = searchParams.get('type');
    setTab(type ? TabView[type as keyof typeof TabView] : tab)
  }, [searchParams, tab]);

  return (
    <>
      <div className="flex justify-evenly mb-4">
        <Link href={`/explore?type=HASHTAGS`}>
          <div className={`cursor-pointer border-b-4 ${tab === TabView.HASHTAGS ? "border-blue-400" : ""}`}>Hashtags</div>
        </Link>
        <Link href={`/explore?type=RECOMMENDATIONS`}>
          <div className={`cursor-pointer border-b-4 ${tab === TabView.RECOMMENDATIONS ? "border-blue-400" : ""}`}>Recomendados</div>
        </Link>
      </div>
      <div>
        {tab === TabView.HASHTAGS
          ? hashtags.map((hashtag, index) => {
              return (
                <MessageHashtag key={`explore-hash-${index}`} hash={hashtag} />
              );
            })
          : recommendatios.map((user, index) => {
              return (
                <UserCard key={`explore-user-${index}`} user={user} layout={UserCardLayout.VERTICAL} />
              );
            })}
      </div>
    </>
  );
};

export default ExploreTabs;
