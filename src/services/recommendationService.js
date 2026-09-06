import { apiFetch } from "./api";

export async function getRecommendedEvents() {
  return apiFetch("/recommendations");
}
