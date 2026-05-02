import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Briefcase, 
  Lightbulb, 
  User, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Home
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import styles from "../style/css_modules/components/DashboardLayout.module.css";
import { CURRENT_USER } from "../lib/authMock";
import NotificationCenter from "./NotificationCenter";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const [location, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  // ... (navItems definition)


  // Construction dynamique des items de menu selon le rôle
  const navItems = [
    { name: "Vue d'ensemble", path: "/dashboard", icon: LayoutDashboard, showFor: ["entrepreneur", "investisseur", "admin"] },
    { name: "Mes Projets", path: "/dashboard/projects", icon: Briefcase, showFor: ["entrepreneur"] },
    { name: "Deal Flow", path: "/dashboard/opportunities", icon: Lightbulb, showFor: ["investisseur", "admin"] },
    { name: "Profil", path: "/dashboard/profile", icon: User, showFor: ["entrepreneur", "investisseur", "admin"] },
  ].filter(item => {
    if (!user) return false;
    return item.showFor.includes(user.role.toLowerCase());
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Déconnexion réussie");
    setLocation("/");
  };


  return (
    <div className={styles.layout}>
      {/* Mobile Overlay */}
      <div 
        className={`${styles.overlay} ${sidebarOpen ? styles.overlayActive : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <Link href="/explore">
            <a style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <div className={styles.logoIcon}>I</div>
              <span className={styles.logoText}>Innovation Hub</span>
            </a>
          </Link>
          <button 
            className={styles.menuToggleBtn} 
            style={{ marginLeft: 'auto' }}
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            return (
              <Link key={item.name} href={item.path}>
                <a className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}>
                  <Icon size={20} />
                  {item.name}
                </a>
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <button 
            onClick={handleLogout}
            className={styles.navItem} 
            style={{ width: '100%', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left' }}
          >
            <LogOut size={20} />
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={styles.mainArea}>
        {/* Header */}
        <header className={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              className={styles.menuToggleBtn}
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className={styles.pageTitle}>{title}</h1>
          </div>

          <div className={styles.headerActions}>
            <NotificationCenter />
            {user && (
              <div className={styles.userProfile}>
                <div className={styles.userInfo}>
                  <div className={styles.userName}>{user.nom_utilisateur}</div>
                  <div className={styles.userRole} style={{ textTransform: 'capitalize' }}>{user.role}</div>
                </div>
                <div className={styles.userAvatar}>
                  {user.nom_utilisateur?.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
          </div>

        </header>

        {/* Dynamic Content with Animation */}
        <main className={styles.contentWrapper}>
          {/* @ts-ignore - Problème de types connu entre React 18 et Framer Motion */}
          <AnimatePresence mode="wait">
            <motion.div
              key={location}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

    </div>
  );
}


