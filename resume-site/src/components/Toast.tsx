import { useState, useEffect } from 'react';

type ToastProps = {
  message: string;
  type?: 'success' | 'error';
  duration?: number;
  onClose: () => void;
};

export default function Toast({ message, type = 'success', duration = 3000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // attend la fin de l'animation
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  return (
    <div className={`toast ${type} ${visible ? 'show' : ''}`}>
      {message}
    </div>
  );
}
