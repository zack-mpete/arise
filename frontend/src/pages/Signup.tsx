import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Mail, Lock, User, Briefcase, ArrowRight } from "lucide-react";
import { authApi } from "../lib/api";
import styles from "../style/css_modules/pages/Auth.module.css";


export default function Signup() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "entrepreneur"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await authApi.signup({ 
        nom_utilisateur: formData.fullName, 
        email: formData.email, 
        mot_de_passe: formData.password, 
        role: formData.role 
      });
      alert("Compte créé avec succès ! Connectez-vous maintenant.");
      setLocation("/login");
    } catch (err: any) {
      setError(err.message || "Erreur lors de la création du compte.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className={styles.authPage}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.authCard}
      >
        <div className={styles.authHeader}>
          <div className={styles.logoIcon}>I</div>
          <h1 className={styles.authTitle}>Rejoignez-nous</h1>
          <p className={styles.authSubtitle}>Commencez votre voyage vers l'innovation aujourd'hui</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nom complet</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
              <input 
                type="text" 
                className={styles.input} 
                style={{ paddingLeft: '40px' }}
                placeholder="Jean Dupont"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Adresse Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
              <input 
                type="email" 
                className={styles.input} 
                style={{ paddingLeft: '40px' }}
                placeholder="nom@exemple.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Mot de passe</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
              <input 
                type="password" 
                className={styles.input} 
                style={{ paddingLeft: '40px' }}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Je suis un...</label>
            <div style={{ position: 'relative' }}>
              <Briefcase size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
              <select 
                className={styles.input} 
                style={{ paddingLeft: '40px' }}
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                required
              >
                <option value="entrepreneur">Entrepreneur</option>
                <option value="investisseur">Investisseur</option>
                <option value="curieux">Curieux d'innovation</option>
              </select>
            </div>
          </div>

          <motion.button 
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className={styles.authButton}
            disabled={isSubmitting}
            style={{ opacity: isSubmitting ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            {isSubmitting ? "Création..." : "Créer mon compte"}
            {!isSubmitting && <ArrowRight size={18} />}
          </motion.button>
        </form>

        <div className={styles.authFooter}>
          Déjà inscrit ? <Link href="/login" className={styles.authLink}>Connectez-vous</Link>
        </div>
      </motion.div>
    </div>
  );
}
