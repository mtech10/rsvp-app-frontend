// import { apiFetch } from "./api";

// export async function getCategories() {
//   try {
//     const response = await apiFetch("/categories");

//     return response;
//   } catch (error) {
//     console.error("🔴 CATEGORY SERVICE: /categories failed:", error);

//     throw error;
//   }
// }

// src/services/categoryService.js

import { apiFetch } from "./api";

export async function getCategories() {
  return apiFetch("/categories");
}

export async function getFollowedCategories() {
  return apiFetch("/categories/followed");
}

export async function followCategory(categoryId) {
  return apiFetch(`/categories/${categoryId}/follow`, {
    method: "POST",
  });
}

export async function unfollowCategory(categoryId) {
  return apiFetch(`/categories/${categoryId}/follow`, {
    method: "DELETE",
  });
}
