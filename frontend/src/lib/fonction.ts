/**
 * Fichier utilitaire pour les interactions et la communication API
 */

import { getLoginUrl } from "../const";

/**
 * Redirige l'utilisateur vers le portail d'authentification
 */
export const handleLogin = (): void => {
  window.location.href = getLoginUrl();
};

/**
 * Interface pour la réponse de la liste d'attente
 */
interface WaitlistResponse {
  success: boolean;
  message: string;
}

/**
 * Fonction simulée pour envoyer un message de contact ou d'inscription
 */
export const subscribeToWaitlist = async (email: string): Promise<WaitlistResponse> => {
  console.log("Inscription à la liste d'attente pour:", email);
  // Simulation d'un appel API (Backend)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Merci ! Nous vous contacterons bientôt." });
    }, 1000);
  });
};

/**
 * Récupère les projets depuis le backend
 */
export const fetchProjets = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/api/projets`);
    if (!response.ok) throw new Error("Erreur lors de la récupération des projets");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Bascule l'état favori d'un projet
 */
export const toggleFavori = async (projetId: number, utilisateurId: number = 1): Promise<{ isFavorite: boolean, message: string } | null> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/api/projets/${projetId}/favori`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ utilisateur_id: utilisateurId })
    });
    if (!response.ok) throw new Error("Erreur lors de la modification des favoris");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Gère le défilement fluide vers une section
 */
export const scrollToSection = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
