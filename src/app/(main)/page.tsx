"use client";
import messageApi from "../../service/messages/messages.services";
import IndexPageContainer from "./page.container";

const IndexPage = async ({ searchParams }: { searchParams?: {[key: string]: string | undefined} }) => {
  const messageResponse = searchParams?.query ? await messageApi.getMessagesByHash(searchParams?.query, 0, 10) : await messageApi.getMessagesFeed(0, 10);

  return (
      <main className="flex flex-col bg-gray-100 p-8">
        <section className="flex flex-col mb-8">
          <IndexPageContainer initialQuery={searchParams?.query} messageResponse={messageResponse} />
        </section>
      </main>
  );
};

export default IndexPage;
