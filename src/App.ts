// src/App.ts

import { QuoteActions } from "./components/QuoteActions";
import { ThemeToggle } from "./components/ThemeToggle";
import { FavoritesList } from "./components/FavoritesList";
import { NetworkStatus } from "./components/NetworkStatus";
import { StorageService } from "./services/StorageService";
import { Notification } from "./components/Notification";

export class App {
    static init(): void {
        // Initialize theme
        ThemeToggle.loadTheme();
        
        // Initialize network status
        NetworkStatus.init();
        
        // Add event listeners
        document.getElementById('new-quote-btn')?.addEventListener('click', () => QuoteActions.fetchNewQuote());
        document.getElementById('copy-btn')?.addEventListener('click', () => QuoteActions.copyQuote());
        document.getElementById('tweet-btn')?.addEventListener('click', () => QuoteActions.tweetQuote());
        document.getElementById('speak-btn')?.addEventListener('click', () => QuoteActions.speakQuote());
        document.getElementById('favorite-btn')?.addEventListener('click', () => QuoteActions.saveToFavorites());
        document.getElementById('theme-toggle')?.addEventListener('click', () => ThemeToggle.toggleTheme());
        
        // Fixed typo in button ID (favorits -> favorites)
        document.getElementById('clear-favorites-btn')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all favorites?')) {
                StorageService.clearFavorites();
                FavoritesList.renderFavorites();
                Notification.showMessage('All favorites cleared', 'success');
            }
        });
        
        // Initialize favorites list
        FavoritesList.renderFavorites();
        
        // Handle category selection
        document.getElementById('category-select')?.addEventListener('change', () => QuoteActions.fetchNewQuote());
        
        // Fetch initial quote
        QuoteActions.fetchNewQuote();
    }
}