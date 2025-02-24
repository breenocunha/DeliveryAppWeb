import { useState, useCallback } from 'react';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
  type: NotificationType;
  message: string;
  duration?: number;
}

export function useNotification() {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = useCallback(({ type, message, duration = 3000 }: Notification) => {
    setNotification({ type, message, duration });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return {
    notification,
    showNotification,
    hideNotification,
    showSuccess: (message: string) => showNotification({ type: 'success', message }),
    showError: (message: string) => showNotification({ type: 'error', message }),
    showInfo: (message: string) => showNotification({ type: 'info', message }),
    showWarning: (message: string) => showNotification({ type: 'warning', message })
  };
} 