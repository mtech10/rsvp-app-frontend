import { apiFetch } from "./api";

export async function getCategories() {
  try {
    const response = await apiFetch("/categories");

    return response;
  } catch (error) {
    console.error("🔴 CATEGORY SERVICE: /categories failed:", error);

    throw error;
  }
}
