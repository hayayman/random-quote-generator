// src/utils/TwitterUtils.ts

export function generateTweetLink(quoteText: string, author: string): string {
    const tweetText = `"${quoteText}" - ${author}`;
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
}
