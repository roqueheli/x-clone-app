import Link from "next/link";
import { HashtagType } from "../../types/hash.types";
import MessageHashtag from "../messages/MessageHashtag";

type ExploreTrendingProps = {
  hashes: HashtagType[];
};

const ExploreTrending = ({ hashes }: ExploreTrendingProps) => {
  if (!hashes || hashes.length === 0) return;

  return (
    <>
      <div
        className="bg-gray-200 rounded-lg px-8 py-4"
        style={{ minWidth: 250 }}
      >
        <h2 className="mb-2">Trending</h2>
        {hashes.slice(0, 2).map((hash, index) => (
          <div key={`trending-hash-${index}`} className="mb-4">
            <MessageHashtag hash={hash} />
          </div>
        ))}
        {hashes.length > 2 && (
          <Link href={"/explore?type=HASHTAGS"}>
            <div className="text-center link-primary">Ver más</div>
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreTrending;
