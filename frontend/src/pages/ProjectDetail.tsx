import { useState, useEffect } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, Calendar, User, MessageCircle, Mail } from "lucide-react";
import { motion } from "framer-motion";
import styles from "../style/css_modules/pages/ProjectDetail.module.css";

// Mocks pour la démo
const MOCK_PROJECT = {
  projet_id: 1,
  titre: "EcoTrack",
  description: "Application de suivi de l'empreinte carbone personnelle avec IA. \n\nNotre mission est de démocratiser l'accès aux données environnementales pour chaque individu. Grâce à notre algorithme propriétaire, nous analysons les habitudes de consommation et proposons des alternatives écologiques personnalisées.\n\nNous recherchons actuellement 50 000€ pour finaliser le développement de la V1 et lancer notre campagne d'acquisition sur les réseaux sociaux.",
  statut: "En recherche de fonds",
  date_soumission: "2026-04-15T10:00:00Z",
  auteur: {
    nom: "Marie Dupont",
    role: "Fondatrice & CEO"
  },
  commentaires: [
    { id: 1, auteur: "Marc Invest", date: "Il y a 2 jours", texte: "Projet très intéressant. Quel est votre business model exact ?" },
    { id: 2, auteur: "TechIncubator", date: "Hier", texte: "Avez-vous déjà des bêta-testeurs actifs ?" }
  ]
};

export default function ProjectDetail() {
  const [, params] = useRoute("/project/:id");
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dans une vraie application, on ferait:
    // fetch(`/api/projets/${params.id}`).then(...)
    
    // Pour la démo, on utilise le mock
    setTimeout(() => {
      setProject(MOCK_PROJECT);
      setLoading(false);
    }, 500);
  }, [params?.id]);

  if (loading) {
    return <div className={styles.detailPage} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Chargement...</div>;
  }

  if (!project) {
    return <div className={styles.detailPage}>Projet introuvable.</div>;
  }

  return (
    <div className={styles.detailPage}>
      <div className="container">
        <Link href="/explore" className={styles.backLink}>
          <ArrowLeft size={20} />
          Retour à l'exploration
        </Link>

        <div className={styles.layoutGrid}>
          {/* Contenu Principal */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.mainContent}
          >
            <div className={styles.header}>
              <span className={styles.statusBadge}>{project.statut}</span>
              <h1 className={styles.title}>{project.titre}</h1>
              <div className={styles.metaInfo}>
                <div className={styles.metaItem}>
                  <Calendar size={16} />
                  <span>Publié le {new Date(project.date_soumission).toLocaleDateString()}</span>
                </div>
                <div className={styles.metaItem}>
                  <MessageCircle size={16} />
                  <span>{project.commentaires.length} commentaires</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className={styles.sectionTitle}>À propos du projet</h2>
              <div className={styles.description}>
                {project.description}
              </div>
            </div>

            <div className={styles.commentsSection}>
              <h2 className={styles.sectionTitle}>Discussions</h2>
              <div className={styles.commentList}>
                {project.commentaires.map((comment: any) => (
                  <div key={comment.id} className={styles.commentCard}>
                    <div className={styles.commentHeader}>
                      <span className={styles.commentAuthor}>{comment.auteur}</span>
                      <span className={styles.commentDate}>{comment.date}</span>
                    </div>
                    <p className={styles.commentText}>{comment.texte}</p>
                  </div>
                ))}
              </div>
              <div className={styles.readOnlyNotice}>
                Connectez-vous ou créez un compte pour participer à la discussion ou contacter l'auteur.
                <br />
                <Link href="/login" style={{ color: 'var(--primary)', fontWeight: 'bold', marginTop: '8px', display: 'inline-block' }}>Se connecter</Link>
              </div>
            </div>
          </motion.div>

          {/* Sidebar / Auteur */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={styles.sidebar}
          >
            <div className={styles.sidebarCard}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '24px' }}>Porteur de projet</h3>
              <div className={styles.authorHeader}>
                <div className={styles.authorAvatar}>
                  {project.auteur.nom.charAt(0)}
                </div>
                <div>
                  <div className={styles.authorName}>{project.auteur.nom}</div>
                  <div className={styles.authorRole}>{project.auteur.role}</div>
                </div>
              </div>
              <button className={styles.contactBtn} onClick={() => alert('Veuillez vous connecter pour contacter l\'auteur.')}>
                <Mail size={18} />
                Contacter l'auteur
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
