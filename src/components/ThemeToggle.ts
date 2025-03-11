// src/components/ThemeToggle.ts

export class ThemeToggle {
    static toggleTheme(): void {
        document.documentElement.classList.toggle('dark');
        const isDarkMode = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }

    static loadTheme(): void {
        // Check system preference first
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Then check saved preference
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
            document.documentElement.classList.add('dark');
        }
    }
}