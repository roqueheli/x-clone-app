import { headers } from "next/headers";
import UserPageContainer from "../../../components/users/UserPageContainer";
import userApi from "../../../service/users/users.service";

const ProfilePage = async () => {
  const accessToken = await headers().get("x-social-access-token") ?? '';
  const me = await userApi.getMeInternal(accessToken);
  
  return <UserPageContainer username={me.username} />;
};

export default ProfilePage;
