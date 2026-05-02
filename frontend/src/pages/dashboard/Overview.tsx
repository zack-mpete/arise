import { useState, useEffect } from "react";
import { FolderGit2, MessageSquare, Eye, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import DashboardLayout from "../../components/DashboardLayout";
import styles from "../../style/css_modules/pages/dashboard/Overview.module.css";
import { projectsApi } from "../../lib/api";

export default function Overview() {
  const [projectCount, setProjectCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userStr = localStorage.getItem("user");
        if (userStr) {
          const user = JSON.parse(userStr);
          const projects = await projectsApi.getAll(user.utilisateur_id);
          setProjectCount(projects.length);
        }
      } catch (error) {
        console.error("Erreur overview:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { label: "Projets actifs", value: projectCount.toString(), icon: FolderGit2, color: "#3b82f6" },
    { label: "Commentaires non lus", value: "12", icon: MessageSquare, color: "#10b981" },
    { label: "Vues du profil", value: "148", icon: Eye, color: "#8b5cf6" },
  ];

  const activities = [
    { id: 1, title: "Nouveau commentaire", desc: "Marc a commenté votre projet 'EcoTrack'", time: "Il y a 2 heures" },
    { id: 2, title: "Projet validé", desc: "Votre projet 'MedChain' a été validé par un administrateur.", time: "Hier" },
    { id: 3, title: "Opportunité de financement", desc: "TechIncubator vous a envoyé une proposition.", time: "Il y a 3 jours" },
  ];

  if (isLoading) {
    return (
      <DashboardLayout title="Vue d'ensemble">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <Loader2 className="animate-spin" size={48} color="var(--primary)" />
        </div>
      </DashboardLayout>
    );
  }


  return (
    <DashboardLayout title="Vue d'ensemble">
      <div className={styles.overviewGrid}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className={styles.statCard}
            >
              <div className={styles.statIcon} style={{ color: stat.color, backgroundColor: `${stat.color}15` }}>
                <Icon size={24} />
              </div>
              <div className={styles.statInfo}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={styles.recentActivity}
      >
        <h2 className={styles.sectionTitle}>Activité récente</h2>
        <div className={styles.activityList}>
          {activities.map((activity, index) => (
            <motion.div 
              key={activity.id} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={styles.activityItem}
            >
              <div className={styles.activityDot}></div>
              <div className={styles.activityContent}>
                <div className={styles.activityTitle}>{activity.title}</div>
                <div className={styles.activityDesc}>{activity.desc}</div>
              </div>
              <div className={styles.activityTime}>{activity.time}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>

  );
}
