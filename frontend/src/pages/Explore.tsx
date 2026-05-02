import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Star, MessageCircle, Share2, 
  LayoutDashboard, Flame, Clock, Hash, X, User
} from "lucide-react";
import styles from "../style/css_modules/pages/Explore.module.css";
import { fetchProjets, toggleFavori } from "../lib/fonction";
import { CURRENT_USER } from "../lib/authMock";

// -- Données Mockées étendues avec images et détails --
const MOCK_PROJECTS = [
  { 
    projet_id: 1, 
    titre: "EcoTrack AI", 
    description: "Nous avons développé une application révolutionnaire de suivi de l'empreinte carbone personnelle propulsée par l'IA. Notre algorithme analyse vos achats via OpenBanking et vous suggère des alternatives écologiques. \n\nL'application est en phase Bêta avec déjà 5000 utilisateurs actifs. Nous cherchons un financement seed de 100K€ pour lancer la V1 officielle.", 
    statut: "En recherche de fonds",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=800",
    auteur: { nom: "Marie Dubois", avatar: "M" },
    date: "Il y a 2 heures",
    likes: 42,
    commentaires: [
      { id: 1, auteur: "Marc Invest", texte: "Super traction ! Quel est votre modèle de revenus ?" }
    ]
  },
  { 
    projet_id: 2, 
    titre: "MedChain Solutions", 
    description: "Sécurisation des dossiers médicaux partagés via une architecture Blockchain privée. Une solution B2B pour les hôpitaux et cliniques. Notre POC est terminé et validé par un hôpital partenaire.", 
    statut: "Validé",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    auteur: { nom: "Dr. Alain", avatar: "A" },
    date: "Hier",
    likes: 128,
    commentaires: []
  },
  { 
    projet_id: 3, 
    titre: "AgriSensor Pro", 
    description: "Capteurs IoT low-cost pour l'optimisation de l'irrigation agricole. Réduit la consommation d'eau de 30%.", 
    statut: "En cours",
    image: null,
    auteur: { nom: "AgriTech Dev", avatar: "AT" },
    date: "Il y a 3 jours",
    likes: 15,
    commentaires: [
      { id: 2, auteur: "Fonds Vert", texte: "Nous aimerions discuter d'un partenariat industriel." }
    ]
  },
];

const MotionAnimatePresence = AnimatePresence as any;

export default function Explore() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      // Simulation appel API avec fallback
      const data = await fetchProjets();
      if (data && data.length > 0) {
        setProjects(data.filter((p: any) => !p.est_archive)); // Ne pas afficher les projets archivés
      } else {
        setProjects(MOCK_PROJECTS);
      }
      setLoading(false);
    };
    loadProjects();
  }, []);

  const handleFavori = async (projetId: number) => {
    if (!CURRENT_USER.isLoggedIn) {
      alert("Veuillez vous connecter pour ajouter un favori.");
      return;
    }

    // Mise à jour optimiste de l'UI
    setProjects(currentProjects => currentProjects.map(p => {
      if (p.projet_id === projetId) {
        const isCurrentlyFav = p.isFavorite;
        return {
          ...p,
          likes: isCurrentlyFav ? Math.max(0, (p.likes || 1) - 1) : (p.likes || 0) + 1,
          isFavorite: !isCurrentlyFav
        };
      }
      return p;
    }));

    const result = await toggleFavori(projetId);
    if (!result) {
      // Rollback si erreur
      const data = await fetchProjets();
      if (data && data.length > 0) setProjects(data);
    }
  };

  // Déterminer le lien du dashboard en fonction du rôle
  const getDashboardLink = () => {
    if (!CURRENT_USER.isLoggedIn) return "/login";
    if (CURRENT_USER.role === "entrepreneur") return "/dashboard/projects";
    return "/dashboard"; // investisseur ou admin
  };

  return (
    <div className={styles.explorePage}>
      {/* Top Navbar Facebook-style */}
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <Link href="/" className={styles.logoIcon}>I</Link>
          <div className={styles.searchBox} style={{ margin: 0, padding: '8px 16px', height: '40px' }}>
            <Search size={18} className="text-muted-foreground" />
            <input type="text" placeholder="Rechercher..." className={styles.searchInput} style={{ padding: '0 8px' }} />
          </div>
        </div>
        <div className={styles.navRight}>
          {CURRENT_USER.isLoggedIn ? (
            <>
              <Link href={getDashboardLink()} className={styles.dashboardBtn}>
                <LayoutDashboard size={18} />
                <span className="hidden sm:inline">
                  {CURRENT_USER.role === 'entrepreneur' ? 'Mes Projets' : 'Mon Espace'}
                </span>
              </Link>
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                {CURRENT_USER.nom.charAt(0)}
              </div>
            </>
          ) : (
            <>
              <Link href="/login" style={{ color: 'var(--foreground)', fontWeight: 600 }}>Se connecter</Link>
              <Link href="/signup" className={styles.dashboardBtn}>Créer un compte</Link>
            </>
          )}
        </div>
      </nav>

      <div className={styles.layoutGrid}>
        {/* Colonne Gauche : Raccourcis / Filtres */}
        <div className={styles.sidebarLeft}>
          <div className={styles.menuItem}>
            <LayoutDashboard size={24} className={styles.menuIcon} />
            Fil d'actualité
          </div>
          <div className={styles.menuItem}>
            <Flame size={24} className={styles.menuIcon} />
            Populaires
          </div>
          <div className={styles.menuItem}>
            <Clock size={24} className={styles.menuIcon} />
            Récents
          </div>
          <hr style={{ borderTop: '1px solid var(--border)', margin: '12px 0' }} />
          <h4 style={{ padding: '0 12px', color: 'var(--muted-foreground)', fontSize: '0.875rem', fontWeight: 600 }}>Catégories</h4>
          <div className={styles.menuItem}><Hash size={20} className="text-muted-foreground" /> Tech & IA</div>
          <div className={styles.menuItem}><Hash size={20} className="text-muted-foreground" /> GreenTech</div>
          <div className={styles.menuItem}><Hash size={20} className="text-muted-foreground" /> Santé</div>
        </div>

        {/* Colonne Centrale : Feed (Fil d'actualité) */}
        <div className={styles.feed}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>Chargement du fil d'actualité...</div>
          ) : (
            projects.map((project, idx) => (
              <motion.div 
                key={project.projet_id} 
                className={styles.postCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {/* En-tête du post */}
                <div className={styles.postHeader}>
                  <div className={styles.postAvatar}>{project.auteur?.avatar || "A"}</div>
                  <div className={styles.postMeta}>
                    <div className={styles.postAuthor}>{project.auteur?.nom || "Auteur inconnu"}</div>
                    <div className={styles.postTime}>{project.date || "Récemment"} • {project.statut}</div>
                  </div>
                </div>

                {/* Contenu textuel */}
                <div className={styles.postContent}>
                  <h3 className={styles.postTitle}>{project.titre}</h3>
                  <p className={styles.postDesc}>{project.description}</p>
                </div>

                {/* Image du post */}
                {project.image && (
                  <img 
                    src={project.image} 
                    alt={project.titre} 
                    className={styles.postImage} 
                    onClick={() => setSelectedProject(project)}
                  />
                )}

                {/* Compteurs (Favoris/Commentaires) */}
                <div style={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between', color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={14} /> {project.likes || 0}</span>
                  <span style={{ cursor: 'pointer' }} onClick={() => setSelectedProject(project)}>
                    {project.commentaires?.length || 0} commentaires
                  </span>
                </div>

                {/* Boutons d'action (Style FB) */}
                <div className={styles.postActions}>
                  <button 
                    className={styles.actionBtn} 
                    onClick={() => handleFavori(project.projet_id)}
                    style={{ color: project.isFavorite ? '#eab308' : 'inherit' }}
                  >
                    <Star size={20} fill={project.isFavorite ? 'currentColor' : 'none'} /> Favori
                  </button>
                  <button className={styles.actionBtn} onClick={() => setSelectedProject(project)}><MessageCircle size={20} /> Commenter</button>
                  <button className={styles.actionBtn}><Share2 size={20} /> Partager</button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Colonne Droite : Widgets */}
        <div className={styles.sidebarRight}>
          <div className={styles.widget}>
            <h4 className={styles.widgetTitle}>Investisseurs Actifs</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">F</div>
                <span className="text-sm font-medium">Fonds Innovation</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">M</div>
                <span className="text-sm font-medium">Marc Business Angel</span>
              </div>
            </div>
          </div>
          
          <div className={styles.widget}>
            <h4 className={styles.widgetTitle}>À propos de Innovation Hub</h4>
            <p className="text-xs text-muted-foreground">La plateforme qui connecte les visionnaires avec le capital intelligent. © 2026</p>
          </div>
        </div>
      </div>

      {/* Modal / Popup pour voir les détails d'un projet */}
      <MotionAnimatePresence>
        {selectedProject && (
          <div className={styles.modalOverlay} onClick={() => setSelectedProject(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()} // Empêche la fermeture quand on clique dans la modale
            >
              <div className={styles.modalHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className={styles.postAvatar} style={{ width: '32px', height: '32px', fontSize: '0.875rem' }}>
                    {selectedProject.auteur?.avatar || "A"}
                  </div>
                  <h3 className={styles.postTitle} style={{ margin: 0 }}>{selectedProject.auteur?.nom || "Auteur"}</h3>
                </div>
                <button className={styles.closeBtn} onClick={() => setSelectedProject(null)}>
                  <X size={20} />
                </button>
              </div>
              
              <div className={styles.modalBody}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>{selectedProject.titre}</h2>
                {selectedProject.image && (
                  <img src={selectedProject.image} alt={selectedProject.titre} style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
                )}
                <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: 'var(--foreground)' }}>
                  {selectedProject.description}
                </p>
              </div>

              <div className={styles.modalComments}>
                <h4 style={{ fontWeight: 600, marginBottom: '16px' }}>Commentaires</h4>
                {selectedProject.commentaires && selectedProject.commentaires.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {selectedProject.commentaires.map((c: any) => (
                      <div key={c.id} style={{ backgroundColor: 'var(--card)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                        <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '4px' }}>{c.auteur}</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>{c.texte}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>Aucun commentaire pour le moment.</div>
                )}
                
                {/* Zone de saisie commentaire (Visuelle) */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '20px', alignItems: 'center' }}>
                  <div className={styles.postAvatar} style={{ width: '32px', height: '32px' }}>
                    {CURRENT_USER.isLoggedIn ? CURRENT_USER.nom.charAt(0) : <User size={16} />}
                  </div>
                  <input 
                    type="text" 
                    placeholder={CURRENT_USER.isLoggedIn ? "Écrire un commentaire..." : "Connectez-vous pour commenter"} 
                    disabled={!CURRENT_USER.isLoggedIn}
                    style={{ flex: 1, padding: '10px 16px', borderRadius: '20px', border: '1px solid var(--border)', background: 'var(--card)' }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </MotionAnimatePresence>

    </div>
  );
}
