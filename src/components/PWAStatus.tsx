import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Download, CheckCircle, AlertCircle, X } from 'lucide-react';
import { isOnline, isAppInstalled, showInstallPrompt, setupOnlineOfflineListeners } from '../utils/pwa';

interface PWAStatusProps {
  className?: string;
}

const PWAStatus: React.FC<PWAStatusProps> = ({ className = '' }) => {
  const [online, setOnline] = useState(isOnline());
  const [installed, setInstalled] = useState(isAppInstalled());
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [dismissedStatus, setDismissedStatus] = useState<string[]>([]);

  useEffect(() => {
    // Load dismissed status from localStorage
    const savedDismissed = localStorage.getItem('pwa_dismissed_status');
    if (savedDismissed) {
      try {
        setDismissedStatus(JSON.parse(savedDismissed));
      } catch (error) {
        console.error('Error parsing dismissed status:', error);
      }
    }

    // Listen for online/offline events
    const cleanup = setupOnlineOfflineListeners(
      () => setOnline(true),
      () => setOnline(false)
    );

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if app is already installed
    setInstalled(isAppInstalled());

    return () => {
      cleanup();
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (installPrompt) {
      const result = await showInstallPrompt();
      if (result) {
        setShowInstallButton(false);
        setInstalled(true);
      }
    }
  };

  const handleDismiss = (statusType: string) => {
    const newDismissed = [...dismissedStatus, statusType];
    setDismissedStatus(newDismissed);
    localStorage.setItem('pwa_dismissed_status', JSON.stringify(newDismissed));
  };

  if (installed && online) {
    return null; // Don't show anything if app is installed and online
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 space-y-2 ${className}`}>
      {/* Offline Status */}
      {!online && !dismissedStatus.includes('offline') && (
        <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center justify-between animate-pulse">
          <div className="flex items-center space-x-2">
            <WifiOff className="w-4 h-4" />
            <span className="text-sm font-medium">Mode Offline</span>
          </div>
          <button
            onClick={() => handleDismiss('offline')}
            className="ml-2 p-1 hover:bg-red-600 rounded transition-colors"
            title="Tutup"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Online Status */}
      {online && !installed && !dismissedStatus.includes('online') && (
        <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wifi className="w-4 h-4" />
            <span className="text-sm font-medium">Online</span>
          </div>
          <button
            onClick={() => handleDismiss('online')}
            className="ml-2 p-1 hover:bg-green-600 rounded transition-colors"
            title="Tutup"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Install Prompt */}
      {showInstallButton && !installed && !dismissedStatus.includes('install') && (
        <div className="bg-amber-500 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center justify-between space-x-3">
            <div className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Install App</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleInstall}
                className="bg-white text-amber-600 px-3 py-1 rounded text-xs font-medium hover:bg-amber-50 transition-colors"
              >
                Install
              </button>
              <button
                onClick={() => handleDismiss('install')}
                className="p-1 hover:bg-amber-600 rounded transition-colors"
                title="Tutup"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Installed Status */}
      {installed && !dismissedStatus.includes('installed') && (
        <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">App Terinstall</span>
          </div>
          <button
            onClick={() => handleDismiss('installed')}
            className="ml-2 p-1 hover:bg-blue-600 rounded transition-colors"
            title="Tutup"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PWAStatus;
