import { useState } from "react";
import { User, Mail, Shield, Linkedin, Star, Calendar, Check, Save } from "lucide-react";
import { motion } from "framer-motion";
import DashboardLayout from "../../components/DashboardLayout";
import styles from "../../style/css_modules/pages/dashboard/Profile.module.css";
import { CURRENT_USER } from "../../lib/authMock";

export default function Profile() {
  const [formData, setFormData] = useState({
    nom: CURRENT_USER.nom,
    email: CURRENT_USER.email,
    linkedin: CURRENT_USER.linkedin || ""
  });
  
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    alert("Mot de passe mis à jour avec succès.");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  return (
    <DashboardLayout title="Mon Profil">
      <div className={styles.profileContainer}>
        
        {/* En-tête / Carte d'identité */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.headerCard}
        >
          <div className={styles.avatar}>
            {CURRENT_USER.initial}
          </div>
          <div className={styles.userInfo}>
            <h2 className={styles.userName}>{CURRENT_USER.nom}</h2>
            <div className={styles.userRoleBadge}>{CURRENT_USER.role}</div>
          </div>
          
          <div className={styles.statsGrid}>
            <div className={styles.statItem} title="Score de confiance (Évaluations)">
              <span className={styles.statValue}>
                <Star size={18} fill="currentColor" className="text-yellow-500" style={{ color: '#eab308' }} />
                {CURRENT_USER.score_confiance}
              </span>
              <span className={styles.statLabel}>Score de Confiance</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>
                <Calendar size={18} />
                {new Date(CURRENT_USER.date_inscription).getFullYear()}
              </span>
              <span className={styles.statLabel}>Membre depuis</span>
            </div>
          </div>
        </motion.div>

        {/* Formulaire Informations Personnelles */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={styles.sectionCard}
        >
          <h3 className={styles.sectionTitle}>
            <User size={20} className="text-primary" />
            Informations Personnelles
          </h3>
          
          <form onSubmit={handleProfileSave}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Nom complet</label>
                <div className={styles.inputWrapper}>
                  <User size={16} className={styles.inputIcon} />
                  <input 
                    type="text" 
                    className={`${styles.input} ${styles.inputWithIcon}`}
                    value={formData.nom}
                    onChange={(e) => setFormData({...formData, nom: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Adresse Email</label>
                <div className={styles.inputWrapper}>
                  <Mail size={16} className={styles.inputIcon} />
                  <input 
                    type="email" 
                    className={`${styles.input} ${styles.inputWithIcon}`}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Lien LinkedIn (Réseau Professionnel)</label>
                <div className={styles.inputWrapper}>
                  <Linkedin size={16} className={styles.inputIcon} />
                  <input 
                    type="url" 
                    className={`${styles.input} ${styles.inputWithIcon}`}
                    value={formData.linkedin}
                    placeholder="https://linkedin.com/in/votre-profil"
                    onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <button type="submit" className={styles.saveBtn} disabled={isSaving}>
              {isSaving ? "Enregistrement..." : saved ? <><Check size={18} /> Enregistré</> : <><Save size={18} /> Enregistrer les modifications</>}
            </button>
          </form>
        </motion.div>

        {/* Formulaire Sécurité */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={styles.sectionCard}
        >
          <h3 className={styles.sectionTitle}>
            <Shield size={20} className="text-primary" />
            Sécurité & Mot de passe
          </h3>
          
          <form onSubmit={handlePasswordSave}>
            <div className={styles.formGrid}>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Mot de passe actuel</label>
                <input 
                  type="password" 
                  className={styles.input}
                  value={passwords.current}
                  onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Nouveau mot de passe</label>
                <input 
                  type="password" 
                  className={styles.input}
                  value={passwords.new}
                  onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Confirmer le mot de passe</label>
                <input 
                  type="password" 
                  className={styles.input}
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <button type="submit" className={styles.saveBtn}>
              <Shield size={18} />
              Mettre à jour le mot de passe
            </button>
          </form>
        </motion.div>

      </div>
    </DashboardLayout>
  );
}
