const API_URL = "http://localhost:5000/api";

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Erreur API: ${response.status}`);
  }

  return response.json();
}

// Auth API
export const authApi = {
  login: (data: any) => apiRequest("/utilisateurs/login", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  signup: (data: any) => apiRequest("/utilisateurs", {
    method: "POST",
    body: JSON.stringify(data),
  }),
};

// Projects API
export const projectsApi = {
  getAll: (entrepreneurId?: string | number) => {
    const url = entrepreneurId ? `/projets?entrepreneur_id=${entrepreneurId}` : "/projets";
    return apiRequest(url);
  },
  getById: (id: string | number) => apiRequest(`/projets/${id}`),

  create: (data: any) => apiRequest("/projets", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  archive: (id: string | number, est_archive: boolean) => apiRequest(`/projets/${id}/archive`, {
    method: "PUT",
    body: JSON.stringify({ est_archive }),
  }),
};

// Opportunities API (Deal Flow)
export const opportunitiesApi = {
  getAll: () => apiRequest("/opportunites"),
};
