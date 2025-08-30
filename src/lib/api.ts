export const API_BASE = 
  (import.meta as any).env?.VITE_API_URL || 
  "/api";

function getAuthHeader() {
  const token = localStorage.getItem("finos_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiGet(path: string) {
  const res = await fetch(`${API_BASE}${path}`, { headers: { ...getAuthHeader() } });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiPost(path: string, body: any) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiDelete(path: string) {
  const res = await fetch(`${API_BASE}${path}`, { method: "DELETE", headers: { ...getAuthHeader() } });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}