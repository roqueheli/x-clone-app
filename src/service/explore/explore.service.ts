import { HashtagType } from "../../types/hash.types";
import { PageType } from "../../types/pagination.types";
import { TrendingUserType } from "../../types/user.types";
import { httpGetPublic } from "../common/http.service";

class ExploreAPI {
    getTrendingHashtags = async (page: number, size: number): Promise<PageType<HashtagType>> => httpGetPublic(`/explore/trending`, new URLSearchParams({ page: `${page}`, size: `${size}` }));
    getFollowRecommendations = async (page: number, size: number): Promise<PageType<TrendingUserType>> => httpGetPublic(`/explore/follow-recommendations`, new URLSearchParams({ page: `${page}`, size: `${size}` }));
}

const exploreApi = new ExploreAPI();
export default exploreApi;
