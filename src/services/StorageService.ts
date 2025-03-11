// src/services/StorageService.ts

import { QuoteModel } from "../models/Quote";

export class StorageService {
    static getFavorites(): QuoteModel[] {
        const favorites = localStorage.getItem('favorites');
        if (favorites) {
            return JSON.parse(favorites);
        }
        return [];
    }

    static isFavorite(quote: QuoteModel): boolean {
        const favorites = this.getFavorites();
        return favorites.some(fav => fav.text === quote.text && fav.author === quote.author);
    }

    static addFavorite(quote: QuoteModel): void {
        const favorites = this.getFavorites();
        // Check if quote already exists to avoid duplicates
        if (!this.isFavorite(quote)) {
            favorites.push(quote);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }

    static removeFavorite(index: number): void {
        const favorites = this.getFavorites();
        if (index >= 0 && index < favorites.length) {
            favorites.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }

    static clearFavorites(): void {
        localStorage.removeItem('favorites');
    }
}