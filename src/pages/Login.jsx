// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { login as loginService, getCurrentUser } from "../services/authService";
// import AuthLayout from "../components/layouts/AuthLayout";
// import { motion } from "framer-motion";
// import { useSearchParams, useNavigate } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const returnTo = searchParams.get("returnTo");

//   const { login } = useAuth();
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       setError("");

//       const { token } = await loginService({
//         email,
//         password,
//       });

//       const user = await getCurrentUser(token);
//       login(user, token);

//       navigate("/");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthLayout title="Welcome Back" subtitle="Sign in to continue to RSVP">
//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* Email */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Email
//           </label>

//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black focus:border-transparent"
//           />
//         </div>

//         {/* Password */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Password
//           </label>

//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//             className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black focus:border-transparent"
//           />
//         </div>

//         {error && <p className="text-sm text-red-500">{error}</p>}

//         <motion.button
//           whileHover={{
//             scale: 1.02,
//           }}
//           whileTap={{
//             scale: 0.98,
//           }}
//           type="submit"
//           disabled={loading}
//           className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </motion.button>

//         <p className="text-center text-sm text-gray-600">
//           Don't have an account?{" "}
//           <Link
//             to="/register"
//             className="font-medium text-black hover:underline"
//           >
//             Register
//           </Link>
//         </p>
//       </form>
//     </AuthLayout>
//   );
// }

// Login.jsx

import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login as loginService, getCurrentUser } from "../services/authService";
import AuthLayout from "../components/layouts/AuthLayout";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const returnTo = searchParams.get("returnTo");

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const { token } = await loginService({
        email,
        password,
      });

      const user = await getCurrentUser(token);

      login(user, token);

      navigate(returnTo || "/", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to continue to RSVP">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-black"
            required
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-black hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
