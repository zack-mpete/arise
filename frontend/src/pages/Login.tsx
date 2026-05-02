import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { authApi } from "../lib/api";
import styles from "../style/css_modules/pages/Auth.module.css";


export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      const response = await authApi.login({ email, mot_de_passe: password });
      localStorage.setItem("user", JSON.stringify(response.user));
      alert("Connexion réussie !");
      setLocation("/dashboard");
    } catch (err: any) {
      setError(err.message || "Échec de la connexion. Vérifiez vos identifiants.");
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
          <h1 className={styles.authTitle}>Bon retour</h1>
          <p className={styles.authSubtitle}>Connectez-vous pour gérer vos projets d'innovation</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Adresse Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
              <input 
                type="email" 
                className={styles.input} 
                style={{ paddingLeft: '40px' }}
                placeholder="nom@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className={styles.label} style={{ marginBottom: 0 }}>Mot de passe</label>
              <Link href="/forgot-password" className={styles.authLink} style={{ fontSize: '0.75rem' }}>Oublié ?</Link>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
              <input 
                type="password" 
                className={styles.input} 
                style={{ paddingLeft: '40px' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <motion.button 
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className={styles.authButton}
            disabled={isSubmitting}
            style={{ opacity: isSubmitting ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            {isSubmitting ? "Connexion..." : "Se connecter"}
            {!isSubmitting && <ArrowRight size={18} />}
          </motion.button>
        </form>

        <div className={styles.authFooter}>
          Pas encore de compte ? <Link href="/signup" className={styles.authLink}>Inscrivez-vous</Link>
        </div>
      </motion.div>
    </div>
  );
}
