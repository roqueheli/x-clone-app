import Message from "../../../components/messages/Message";
import React from "react";
import exploreApi from "../../../service/explore/explore.service";
import ExploreTabs from "../../../components/explore/ExploreTabs";

const ExplorePage = async () => {
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
            hashtags={hashes.content}
            recommendatios={recommendations.content}
          />
        </section>
      </main>
    </>
  );
};

export default ExplorePage;
