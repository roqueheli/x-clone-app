"use client";
import FAQSection from "../../../components/faq/FAQSection";
import faqsApi from "../../../service/faqs/faqs.service";

export default async function FAQPage({ params }: { params: { slug: string } }) {
  const faqPages = await faqsApi.getFAQPages();
  const faqPage = faqPages.data.find((page) => page.slug === `/${params.slug}`);

  return (
    <main>
      <FAQSection sections={faqPages.data} />
      <section className="flex flex-col">
        <h2>{faqPage?.title}</h2>
      </section>
    </main>
  );
}
