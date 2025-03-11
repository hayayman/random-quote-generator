// src/utils/DOMUtils.ts

export function selectElement<T extends HTMLElement>(selector: string): T | null {
    return document.querySelector(selector);
}

export function updateElementContent(selector: string, content: string): void {
    const element = selectElement<HTMLElement>(selector);
    if (element) {
        element.textContent = content;
    }
}

export function toggleVisibility(selector: string, isVisible: boolean): void {
    const element = selectElement<HTMLElement>(selector);
    if (element) {
        element.style.display = isVisible ? 'block' : 'none';
    }
}

export function addClass(selector: string, className: string): void {
    const element = selectElement<HTMLElement>(selector);
    if (element) {
        element.classList.add(className);
    }
}

export function removeClass(selector: string, className: string): void {
    const element = selectElement<HTMLElement>(selector);
    if (element) {
        element.classList.remove(className);
    }
}

export function toggleElement(hideSelector: string, showSelector: string): void {
    toggleVisibility(hideSelector, false);
    toggleVisibility(showSelector, true);
}