import { Link, useLocation } from "wouter";
import { LayoutDashboard, Briefcase, Lightbulb, User, Home } from "lucide-react";
import { motion } from "framer-motion";
import styles from "../style/css_modules/components/MobileBottomNav.module.css";
import { CURRENT_USER } from "../lib/authMock";

export default function MobileBottomNav() {
  const [location] = useLocation();

  const navItems = [
    { name: "Accueil", path: "/", icon: Home, showFor: ["entrepreneur", "investisseur", "admin", "guest"] },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, showFor: ["entrepreneur", "investisseur", "admin"] },
    { name: "Projets", path: "/dashboard/projects", icon: Briefcase, showFor: ["entrepreneur"] },
    { name: "Deal Flow", path: "/dashboard/opportunities", icon: Lightbulb, showFor: ["investisseur", "admin"] },
    { name: "Profil", path: "/dashboard/profile", icon: User, showFor: ["entrepreneur", "investisseur", "admin"] },
  ].filter(item => {
    if (!item.showFor) return true;
    if (item.showFor.includes("guest")) return true;
    return item.showFor.includes(CURRENT_USER.role.toLowerCase());
  });


  return (
    <nav className={styles.bottomNav}>
      <div className={styles.navContainer}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          return (
            <Link key={item.name} href={item.path}>
              <a className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}>
                <div className={styles.iconWrapper}>
                  <Icon size={24} />
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab"
                      className={styles.activeIndicator}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
                <span className={styles.navLabel}>{item.name}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
