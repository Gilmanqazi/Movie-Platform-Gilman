import { useState, useEffect } from "react";
import { useAuth } from "../Hook/useAuth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {toast} from "react-toastify"


const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  
  
  // Redux state se user aur loading uthayenge
  const { user, loading } = useSelector((state) => state.auth);
  console.log(user)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin({ email, password });
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  
 
  useEffect(() => {
    if (!loading && user) {
      navigate("/", { replace: true });
    }
  }, [user, loading]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative overflow-hidden">
      
      {/* Background Glow Decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-red-900 rounded-full blur-[120px] opacity-30"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-red-600 rounded-full blur-[120px] opacity-20"></div>

      <form
        onSubmit={submit}
        className="bg-gray-900/50 backdrop-blur-xl p-10 rounded-3xl border border-gray-800 shadow-2xl w-full max-w-sm transform transition-all duration-500 hover:border-red-900/50"
      >
        <div className="mb-8 text-center">
          <h2 className="text-white text-4xl font-extrabold tracking-tight">
            Welcome <span className="text-red-500">Back</span>
          </h2>
          <p className="text-gray-400 mt-2 text-sm">Please enter your details</p>
        </div>

        <div className="space-y-4">
          <div className="group">
            <input
              className="w-full p-4 rounded-xl bg-gray-800/50 text-white border border-gray-700 outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
              placeholder="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="group">
            <input
              type="password"
              className="w-full p-4 rounded-xl bg-gray-800/50 text-white border border-gray-700 outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 mb-8">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="remember" className="accent-red-500 cursor-pointer" />
            <label htmlFor="remember" className="text-xs text-gray-400 cursor-pointer">Remember me</label>
          </div>
          <button type="button" className="text-xs text-red-500 hover:underline">Forgot Password?</button>
        </div>

        <button
          disabled={loading}
          className={`w-full bg-red-600 hover:bg-red-700 active:scale-95 transition-all text-white p-4 rounded-xl font-bold shadow-lg shadow-red-900/20 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-gray-500 mt-8 text-sm">
          Don't have an account?{" "}
          <button 
            type="button"
            onClick={() => navigate("/register")}
            className="text-white font-semibold hover:text-red-500 transition-colors"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;