import { useState, useEffect } from "react";
import { Link } from "wouter";
import { FileText, MessageSquare, TrendingUp, Filter, Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import DashboardLayout from "../../components/DashboardLayout";
import styles from "../../style/css_modules/pages/dashboard/Opportunities.module.css";
import { opportunitiesApi } from "../../lib/api";

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
    
    const fetchOpps = async () => {
      try {
        const data = await opportunitiesApi.getAll();
        // Adapter les données si nécessaire (le backend renvoie peut-être des champs différents)
        setOpportunities(data.map((o: any) => ({
          ...o,
          titre: o.titre || "Sans titre",
          categorie: o.categorie || "Général",
          auteur: o.nom_utilisateur || "Entrepreneur",
          date: "Récemment",
          statut: o.statut || "nouvelle"
        })));
      } catch (error) {
        console.error("Erreur opps:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOpps();
  }, []);

  // Sécurité rudimentaire basée sur l'utilisateur en session
  const userRole = user?.role?.toLowerCase();
  if (!isLoading && userRole !== "investisseur" && userRole !== "admin") {
    return (
      <DashboardLayout title="Accès Refusé">
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2>Accès Réservé</h2>
          <p>Cette section est réservée aux investisseurs accrédités de la plateforme.</p>
        </div>
      </DashboardLayout>
    );
  }

  if (isLoading) {
    return (
      <DashboardLayout title="Deal Flow">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <Loader2 className="animate-spin" size={48} color="var(--primary)" />
        </div>
      </DashboardLayout>
    );
  }

  // Filtrer les opportunités par colonne (statut)
  const nouvelles = opportunities.filter(o => o.statut === "nouvelle");
  const enDiscussion = opportunities.filter(o => o.statut === "en_discussion");
  const financees = opportunities.filter(o => o.statut === "financee");

  const renderCard = (opp: any, index: number) => (

    <motion.div 
      key={opp.id} 
      className={styles.oppCard} 
      draggable="true"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={styles.oppHeader}>
        <h3 className={styles.oppTitle}>{opp.titre}</h3>
        <span className={styles.oppCategory}>{opp.categorie}</span>
      </div>
      <p className={styles.oppDesc}>{opp.description}</p>
      
      <div className={styles.oppMeta}>
        <div className={styles.metaItem}>
          <div style={{ 
            width: '20px', 
            height: '20px', 
            borderRadius: '50%', 
            backgroundColor: 'var(--primary)', 
            color: 'white', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontSize: '10px', 
            fontWeight: 'bold' 
          }}>
            {opp.auteur.charAt(0)}
          </div>
          <span>{opp.auteur}</span>
        </div>
        <div className={styles.metaItem}>
          <span>{opp.date}</span>
        </div>
      </div>

      <div className={styles.oppActions}>
        <Link href={`/project/${opp.id}`}>
          <a className={styles.actionBtn} style={{ flex: 1 }}>
            <FileText size={14} /> Pitch Deck
          </a>
        </Link>
        <button className={`${styles.actionBtn} ${styles.primaryAction}`}>
          <MessageSquare size={14} /> Contacter
        </button>
      </div>
    </motion.div>
  );

  return (
    <DashboardLayout title="Deal Flow">
      <div className={styles.dealFlowContainer}>
        
        <div className={styles.pageHeader}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 className={styles.pageTitle}>Pipeline d'Investissement</h1>
              <p className={styles.pageDesc}>
                Explorez les projets validés et gérez vos opportunités.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className={styles.actionBtn} style={{ padding: '8px 12px' }}>
                <Filter size={16} />
              </button>
              <button className={styles.actionBtn} style={{ padding: '8px 12px' }}>
                <Search size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className={styles.kanbanBoard}>
          
          {/* Colonne 1 : Nouvelles opportunités */}
          <div className={styles.kanbanColumn}>
            <div className={styles.columnHeader}>
              <span>Nouvelles</span>
              <span className={styles.columnCount}>{nouvelles.length}</span>
            </div>
            <div className={styles.columnBody}>
              {nouvelles.map((opp, idx) => renderCard(opp, idx))}
            </div>
          </div>

          {/* Colonne 2 : En discussion */}
          <div className={styles.kanbanColumn}>
            <div className={styles.columnHeader}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={16} style={{ color: 'var(--primary)' }} /> En cours
              </span>
              <span className={styles.columnCount}>{enDiscussion.length}</span>
            </div>
            <div className={styles.columnBody}>
              {enDiscussion.map((opp, idx) => renderCard(opp, idx))}
            </div>
          </div>

          {/* Colonne 3 : Refusé */}
          <div className={styles.kanbanColumn} style={{ opacity: 0.8 }}>
            <div className={styles.columnHeader}>
              <span>Archives</span>
              <span className={styles.columnCount}>0</span>
            </div>
            <div className={styles.columnBody}>
              <div style={{ textAlign: 'center', color: 'var(--muted-foreground)', marginTop: '20px', fontSize: '0.8125rem', padding: '0 20px' }}>
                Glissez les cartes ici pour archiver
              </div>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

