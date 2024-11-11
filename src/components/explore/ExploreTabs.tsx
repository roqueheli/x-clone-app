"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HashtagType } from "../../types/hash.types";
import { PageType } from "../../types/pagination.types";
import { TrendingUserType } from "../../types/user.types";
import MessageHashtagList from "../messages/MessageHashtagList";
import UserList from "../users/UserList";

enum TabView {
  HASHTAGS,
  RECOMMENDATIONS,
}

type ExploreTabsProps = {
  hashtags: PageType<HashtagType>;
  recommendations: PageType<TrendingUserType>;
  initialTab?: string;
};

const ExploreTabs = ({
  hashtags,
  recommendations,
  initialTab,
}: ExploreTabsProps) => {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<TabView>(
    initialTab ? TabView[initialTab as keyof typeof TabView] : TabView.HASHTAGS
  );

  useEffect(() => {
    const type = searchParams.get("type");
    setTab(type ? TabView[type as keyof typeof TabView] : tab);
  }, [searchParams, tab]);

  return (
    <>
      <div className="flex justify-evenly mb-4">
        <Link href={`/explore?type=HASHTAGS`}>
          <div
            className={`cursor-pointer border-b-4 ${
              tab === TabView.HASHTAGS ? "border-blue-400" : ""
            }`}
          >
            Hashtags
          </div>
        </Link>
        <Link href={`/explore?type=RECOMMENDATIONS`}>
          <div
            className={`cursor-pointer border-b-4 ${
              tab === TabView.RECOMMENDATIONS ? "border-blue-400" : ""
            }`}
          >
            Recomendados
          </div>
        </Link>
      </div>
      <div>
        {tab === TabView.HASHTAGS ? (
          <MessageHashtagList initHashtagsPage={hashtags} />
        ) : (
          <UserList initUsersPage={recommendations} />
        )}
      </div>
    </>
  );
};

export default ExploreTabs;
