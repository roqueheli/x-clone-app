import { FAQPageType } from "../../types/faq.types";
import { StrapiResultType } from "../../types/strapi.types";
import { strapipGet } from "../common/strapi.service";

class FAQsAPI {
    getFAQPages = async (): Promise<StrapiResultType<FAQPageType>> => strapipGet(`/faq-pages` );
}

const faqsApi = new FAQsAPI();
export default faqsApi;
