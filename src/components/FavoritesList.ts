// src/components/FavoritesList.ts

import { StorageService } from "../services/StorageService";
import { Notification } from "./Notification";

export class FavoritesList {
    static renderFavorites(): void {
        const favorites = StorageService.getFavorites();
        const listElement = document.getElementById('favorites-list') as HTMLElement;
        const noFavoritesElement = document.getElementById('no-favorites') as HTMLElement;

        // Clear the list
        if (listElement) {
            listElement.innerHTML = "";
        }

        // Toggle visibility based on whether there are favorites
        if (favorites.length === 0) {
            if (noFavoritesElement) noFavoritesElement.classList.remove('hidden');
            if (listElement) listElement.classList.add('hidden');
            return;
        } else {
            if (noFavoritesElement) noFavoritesElement.classList.add('hidden');
            if (listElement) listElement.classList.remove('hidden');
        }

        // Create and append favorite quote items
        favorites.forEach((quote, index) => {
            const listItem = document.createElement('div');
            listItem.className = 'p-4 border border-gray-200 dark:border-gray-700 rounded-lg mb-3 relative';
            listItem.innerHTML = `
                <p class="text-lg text-gray-800 dark:text-gray-200 mb-2">"${quote.text}"</p>
                <div class="flex justify-between items-center">
                    <p class="text-pink-600 dark:text-pink-400">${quote.author}</p>
                    <button 
                        data-index="${index}" 
                        class="remove-favorite text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                    >
                        <i class="fas fa-trash-alt"></i> Remove
                    </button>
                </div>
                ${quote.category ? `
                <span class="absolute top-2 right-2 text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 rounded-full">
                    ${quote.category}
                </span>` : ''}
            `;
            listElement.appendChild(listItem);
        });

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-favorite').forEach((button) => {
            button.addEventListener('click', (event) => {
                const index = (event.currentTarget as HTMLElement).getAttribute('data-index');
                if (index !== null) {
                    this.removeFavorite(parseInt(index, 10));
                }
            });
        });
    }

    static removeFavorite(index: number): void {
        StorageService.removeFavorite(index);
        this.renderFavorites();
        
        // Show notification
        Notification.showMessage('Quote removed from favorites', 'success');
    }
}