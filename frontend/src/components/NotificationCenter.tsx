import { useState } from "react";
import { Bell, X, Check, Info, AlertTriangle } from "lucide-react";
import styles from "../style/css_modules/components/Notifications.module.css";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    title: "Nouveau commentaire",
    message: "Marc a commenté votre projet 'EcoTrack'",
    time: "Il y a 2 heures",
    type: 'info',
    read: false
  },
  {
    id: 2,
    title: "Projet validé",
    message: "Votre projet 'MedChain' a été validé par l'administrateur.",
    time: "Hier",
    type: 'success',
    read: false
  },
  {
    id: 3,
    title: "Alerte de sécurité",
    message: "Nouvelle connexion détectée sur votre compte.",
    time: "Il y a 3 jours",
    type: 'warning',
    read: true
  }
];

const MotionAnimatePresence = AnimatePresence as any;

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className={styles.container}>
      <button 
        className={styles.bellButton} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell size={20} />
        {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
      </button>

      <MotionAnimatePresence>
        {isOpen && (
          <>
            <div className={styles.overlay} onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className={styles.dropdown}
            >
              <div className={styles.header}>
                <h3>Notifications</h3>
                <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                  <X size={18} />
                </button>
              </div>

              <div className={styles.list}>
                {notifications.length === 0 ? (
                  <div className={styles.empty}>Aucune notification</div>
                ) : (
                  notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`${styles.item} ${!notification.read ? styles.unread : ''}`}
                    >
                      <div className={`${styles.icon} ${styles[notification.type]}`}>
                        {notification.type === 'info' && <Info size={16} />}
                        {notification.type === 'success' && <Check size={16} />}
                        {notification.type === 'warning' && <AlertTriangle size={16} />}
                      </div>
                      <div className={styles.content}>
                        <div className={styles.itemHeader}>
                          <span className={styles.itemTitle}>{notification.title}</span>
                          <span className={styles.itemTime}>{notification.time}</span>
                        </div>
                        <p className={styles.itemMessage}>{notification.message}</p>
                        <div className={styles.itemActions}>
                          {!notification.read && (
                            <button 
                              onClick={() => markAsRead(notification.id)}
                              className={styles.actionLink}
                            >
                              Marquer comme lu
                            </button>
                          )}
                          <button 
                            onClick={() => removeNotification(notification.id)}
                            className={styles.actionLink}
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              {notifications.length > 0 && (
                <div className={styles.footer}>
                  <button onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))}>
                    Tout marquer comme lu
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </MotionAnimatePresence>
    </div>
  );
}
