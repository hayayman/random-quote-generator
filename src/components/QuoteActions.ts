// src/components/QuoteActions

import { QuoteService } from "../services/QuoteService";
import { StorageService } from "../services/StorageService";
import { SpeechService } from "../services/SpeechService";
import { QuoteDisplay } from "./QuoteDisplay";
import { generateTweetLink } from "../utils/TwitterUtils";
import { copyToClipboard } from "../utils/ClipboardUtils";
import { Notification } from "./Notification";
import { toggleVisibility } from "../utils/DOMUtils";
import { FavoritesList } from "./FavoritesList";

export class QuoteActions {
    static async fetchNewQuote(): Promise<void> {
        try {
            // Get selected category
            const categorySelect = document.getElementById('category-select') as HTMLSelectElement;
            const selectedCategory = categorySelect ? categorySelect.value : 'all';
            
            // Show loading state
            toggleVisibility('#loading-indicator', true);
            toggleVisibility('#quote-content', false);
            toggleVisibility('#error-message', false);
            
            // Fetch quote
            const quote = await QuoteService.fetchQuote(selectedCategory);
            
            if (quote) {
                QuoteService.setCachedQuote(quote);
                QuoteDisplay.updateQuote(quote);
                
                // Update category tag
                const categoryTag = document.getElementById('category-choice');
                if (categoryTag && quote.category) {
                    categoryTag.textContent = quote.category.charAt(0).toUpperCase() + quote.category.slice(1);
                }
                
                // Update favorite button state
                const isFavorite = StorageService.isFavorite(quote);
                this.updateFavoriteButton(isFavorite);
            }
        } catch (error) {
            console.error('Error getting new quote:', error);
            toggleVisibility('#error-message', true);
        } finally {
            // Hide loading state
            toggleVisibility('#loading-indicator', false);
            toggleVisibility('#quote-content', true);
        }
    }

    static async copyQuote(): Promise<void> {
        const quote = QuoteService.getCachedQuote();
        if (quote) {
            try {
                await copyToClipboard(`"${quote.text}" - ${quote.author}`);
                Notification.showMessage('Quote copied to clipboard', 'success');
            } catch (error) {
                Notification.showMessage('Failed to copy quote', 'error');
            }
        }
    }

    static tweetQuote(): void {
        const quote = QuoteService.getCachedQuote();
        if (quote) {
            const tweetLink = generateTweetLink(quote.text, quote.author);
            window.open(tweetLink, '_blank');
        }
    }

    static speakQuote(): void {
        const quote = QuoteService.getCachedQuote();
        if (quote) {
            SpeechService.speakText(`${quote.text} by ${quote.author}`);
            Notification.showMessage('Speaking quote...', 'success');
        }
    }

    static saveToFavorites(): void {
        const quote = QuoteService.getCachedQuote();
        if (quote) {
            const isFavorite = StorageService.isFavorite(quote);
            
            if (isFavorite) {
                // Find the index of the quote in favorites
                const favorites = StorageService.getFavorites();
                const index = favorites.findIndex(fav => 
                    fav.text === quote.text && fav.author === quote.author
                );
                
                if (index !== -1) {
                    StorageService.removeFavorite(index);
                    Notification.showMessage('Quote removed from favorites', 'success');
                    this.updateFavoriteButton(false);
                }
            } else {
                StorageService.addFavorite(quote);
                Notification.showMessage('Quote saved to favorites', 'success');
                this.updateFavoriteButton(true);
            }
            
            // Update favorites list
            FavoritesList.renderFavorites();
        }
    }
    
    static updateFavoriteButton(isFavorite: boolean): void {
        const favoriteBtn = document.getElementById('favorite-btn');
        if (favoriteBtn) {
            const icon = favoriteBtn.querySelector('i');
            const text = favoriteBtn.querySelector('span');
            
            if (icon) {
                if (isFavorite) {
                    icon.className = 'fas fa-heart';
                } else {
                    icon.className = 'far fa-heart';
                }
            }
            
            if (text) {
                text.textContent = isFavorite ? 'Saved' : 'Save';
            }
        }
    }
}