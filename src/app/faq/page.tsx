"use client";
import FAQSection from "../../components/faq/FAQSection";
import faqsApi from "../../service/faqs/faqs.service";

export default async function FAQPage() {
  const faqPages = await faqsApi.getFAQPages();

  return (
    <main>
      <FAQSection sections={faqPages.data} />
    </main>
  );
}
