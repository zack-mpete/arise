import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, Printer, ShieldCheck } from "lucide-react";
import styles from "../../style/css_modules/pages/dashboard/CertificateView.module.css";

// Mock des données du projet validé
const MOCK_VALIDATED_PROJECT = {
  id: "PROJ-2026-8891A",
  titre: "EcoTrack AI",
  entrepreneur: "Jean Dupont",
  date_validation: "2026-04-20",
  certificat_hash: "0x8f9a3e2b1c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f", // Simulation hash blockchain
};

export default function CertificateView() {
  const [, params] = useRoute("/dashboard/projects/:id/certificate");
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    // Dans une vraie app, fetch le projet par son ID et vérifier qu'il est validé
    setProject(MOCK_VALIDATED_PROJECT);
  }, [params?.id]);

  const handlePrint = () => {
    window.print();
  };

  if (!project) return <div>Chargement du certificat...</div>;

  return (
    <div className={styles.certificateContainer}>
      
      {/* En-tête des actions (Non imprimable) */}
      <div className={styles.actionHeader}>
        <Link href="/dashboard/projects" className={styles.backBtn}>
          <ArrowLeft size={18} />
          Retour aux projets
        </Link>
        <button className={styles.printBtn} onClick={handlePrint}>
          <Printer size={18} />
          Imprimer / Sauvegarder PDF
        </button>
      </div>

      {/* Document Officiel */}
      <div className={styles.certificateDocument}>
        <div className={styles.contentWrapper}>
          
          <div className={styles.certHeader}>
            <div className={styles.logo}>I</div>
            <h1 className={styles.certTitle}>Certificat d'Authenticité & Validation</h1>
            <p className={styles.certSubtitle}>Décerné par Innovation Hub</p>
          </div>

          <div className={styles.certBody}>
            <p>Nous soussignés, administrateurs de la plateforme Innovation Hub, certifions par la présente que le projet intitulé :</p>
            
            <span className={styles.highlight}>"{project.titre}"</span>
            
            <p>soumis par <strong style={{color: '#0f172a'}}>{project.entrepreneur}</strong>,</p>
            
            <p>a été formellement examiné et <strong>validé</strong> par notre comité d'évaluation.</p>
            
            <p style={{ marginTop: '24px', fontSize: '1rem', color: '#64748b' }}>
              Les documents de Propriété Intellectuelle (PI) associés ont été vérifiés.<br/>
              Ce projet est désormais éligible aux financements et partenariats sur notre réseau sécurisé.
            </p>
          </div>

          <div className={styles.certFooter}>
            <div className={styles.signatureBox} style={{ textAlign: 'left' }}>
              <p style={{ marginBottom: '8px', fontSize: '1rem', color: '#64748b' }}>Identifiant Unique :</p>
              <p style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#0f172a' }}>{project.id}</p>
              <p style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>Hash: {project.certificat_hash}</p>
            </div>
            
            <div className={styles.seal}>
              <div className={styles.sealInner}>
                <ShieldCheck size={24} style={{ marginBottom: '4px' }} />
                <span>PROJET<br/>VALIDÉ</span>
              </div>
            </div>

            <div className={styles.signatureBox}>
              <div className={styles.signatureLine}></div>
              <p style={{ fontSize: '1rem', color: '#64748b', marginTop: '8px' }}>L'Administration</p>
              <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Fait le {new Date(project.date_validation).toLocaleDateString()}</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
