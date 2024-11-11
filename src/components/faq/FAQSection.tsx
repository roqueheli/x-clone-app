import React from "react";
import FAQCard from "./FAQCard";
import { FAQPageType } from "../../types/faq.types";

type FAQSectionProps = {
  sections: FAQPageType[];
};

const FAQSection = ({ sections }: FAQSectionProps) => {
  return (
    <section>
      <h1>Preguntas Frecuentes</h1>
      <div className="grid grid-cols-12 gap-4 mb-8">
        {sections.map((section, index) => {
            return (
                <FAQCard key={`${section.slug}-${index}`} label={section.title} href={`${section.slug}`} />
            );
        })}
      </div>
    </section>
  );
};

export default FAQSection;
