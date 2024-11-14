import UserPageContainer from "../../../../components/users/UserPageContainer";

const UserPage = ({ params }: { params: { username: string } }) => {
  return (
      <UserPageContainer username={params.username} />
  );
};

export default UserPage;
