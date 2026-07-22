import { useState, useRef } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../../services/auth";
import axios from "axios";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState<"email" | "password" | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);
  const navigate = useNavigate();
  
  // 1. Create a reference for the password input
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);
    setMessage("");
    setMessageType(null);

    try {
      const data = await signIn({
        email,
        password,
      });

      //save JWT token
      localStorage.setItem("token", data.data.token);

      //save user information
      localStorage.setItem("user", JSON.stringify(data.data.user));

      setMessage(data.message ?? "Signed in successfully");
      setMessageType("success");
      
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate("/dashboard");

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;

        const message =
          data?.errors?.[0]?.message ??
          data?.message ??
          "Something went wrong";

        setMessage(message);
        setMessageType("error");
        setTimeout(() => {
          setMessage("");
          setMessageType(null);
        }, 1500);
      } else {
        setMessage("Something went wrong");
        setMessageType("error");
        setTimeout(() => {
          setMessage("");
          setMessageType(null);
        }, 1500);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
        <h1 className="text-5xl md:text-5xl pt-1 font-bold font-medium text-[#1A1A1A] text-shadow-blue-800 tracking-tight mb-3">
          Welcome Back!
        </h1>

        {/* Email */}
        <div
          className="flex items-center gap-3 rounded-2xl border border-[#E0DDD6] bg-white px-4 h-[54px] shadow-sm transition-colors"
          style={{
            borderColor: focusedField === "email" ? "#5B8CFF" : "#E0DDD6",
            boxShadow: focusedField === "email" ? "0 0 0 2px #DCE8FF" : undefined,
          }}
        >
          <Mail size={18} className="shrink-0 text-[#6B6B6B]" />
          <div className="w-px h-5 bg-[#E0DDD6]" />
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField((current) => (current === "email" ? null : current))}
            // 2. Add an onKeyDown handler to intercept the Enter key
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Prevent the form from submitting
                passwordRef.current?.focus(); // Move focus to the password field
              }
            }}
            className="flex-1 bg-transparent text-[15px] text-[#1A1A1A] placeholder:text-[#B0ADA6] outline-none"
          />
        </div>

        {/* Password */}
        <div
          className="flex items-center gap-3 rounded-2xl border border-[#E0DDD6] bg-white px-4 h-[54px] shadow-sm transition-colors"
          style={{
            borderColor: focusedField === "password" ? "#5B8CFF" : "#E0DDD6",
            boxShadow: focusedField === "password" ? "0 0 0 2px #DCE8FF" : undefined,
          }}
        >
          <Lock size={18} className="shrink-0 text-[#3B5C2F]" />
          <div className="w-px h-5 bg-[#E0DDD6]" />
          <input
            // 3. Attach the ref to the password input
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField((current) => (current === "password" ? null : current))}
            className="flex-1 bg-transparent text-[15px] text-[#1A1A1A] placeholder:text-[#B0ADA6] outline-none"
          />
          <button
            onClick={() => setShowPassword((p) => !p)}
            className="shrink-0 text-[#B0ADA6] transition-colors hover:text-[#6B6B6B]"
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>

        {message && (
          <div
            className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
              messageType === "success"
                ? "border-green-300 bg-green-50 text-green-700"
                : "border-red-300 bg-red-50 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Sign In Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-[54px] bg-[#2D4A24] hover:bg-[#3B5C2F] active:scale-[0.98] transition-all rounded-2xl text-white text-[16px] font-bold tracking-wide shadow-md mt-1 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-[#2D4A24] disabled:active:scale-100"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-1">
          <div className="flex-1 h-px bg-[#E8E6E0]" />
          <span className="text-[13px] text-[#9E9B94]">or</span>
          <div className="flex-1 h-px bg-[#E8E6E0]" />
        </div>

        {/* Social */}
        <div className="flex items-center justify-center gap-5">
          <button
            type="button"
            className="w-full h-14 rounded-2xl bg-white border border-[#E8E6E0] shadow-sm flex items-center justify-center hover:shadow-md transition-shadow"
            aria-label="Sign in with Google"
          >
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-gray-700 pl-6 font-medium text-base">
              Sign in with Google
            </span>
          </button>
        </div>

        {/* Sign in */}
        <p className="text-center text-[14px] text-[#6B6B6B] mt-2">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-bold text-[#E8863A] hover:opacity-80 transition-opacity"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
