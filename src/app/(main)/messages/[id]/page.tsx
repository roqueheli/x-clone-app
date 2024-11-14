import { headers } from "next/headers";
import messageApi from "../../../../service/messages/messages.services";
import MessagePageContainer from "./page.container";
import userApi from "../../../../service/users/users.service";

const Messages = async ({ params }: { params: { id: string } }) => {
  const accessToken = await headers().get("x-social-access-token") ?? null;
  const currentUser = accessToken ? await userApi.getMeInternal(accessToken) : undefined;

  const repliesPagePromise = messageApi.getMessagesReplies(params.id, 0, 10);
  const origMessagePromise = messageApi.getMessagesById(params.id);

  const [repliesPage, origMessage] = await Promise.all([repliesPagePromise, origMessagePromise]);

  return <div className="flex flex-col bg-gray-100 p-8">
    <MessagePageContainer repliesPage={repliesPage} origMessage={origMessage} parentId={params.id} currentUser={currentUser} />
  </div>;
};

export default Messages;
