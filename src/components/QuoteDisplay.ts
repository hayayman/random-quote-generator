// src/components/QuoteDisplay.ts

import { QuoteModel } from "../models/Quote";
import { updateElementContent } from "../utils/DOMUtils";
import { StorageService } from "../services/StorageService";

export class QuoteDisplay {
    static updateQuote(quote: QuoteModel): void {
        updateElementContent('#quote-text', quote.text);
        updateElementContent('#quote-author', quote.author);
        
        // Update favorite button state based on whether this quote is already in favorites
        const isFavorite = StorageService.isFavorite(quote);
        const favoriteBtn = document.getElementById('favorite-btn');
        
        if (favoriteBtn) {
            const icon = favoriteBtn.querySelector('i');
            const text = favoriteBtn.querySelector('span');
            
            if (icon) {
                icon.className = isFavorite ? 'fas fa-heart' : 'far fa-heart';
            }
            
            if (text) {
                text.textContent = isFavorite ? 'Saved' : 'Save';
            }
        }
    }
}