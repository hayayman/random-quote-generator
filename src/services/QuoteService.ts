// src/services/QuoteService.ts

import { QuoteModel } from "../models/Quote";
import { QuoteAPIResponse } from "../types/quoteTypes";
import { toggleVisibility } from "../utils/DOMUtils";

const OFFLINE_QUOTES = [
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "life" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney", category: "motivation" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "inspiration" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill", category: "success" },
    { text: "Happiness is not something ready-made. It comes from your own actions.", author: "Dalai Lama", category: "happiness" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "success" },
    { text: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln", category: "wisdom" },
    { text: "Love yourself first and everything else falls into line.", author: "Lucille Ball", category: "love" }
];

export class QuoteService {
    static isOffline = false;

    static async fetchQuote(category: string = "all"): Promise<QuoteModel | null> {
        try {
            // Show loading indicator
            toggleVisibility('#loading-indicator', true);
            toggleVisibility('#quote-content', false);
            toggleVisibility('#error-message', false);

            // Check if browser is online
            if (!navigator.onLine) {
                throw new Error('Browser reports offline');
            }

            // Using a direct fetch request with a proxy to avoid CORS issues
            const response = await fetch('https://api.allorigins.win/get?url=' + 
                encodeURIComponent('https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'));
            
            if (!response.ok) {
                throw new Error('Failed to fetch from API');
            }
            
            const data = await response.json();
            let quoteData: QuoteAPIResponse;
            
            try {
                // Parse the contents from the proxy response
                quoteData = JSON.parse(data.contents);
            } catch (e) {
                throw new Error('Invalid API response');
            }
            
            const selectedCategory = 
                category !== "all" 
                    ? category 
                    : ["inspiration", "motivation", "success", "wisdom", "happiness", "life", "love"][
                        Math.floor(Math.random() * 7)
                    ];
            
            return new QuoteModel(quoteData, selectedCategory);
            
        } catch (error) {
            console.error('Error fetching quote:', error);
            this.isOffline = true;
            
            // Update UI to show offline mode
            const offlineBadge = document.getElementById('offline-badge');
            if (offlineBadge) offlineBadge.classList.remove('hidden');
            
            // Get connection status element and update it
            const connectionStatus = document.getElementById('connection-status');
            if (connectionStatus) {
                connectionStatus.innerHTML = '<i class="fas fa-wifi text-red-500 mr-1"></i><span>Offline</span>';
            }
            
            // Get API status element and update it
            const apiStatus = document.getElementById('apiStatus');
            if (apiStatus) {
                apiStatus.innerHTML = '<span class="w-2 h-2 mr-1.5 rounded-full bg-red-500"></span>API Status: Disconnected';
            }
            
            // Return a random quote from offline collection
            return this.getOfflineQuote(category);
        } finally {
            // Hide loading indicator
            toggleVisibility('#loading-indicator', false);
            toggleVisibility('#quote-content', true);
        }
    }

    static getOfflineQuote(category: string = "all"): QuoteModel {
        let filteredQuotes = OFFLINE_QUOTES;
        
        if (category !== "all") {
            filteredQuotes = OFFLINE_QUOTES.filter(quote => quote.category === category);
            // If no quotes match the category, fall back to all quotes
            if (filteredQuotes.length === 0) filteredQuotes = OFFLINE_QUOTES;
        }
        
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const randomQuote = filteredQuotes[randomIndex];
        
        // Convert to QuoteAPIResponse structure
        const quoteData: QuoteAPIResponse = {
            quoteText: randomQuote.text,
            quoteAuthor: randomQuote.author,
            senderName: "",
            senderLink: "",
            quoteLink: ""
        };
        
        return new QuoteModel(quoteData, randomQuote.category);
    }

    static getCachedQuote(): QuoteModel | null {
        const cachedQuote = localStorage.getItem('cachedQuote');
        if (cachedQuote) {
            try {
                return JSON.parse(cachedQuote);
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    static setCachedQuote(quote: QuoteModel): void {
        localStorage.setItem('cachedQuote', JSON.stringify(quote));
    }
}