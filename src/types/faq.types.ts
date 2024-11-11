export type FAQPageType = {
    id: number;
    documentId: string;
    title: string;
    body: BodyElementType[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    slug: string;
};

type BodyElementType = {
    type: string;
    children: TextElementType[];
};

type TextElementType = {
    type: string;
    text: string;
};