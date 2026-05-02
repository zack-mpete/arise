import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Plus, Edit2, Trash2, FolderOpen, ShieldCheck, Loader2, Archive, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import DashboardLayout from "../../components/DashboardLayout";
import styles from "../../style/css_modules/pages/dashboard/Projects.module.css";
import { projectsApi } from "../../lib/api";

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<"active" | "archived">("active");
  const [, setLocation] = useLocation();

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        const data = await projectsApi.getAll(user.utilisateur_id);
        setProjects(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des projets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleArchive = async (id: number, est_archive: boolean) => {
    try {
      await projectsApi.archive(id, est_archive);
      fetchProjects();
    } catch (error) {
      console.error("Erreur lors de l'archivage:", error);
    }
  };

  const getStatusClass = (status: string) => {
    if (!status) return '';
    switch(status.toLowerCase()) {
      case 'validé': return styles['status-approved'];
      case 'en attente': return styles['status-pending'];
      default: return '';
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout title="Mes Projets">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <Loader2 className="animate-spin" size={48} color="var(--primary)" />
        </div>
      </DashboardLayout>
    );
  }


  return (
    <DashboardLayout title="Mes Projets">
      <div className={styles.pageHeader}>
        <p style={{ color: 'var(--muted-foreground)' }}>Gérez vos projets d'innovation soumis sur la plateforme.</p>
        <Link href="/dashboard/projects/new">
          <a className={styles.createBtn}>
            <Plus size={20} />
            Soumettre un projet
          </a>
        </Link>
      </div>

      {/* FAB for Mobile */}
      <motion.button 
        className={styles.fab}
        whileTap={{ scale: 0.9 }}
        onClick={() => setLocation("/dashboard/projects/new")}
      >
        <Plus size={24} />
      </motion.button>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', borderBottom: '1px solid var(--border)' }}>
        <button 
          onClick={() => setView("active")}
          style={{ 
            padding: '8px 16px', 
            borderBottom: view === 'active' ? '2px solid var(--primary)' : 'none',
            color: view === 'active' ? 'var(--primary)' : 'var(--muted-foreground)',
            fontWeight: 600,
            background: 'none',
            cursor: 'pointer'
          }}
        >
          Actifs
        </button>
        <button 
          onClick={() => setView("archived")}
          style={{ 
            padding: '8px 16px', 
            borderBottom: view === 'archived' ? '2px solid var(--primary)' : 'none',
            color: view === 'archived' ? 'var(--primary)' : 'var(--muted-foreground)',
            fontWeight: 600,
            background: 'none',
            cursor: 'pointer'
          }}
        >
          Archivés
        </button>
      </div>

      {projects.filter(p => !!p.est_archive === (view === 'archived')).length > 0 ? (
        <>
          {/* Card View - Mobile */}
          <div className={styles.mobileCards}>
            {projects.filter(p => !!p.est_archive === (view === 'archived')).map((project, index) => (
              <motion.div 
                key={project.id} 
                className={styles.projectCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={styles.cardHeader}>
                  <h3 className={styles.projectTitle}>{project.titre}</h3>
                  <span className={`${styles.statusBadge} ${getStatusClass(project.statut)}`}>
                    {project.statut}
                  </span>
                </div>
                <p className={styles.projectDesc}>{project.description}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.dateLabel}>{project.date}</span>
                  <div className={styles.cardActions}>
                    {project.statut.toLowerCase() === 'validé' && (
                      <Link href={`/dashboard/projects/${project.id}/certificate`}>
                        <button className={styles.actionBtn} title="Certificat" style={{ color: '#10b981' }}>
                          <ShieldCheck size={18} />
                        </button>
                      </Link>
                    )}
                    <button className={styles.actionBtn} title="Modifier">
                      <Edit2 size={18} />
                    </button>
                    <button 
                      className={styles.actionBtn} 
                      title={project.est_archive ? "Désarchiver" : "Archiver"}
                      onClick={() => handleArchive(project.projet_id || project.id, !project.est_archive)}
                    >
                      {project.est_archive ? <RotateCcw size={18} /> : <Archive size={18} />}
                    </button>
                    <button className={styles.actionBtn} title="Supprimer">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Table View - Desktop */}
          <div className={styles.projectsTableContainer}>
            <table className={styles.projectsTable}>
              <thead>
                <tr>
                  <th>Projet</th>
                  <th>Statut</th>
                  <th>Date</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.filter(p => !!p.est_archive === (view === 'archived')).map((project) => (
                  <tr key={project.projet_id || project.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{project.titre}</div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--muted-foreground)' }}>{project.description}</div>
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${getStatusClass(project.statut)}`}>
                        {project.statut}
                      </span>
                    </td>
                    <td>{project.date}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        {project.statut.toLowerCase() === 'validé' && (
                          <Link href={`/dashboard/projects/${project.id}/certificate`}>
                            <button className={styles.actionBtn} title="Certificat" style={{ color: '#10b981' }}>
                              <ShieldCheck size={18} />
                            </button>
                          </Link>
                        )}
                        <button className={styles.actionBtn} title="Modifier">
                          <Edit2 size={18} />
                        </button>
                        <button 
                          className={styles.actionBtn} 
                          title={project.est_archive ? "Désarchiver" : "Archiver"}
                          onClick={() => handleArchive(project.projet_id || project.id, !project.est_archive)}
                        >
                          {project.est_archive ? <RotateCcw size={18} /> : <Archive size={18} />}
                        </button>
                        <button className={styles.actionBtn} title="Supprimer">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className={styles.emptyState}>
          <FolderOpen size={48} style={{ opacity: 0.5, marginBottom: '16px' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--foreground)', marginBottom: '8px' }}>Aucun projet</h3>
          <p>Vous n'avez pas encore soumis de projet. Commencez dès maintenant !</p>
          <Link href="/dashboard/projects/new">
            <a className={styles.createBtn} style={{ marginTop: '24px', textDecoration: 'none', display: 'flex' }}>
              <Plus size={20} />
              Créer mon premier projet
            </a>
          </Link>
        </div>
      )}
    </DashboardLayout>
  );
}
