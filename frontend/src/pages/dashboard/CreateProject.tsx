import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { UploadCloud, File, X, Send, Info, Lock } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout";
import styles from "../../style/css_modules/pages/dashboard/CreateProject.module.css";

export default function CreateProject() {
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // États du formulaire
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState("tech");
  
  // États pour les fichiers
  const [certificatFile, setCertificatFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!certificatFile) {
      alert("Le certificat de propriété intellectuelle est obligatoire pour valider le projet.");
      return;
    }

    setIsSubmitting(true);

    try {
      // -------------------------------------------------------------
      // PRÉPARATION POUR LE BACKEND (Multipart form-data)
      // -------------------------------------------------------------
      const formData = new FormData();
      formData.append("titre", titre);
      formData.append("description", description);
      formData.append("categorie", categorie);
      // Simule l'ID de l'entrepreneur connecté
      formData.append("entrepreneur_id", "1"); 
      
      // Ajout des fichiers
      if (certificatFile) formData.append("certificat_pi", certificatFile);
      if (imageFile) formData.append("image_couverture", imageFile);

      /* Décommentez ceci pour connecter au vrai backend
      const response = await fetch("http://localhost:3000/api/projets", {
        method: "POST",
        body: formData,
        // Ne PAS définir le Content-Type manuellement avec fetch() + FormData, 
        // le navigateur le fera avec le bon "boundary"
      });

      if (!response.ok) throw new Error("Erreur de création");
      const result = await response.json();
      */

      // Simulation d'attente réseau
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert("Projet soumis avec succès ! Il est en attente de validation par un administrateur.");
      setLocation("/dashboard/projects");

    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue lors de la soumission du projet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout title="Soumettre un projet">
      <div className={styles.createContainer}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Nouveau projet d'innovation</h1>
          <p className={styles.pageDesc}>
            Détaillez votre projet. Une fois soumis, il sera examiné par notre équipe avant d'être publié.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.formCard}>
          
          {/* Section 1 : Informations Générales */}
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>
              <Info size={20} className="text-primary" />
              Informations Générales
            </h2>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Titre du projet *</label>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="Ex: EcoTrack AI"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Catégorie</label>
              <select 
                className={styles.input}
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
              >
                <option value="tech">Tech & IA</option>
                <option value="eco">GreenTech & Écologie</option>
                <option value="health">Santé & MedTech</option>
                <option value="finance">FinTech</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Image de couverture (Optionnel)</label>
              {imageFile ? (
                <div className={styles.filePreview}>
                  <div className={styles.fileName}>
                    <File size={16} /> {imageFile.name}
                  </div>
                  <button type="button" className={styles.removeFileBtn} onClick={() => setImageFile(null)}>
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className={styles.uploadArea}>
                  <input 
                    type="file" 
                    className={styles.fileInput} 
                    accept="image/*"
                    onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
                  />
                  <UploadCloud size={32} className={styles.uploadIcon} />
                  <div className={styles.uploadText}>Cliquez ou glissez une image ici</div>
                  <div className={styles.uploadSubtext}>Format PNG, JPG (Max 5Mo)</div>
                </div>
              )}
            </div>
          </div>

          {/* Section 2 : Détails */}
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Détails du projet</h2>
            <div className={styles.formGroup}>
              <label className={styles.label}>Description complète *</label>
              <textarea 
                className={styles.textarea} 
                placeholder="Décrivez votre innovation, le problème résolu, votre marché cible..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Section 3 : PI & Sécurité */}
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>
              <Lock size={20} className="text-primary" />
              Propriété Intellectuelle
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginBottom: '16px' }}>
              Pour garantir la sécurité de l'écosystème, vous devez fournir une preuve de dépôt (Brevet, Enveloppe Soleau, etc.).
            </p>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Certificat PI (PDF) *</label>
              {certificatFile ? (
                <div className={styles.filePreview}>
                  <div className={styles.fileName}>
                    <File size={16} /> {certificatFile.name}
                  </div>
                  <button type="button" className={styles.removeFileBtn} onClick={() => setCertificatFile(null)}>
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className={styles.uploadArea}>
                  <input 
                    type="file" 
                    className={styles.fileInput} 
                    accept=".pdf"
                    onChange={(e) => e.target.files && setCertificatFile(e.target.files[0])}
                  />
                  <UploadCloud size={32} className={styles.uploadIcon} />
                  <div className={styles.uploadText}>Uploader le certificat officiel</div>
                  <div className={styles.uploadSubtext}>Document PDF uniquement</div>
                </div>
              )}
            </div>
          </div>

          <div className={styles.formActions}>
            <button 
              type="button" 
              className={styles.cancelBtn}
              onClick={() => setLocation("/dashboard/projects")}
            >
              Annuler
            </button>
            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              <Send size={18} />
              {isSubmitting ? "Soumission en cours..." : "Soumettre le projet"}
            </button>
          </div>

        </form>
      </div>
    </DashboardLayout>
  );
}
