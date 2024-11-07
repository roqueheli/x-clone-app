import Link from "next/link";
import { TrendingUserType } from "../../types/user.types";
import UserCard, { UserCardLayout } from "../users/UserCard";

type ExploreUsersProps = {
  recommendations: TrendingUserType[];
};

const ExploreUsers = ({ recommendations }: ExploreUsersProps) => {
  if (!recommendations || recommendations.length === 0) return;

  return (
    <>
      <div
        className="bg-gray-200 rounded-lg px-8 py-4"
        style={{ minWidth: 250 }}
      >
        <h2 className="mb-2">A quien seguir</h2>
        {recommendations.slice(0, 4).map((user, index) => (
          <UserCard key={`trending-user-${index}`} user={user} layout={UserCardLayout.VERTICAL}  />
        ))}
        {recommendations.length > 4 && (
          <Link href={"/explore?type=RECOMMENDATIONS"}>
            <div className="text-center link-primary">Ver más</div>
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreUsers;
