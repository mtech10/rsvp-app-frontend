// import { apiFetch } from "./api";

// export function register(userData) {
//   return apiFetch("/auth/register", {
//     method: "POST",
//     body: JSON.stringify(userData),
//   });
// }

// export function login(credentials) {
//   return apiFetch("/auth/login", {
//     method: "POST",
//     body: JSON.stringify(credentials),
//   });
// }

// export async function getCurrentUser(token) {
//   const data = await apiFetch("/auth/me", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return data.user;
// }

// authService.js

import { apiFetch } from "./api";

export function register(userData) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export function login(credentials) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function getCurrentUser(token) {
  const data = await apiFetch("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.user;
}
