import { motion } from "framer-motion";
import { Target, Lightbulb, Workflow } from "lucide-react";
import styles from "../style/css_modules/pages/About.module.css";

export default function About() {
  return (
    <div className={styles.aboutPage}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.hero}
        >
          <h1 className={styles.title}>À propos d'Innovation Hub</h1>
          <p className={styles.subtitle}>
            Notre plateforme a été conçue pour briser les barrières entre les porteurs de projets visionnaires et les investisseurs à la recherche de la prochaine grande opportunité.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={styles.section}
        >
          <h2 className={styles.sectionTitle}>
            <Target className="text-primary" size={32} />
            Notre Vision
          </h2>
          <div className={styles.sectionContent}>
            <p>
              Nous croyons que l'innovation ne devrait pas être freinée par un manque d'accès aux ressources ou au réseau. Notre vision est de créer un écosystème décentralisé, transparent et sécurisé où chaque idée brillante a la possibilité de trouver son financement et son public.
            </p>
            <p style={{ marginTop: '16px' }}>
              En utilisant les dernières technologies, notamment la certification de propriété intellectuelle, nous assurons un environnement de confiance pour tous les acteurs.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={styles.section}
        >
          <h2 className={styles.sectionTitle}>
            <Lightbulb className="text-primary" size={32} />
            Notre Mission
          </h2>
          <div className={styles.sectionContent}>
            <p>
              Faciliter la rencontre entre l'offre et la demande d'innovation. Que vous soyez un entrepreneur avec un prototype révolutionnaire ou un investisseur cherchant à diversifier son portefeuille avec des projets à fort impact, Innovation Hub est votre pont.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={styles.section}
          style={{ maxWidth: '1000px' }}
        >
          <h2 className={styles.sectionTitle} style={{ justifyContent: 'center', marginBottom: '48px' }}>
            <Workflow className="text-primary" size={32} />
            Comment ça marche ?
          </h2>
          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>1</div>
              <h3 className={styles.stepTitle}>Soumettez</h3>
              <p className={styles.stepDesc}>Créez un profil détaillé pour votre projet. Mettez en avant votre business plan, vos besoins et votre équipe.</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>2</div>
              <h3 className={styles.stepTitle}>Connectez</h3>
              <p className={styles.stepDesc}>Échangez directement avec des investisseurs intéressés via notre système de messagerie sécurisé et de commentaires.</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>3</div>
              <h3 className={styles.stepTitle}>Concrétisez</h3>
              <p className={styles.stepDesc}>Transformez les discussions en opportunités réelles de financement et faites décoller votre projet.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
