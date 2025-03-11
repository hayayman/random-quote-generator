// src/types/quoteTypes.ts

export interface QuoteAPIResponse {
    quoteText: string;
    quoteAuthor: string;
    senderName: string;
    senderLink: string;
    quoteLink: string;
}

export interface Quote {
    text: string;
    author: string;
    link: string;
    category?: string; // Added category for better organization
}

export interface QuoteCategory {
    value: string;
    label: string;
}
