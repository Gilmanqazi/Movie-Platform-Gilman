import { useState, useEffect } from "react";
import { useAuth } from "../Hook/useAuth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const { handleRegister } = useAuth();
  
  // Redux se state nikalna validation errors dikhane ke liye
  const { user, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await handleRegister(formData);
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  // Agar user successfully register ho jaye toh Home bhej do
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative overflow-hidden font-sans">
      
      {/* Background Glows (Login match karne ke liye) */}
      <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-red-900 rounded-full blur-[130px] opacity-30"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-red-700 rounded-full blur-[130px] opacity-20"></div>

      <div className="w-full max-w-md z-10 px-4">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white tracking-tighter italic">
            GIL<span className="text-red-600">VERSE.</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">Create your account to start watching</p>
        </div>

        <form
          onSubmit={submit}
          className="bg-gray-900/40 backdrop-blur-2xl p-8 rounded-3xl border border-white/5 shadow-2xl space-y-5"
        >
          <h2 className="text-xl font-bold text-white mb-2">Join the Verse</h2>

          {/* Backend Error Message (Mongoose validation etc) */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs p-3 rounded-xl animate-pulse">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Username Input */}
            <div>
              <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1 font-bold">Username</label>
              <input
                name="username"
                className="w-full mt-1 p-4 rounded-xl bg-gray-800/50 text-white border border-gray-700 outline-none focus:ring-2 focus:ring-red-600 transition-all placeholder-gray-600 text-sm"
                placeholder="Unique identifier"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1 font-bold">Email Address</label>
              <input
                name="email"
                type="email"
                className="w-full mt-1 p-4 rounded-xl bg-gray-800/50 text-white border border-gray-700 outline-none focus:ring-2 focus:ring-red-600 transition-all placeholder-gray-600 text-sm"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1 font-bold">Password</label>
              <input
                name="password"
                type="password"
                className="w-full mt-1 p-4 rounded-xl bg-gray-800/50 text-white border border-gray-700 outline-none focus:ring-2 focus:ring-red-600 transition-all placeholder-gray-600 text-sm"
                placeholder="Min. 8 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            disabled={loading}
            className={`w-full bg-red-600 hover:bg-red-700 active:scale-95 transition-all text-white p-4 rounded-xl font-bold shadow-lg shadow-red-900/20 mt-4 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <p className="text-center text-gray-500 mt-6 text-sm">
            Already a member?{" "}
            <button 
              type="button"
              onClick={() => navigate("/login")}
              className="text-white font-semibold hover:text-red-500 transition-colors"
            >
              Log in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;