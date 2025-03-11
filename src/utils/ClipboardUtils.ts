// src/utils/ClipboardUtils.ts

export function copyToClipboard(text: string): Promise<void> {
    return navigator.clipboard.writeText(text).catch((err) => {
        console.error(`Failed to copy text: ${err}`);
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
    });
}
