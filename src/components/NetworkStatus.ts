// src/components/NetworkStatus.ts 

export class NetworkStatus {
    static init(): void {
        // Initial check
        this.updateStatus();
        
        // Add event listeners for network status changes
        window.addEventListener('online', () => this.updateStatus());
        window.addEventListener('offline', () => this.updateStatus());
    }
    
    static updateStatus(): void {
        const isOnline = navigator.onLine;
        const connectionStatus = document.getElementById('connection-status');
        const apiStatus = document.getElementById('apiStatus');
        const offlineBadge = document.getElementById('offline-badge');
        
        if (connectionStatus) {
            connectionStatus.innerHTML = isOnline 
                ? '<i class="fas fa-wifi text-green-500 mr-1"></i><span>Online</span>'
                : '<i class="fas fa-wifi text-red-500 mr-1"></i><span>Offline</span>';
        }
        
        if (apiStatus) {
            apiStatus.innerHTML = isOnline 
                ? '<span class="w-2 h-2 mr-1.5 rounded-full bg-green-500 animate-pulse"></span>API Status: Connected'
                : '<span class="w-2 h-2 mr-1.5 rounded-full bg-red-500"></span>API Status: Disconnected';
        }
        
        if (offlineBadge) {
            if (isOnline) {
                offlineBadge.classList.add('hidden');
            } else {
                offlineBadge.classList.remove('hidden');
            }
        }
    }
}