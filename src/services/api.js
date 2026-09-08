// const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// export async function apiFetch(endpoint, options = {}) {
//   const token = localStorage.getItem("token");

//   const url = `${BASE_URL}${endpoint}`;

//   const response = await fetch(url, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",

//       ...(token && {
//         Authorization: `Bearer ${token}`,
//       }),

//       ...(options.headers || {}),
//     },
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Something went wrong");
//   }

//   return data;
// }

// src/services/api.js

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",

      ...(token && {
        Authorization: `Bearer ${token}`,
      }),

      ...(options.headers || {}),
    },
  });

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (response.status === 401) {
    const currentPath =
      window.location.pathname + window.location.search + window.location.hash;

    if (window.location.pathname !== "/login") {
      window.location.assign(
        `/login?returnTo=${encodeURIComponent(currentPath)}`,
      );
    }

    throw new Error("Authentication required.");
  }

  return data;
}
