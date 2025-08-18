// PWA Service Worker Registration
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
      
      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, show update notification
              showUpdateNotification();
            }
          });
        }
      });
      
      return registration;
    } catch (error) {
      console.log('SW registration failed: ', error);
    }
  }
};

// Show update notification
const showUpdateNotification = () => {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    // You can implement a custom update notification here
    console.log('New version available!');
  }
};

// Check if app is installed
export const isAppInstalled = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone === true;
};

// Check if app is online
export const isOnline = (): boolean => {
  return navigator.onLine;
};

// Listen for online/offline events
export const setupOnlineOfflineListeners = (onOnline: () => void, onOffline: () => void) => {
  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);
  
  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
  };
};

// Install prompt
export const showInstallPrompt = async () => {
  if ('beforeinstallprompt' in window) {
    const promptEvent = (window as any).deferredPrompt;
    if (promptEvent) {
      promptEvent.prompt();
      const result = await promptEvent.userChoice;
      (window as any).deferredPrompt = null;
      return result.outcome === 'accepted';
    }
  }
  return false;
};

// Cache management
export const clearCache = async () => {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('Cache cleared');
  }
};

// Get cache size
export const getCacheSize = async (): Promise<number> => {
  if ('caches' in window && 'storage' in navigator && 'estimate' in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    return estimate.usage || 0;
  }
  return 0;
};
