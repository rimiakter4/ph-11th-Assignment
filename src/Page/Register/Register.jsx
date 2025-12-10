
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import { updateProfile } from "firebase/auth";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";

export default function Register() {
  const { creatUser, setUser, googlelogin } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordError("Length must be at least 6 characters");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Must include at least one uppercase letter");
      return false;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError("Must include at least one lowercase letter");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const role = form.role.value;
    const status = "pending";
    const password = form.password.value;

    if (!validatePassword(password)) return;

    creatUser(email, password)
      .then((result) => {
        const loggedUser = result.user;

        updateProfile(loggedUser, {
          displayName: name,
          photoURL: photo,
        }).then(() => {
          setUser({ ...loggedUser, displayName: name, photoURL: photo });

          const newUser = { name, email, photo, role, status };

          fetch("http://localhost:5174/users", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newUser),
          });

          toast.success("Registration Successful!");
          form.reset();
          navigate("/");
        });
      })
      .catch((error) => toast.error(error.message));
  };

  const handleGoogle = () => {
    googlelogin()
      .then((result) => {
        const user = result.user;

        const newUser = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          role: "buyer",
          status: "pending",
        };

        fetch("http://localhost:5174/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newUser),
        });

        toast.success("Logged in with Google!");
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-indigo-100  to-purple-100 px-4 py-20">

  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="backdrop-blur-xl bg-white/30 p-10 rounded-3xl shadow-2xl w-full max-w-lg border border-white/40"
  >
    <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-8 drop-shadow">
      Register your account
    </h2>

    <form onSubmit={handleRegister} className="space-y-5">
      
      {/* Name */}
      <div>
        <label className="font-semibold text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          required
          placeholder="Enter your name"
          className="w-full mt-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Photo */}
      <div>
        <label className="font-semibold text-gray-700">Photo URL</label>
        <input
          type="text"
          name="photo"
          placeholder="Photo URL"
          className="w-full mt-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Email */}
      <div>
        <label className="font-semibold text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          className="w-full mt-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Role */}
      <div>
        <label className="font-semibold text-gray-700">Role</label>
        <select
          name="role"
          required
          className="w-full mt-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option value="buyer">Buyer</option>
          <option value="manager">Manager</option>
        </select>
      </div>

      {/* Password */}
      <div>
        <label className="font-semibold text-gray-700">Password</label>
        <div className="relative mt-1">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            placeholder="Enter your password"
            className="w-full px-4 py-3 pr-10 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {passwordError && (
          <p className="text-red-600 text-sm mt-1">{passwordError}</p>
        )}
      </div>

      {/* Register Button */}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
      >
        Register
      </button>
    </form>

    {/* Divider */}
    <div className="text-center my-6 text-gray-600 font-semibold">OR</div>

    {/* Google Button */}
    <button
      onClick={handleGoogle}
      className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 border py-3 rounded-xl hover:bg-gray-100 transition font-semibold"
    >
      <FaGoogle className="text-xl" />
      Continue with Google
    </button>

    {/* Login Link */}
    <p className="mt-6 text-center text-gray-700">
      Already have an account?{" "}
      <Link to="/login" className="text-indigo-600 font-bold hover:underline">
        Login
      </Link>
    </p>

  </motion.div>
</div>

  );
}
