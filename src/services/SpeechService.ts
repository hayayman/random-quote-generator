// src/services/SpeechService.ts

export class SpeechService {
    static speakText(text: string): void {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            
            // Cancel any ongoing speech before starting a new one
            window.speechSynthesis.cancel();
            
            // Speak the text
            window.speechSynthesis.speak(speech);
        } else {
            alert('Sorry, your browser does not support the Speech Synthesis API.');
        }
    }
}
