// src/components/Notification.ts

export class Notification {
    static showMessage(message: string, type: 'success' | 'error'): void {
        const notification = document.getElementById('notification');
        const notificationIcon = document.getElementById('notification-icon');
        const notificationMessage = document.getElementById('notification-message');
        
        if (!notification || !notificationIcon || !notificationMessage) return;
        
        // Set message
        notificationMessage.textContent = message;
        
        // Set icon based on type
        if (type === 'success') {
            notificationIcon.className = 'fas fa-check-circle mr-2 text-green-400';
        } else {
            notificationIcon.className = 'fas fa-exclamation-circle mr-2 text-red-400';
        }
        
        // Show notification with animation
        notification.classList.remove('opacity-0', 'translate-y-24');
        notification.classList.add('opacity-100', 'translate-y-0');
        
        // Hide after delay
        setTimeout(() => {
            notification.classList.remove('opacity-100', 'translate-y-0');
            notification.classList.add('opacity-0', 'translate-y-24');
        }, 3000);
    }
}