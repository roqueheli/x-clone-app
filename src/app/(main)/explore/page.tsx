import ExploreTabs from "../../../components/explore/ExploreTabs";
import exploreApi from "../../../service/explore/explore.service";

const ExplorePage = async ({ searchParams }: { searchParams?: {[key: string]: string | undefined} }) => {
  const hashesPromise = exploreApi.getTrendingHashtags(0, 20);
  const recommendationsPromise = exploreApi.getFollowRecommendations(0, 20);

  const [hashes, recommendations] = await Promise.all([
    hashesPromise,
    recommendationsPromise,
  ]);

  return (
    <>
      <main className="flex flex-col bg-gray-100 p-8">
        <section className="flex flex-col mb-8">
          <ExploreTabs
            hashtags={hashes}
            recommendations={recommendations}
            initialTab={searchParams?.type}
          />
        </section>
      </main>
    </>
  );
};

export default ExplorePage;
