"use client";
import MessageFeed from "../../components/messages/MessageFeed";
import MessagePostForm from "../../components/messages/MessagePostForm";
import SearchBar from "../../components/search/SearchBar";
import messageApi from "../../service/messages/messages.services";

const IndexPage = async () => {
  const messageResponse = await messageApi.getMessagesFeed(0, 10);

  return (
    <>
      <main className="flex flex-col bg-gray-100 p-8">
        <section className="flex flex-col mb-8">
          <SearchBar query="#fuerza" />
          <MessagePostForm />
          <MessageFeed initMessages={messageResponse} />
        </section>
      </main>
    </>
  );
};

export default IndexPage;
