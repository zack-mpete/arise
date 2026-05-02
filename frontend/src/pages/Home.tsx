import { useState, useRef } from "react";
import { ArrowRight, Zap, Shield, Users, TrendingUp, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import styles from "../style/css_modules/pages/Home.module.css";
import { handleLogin, subscribeToWaitlist, scrollToSection } from "../lib/fonction";

/**
 * Design Philosophy: Minimalisme Technologique Élégant
 * - Clarté absolue avec hiérarchie visuelle nette
 * - Confiance par la transparence
 * - Animations fluides 200-300ms
 * - Mobile-first responsive design
 */
const MotionAnimatePresence = AnimatePresence as any;

export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const features = [
    {
      icon: Zap,
      title: "Innovation Rapide",
      description: "Connectez vos idées avec des investisseurs en quelques minutes.",
    },
    {
      icon: Shield,
      title: "Sécurité PI",
      description: "Certificat blockchain pour protéger votre propriété intellectuelle.",
    },
    {
      icon: Users,
      title: "Communauté",
      description: "Réseau de confiance avec système de réputation transparent.",
    },
    {
      icon: TrendingUp,
      title: "Croissance",
      description: "Financements et talents pour concrétiser vos projets.",
    },
  ];

  const stats = [
    { number: "500+", label: "Entrepreneurs" },
    { number: "200+", label: "Investisseurs" },
    { number: "1000+", label: "Projets" },
  ];

  return (
    <div className={styles.pageWrapper}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={`container ${styles.navContainer}`}>
          <div className={styles.logoArea}>
            <div className={styles.logoBox}>
              <span className="font-bold text-lg">I</span>
            </div>
            <span className={`${styles.logoText} hidden sm:inline`}>Innovation Hub</span>
          </div>
          <div className={styles.navButtons}>
            <Link href="/login">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                className="hidden sm:inline-flex" 
                style={{ color: 'var(--muted-foreground)', cursor: 'pointer', background: 'none', border: 'none' }}
              >
                Se connecter
              </motion.button>
            </Link>
            <Link href="/explore">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', border: 'none' }}
              >
                Commencer
              </motion.button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        className={`${styles.heroSection} container`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.heroGrid}>
          {/* Hero Content */}
          <motion.div variants={itemVariants} className={styles.heroContent}>
            <div>
              <h1 className={styles.heroTitle}>
                Le Hub de l'<span className={styles.primaryText}>Innovation</span>
              </h1>
              <p className={styles.heroSubtitle}>
                Connectez entrepreneurs et investisseurs dans un écosystème sécurisé, transparent et bâti sur la confiance.
              </p>
            </div>

            <div className={styles.ctaGroup}>
              <Link href="/signup">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', height: '48px', padding: '0 32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: 'none', cursor: 'pointer', width: '100%' }}
                >
                  Créer un compte
                  <ArrowRight size={18} />
                </motion.button>
              </Link>
              <Link href="/explore">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  style={{ border: '1px solid var(--border)', background: 'transparent', color: 'var(--foreground)', height: '48px', padding: '0 32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', width: '100%' }}
                >
                  Explorer les projets
                </motion.button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className={styles.trustBadges}>
              <div className={styles.avatarGroup}>
                {[1, 2, 3].map((i) => (
                  <div key={i} className={styles.avatar} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Rejoignez <span className="font-semibold text-foreground">700+ innovateurs</span>
              </p>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div variants={itemVariants} className={styles.heroVisual}>
            <div className={styles.visualBg} />
            <div className={styles.visualContent}>
              <div className="text-center">
                <div className={styles.iconCircle}>
                  <Zap size={48} />
                </div>
                <p className="text-muted-foreground font-medium">Plateforme sécurisée</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <p className={styles.statNumber}>{stat.number}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section id="features" className={`${styles.featuresSection} container`}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 className={styles.heroTitle} style={{ fontSize: '2.5rem' }}>Pourquoi Innovation Hub ?</h2>
          <p className={styles.heroSubtitle}>Une plateforme conçue pour briser les barrières et créer des opportunités réelles.</p>
        </div>

        <motion.div className={styles.featuresGrid}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className={styles.featureCard}>
                <div className={styles.iconWrapper}>
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section id="how-it-works" className={styles.statsSection}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 className="text-3xl font-bold">Comment ça marche ?</h2>
          </div>

          <div className={styles.statsGrid}>
            {[
              {
                step: "1",
                title: "Créez votre profil",
                description: "Inscrivez-vous en tant qu'entrepreneur ou investisseur.",
              },
              {
                step: "2",
                title: "Publiez ou découvrez",
                description: "Partagez vos projets ou explorez les opportunités.",
              },
              {
                step: "3",
                title: "Connectez-vous",
                description: "Collaborez et concrétisez vos idées ensemble.",
              },
            ].map((item, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div className={styles.iconCircle} style={{ width: '48px', height: '48px', margin: '0 auto 16px' }}>
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="container">
        <div className={styles.ctaBanner}>
          <h2 className="text-3xl font-bold mb-4">Prêt à transformer vos idées en réalité ?</h2>
          <p style={{ marginBottom: '32px', opacity: 0.9 }}>Rejoignez notre communauté d'innovateurs et d'investisseurs dès aujourd'hui.</p>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            style={{ backgroundColor: 'white', color: 'var(--primary)', height: '48px', padding: '0 32px', borderRadius: '8px', fontWeight: 'bold' }}
          >
            Commencer maintenant
          </motion.button>
        </div>
      </section>

      {/* Contact Modal */}
      <MotionAnimatePresence>
        {isModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              style={{ position: 'relative', backgroundColor: 'var(--card)', width: '100%', maxWidth: '500px', borderRadius: '16px', padding: '32px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ position: 'absolute', top: '16px', right: '16px', color: 'var(--muted-foreground)' }}
              >
                <X size={24} />
              </button>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>Rejoignez Innovation Hub</h2>
              <p style={{ color: 'var(--muted-foreground)', marginBottom: '24px' }}>Laissez-nous votre email pour être informé du lancement officiel et recevoir une invitation exclusive.</p>
              <form onSubmit={async (e) => { 
                e.preventDefault(); 
                setIsSubmitting(true);
                const result = await subscribeToWaitlist(email);
                setIsSubmitting(false);
                if (result.success) {
                  setIsModalOpen(false);
                  alert(result.message);
                }
              }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  style={{ width: '100%', backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', padding: '12px', borderRadius: '8px', fontWeight: 600, opacity: isSubmitting ? 0.7 : 1 }}
                >
                  {isSubmitting ? "Envoi en cours..." : "S'inscrire à la liste d'attente"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </MotionAnimatePresence>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerGrid}>
            <div>
              <h4 className={styles.footerTitle}>Produit</h4>
              <ul className="space-y-2 text-sm">
                <li>Fonctionnalités</li>
                <li>Tarifs</li>
                <li>Sécurité</li>
              </ul>
            </div>
            <div>
              <h4 className={styles.footerTitle}>Entreprise</h4>
              <ul className="space-y-2 text-sm">
                <li>À propos</li>
                <li>Blog</li>
                <li>Carrières</li>
              </ul>
            </div>
            <div>
              <h4 className={styles.footerTitle}>Ressources</h4>
              <ul className="space-y-2 text-sm">
                <li>Documentation</li>
                <li>Support</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className={styles.footerTitle}>Légal</h4>
              <ul className="space-y-2 text-sm">
                <li>Confidentialité</li>
                <li>Conditions</li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #1e293b', paddingTop: '32px', textAlign: 'center', fontSize: '0.875rem' }}>
            <p>&copy; 2026 Innovation Hub. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
