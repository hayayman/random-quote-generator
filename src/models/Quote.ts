//src/models/Quote.ts

import { QuoteAPIResponse } from "../types/quoteTypes";

export class QuoteModel {
    text: string;
    author: string;
    link: string;
    category?: string;

    constructor(quoteData: QuoteAPIResponse, category?: string) {
        this.text = quoteData.quoteText;
        this.author = quoteData.quoteAuthor || "Unknown";
        this.link = quoteData.quoteLink;
        this.category = category;
    }
}