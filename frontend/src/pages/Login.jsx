// Login.jsx
import React, { useState } from "react";
import '../App.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    // Simple email pattern
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
    if (!re.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
        let res=await axios.post("https://saasnotes.onrender.com/auth/login",{email,password})
        console.log(res.data)
        if(!res.data.token)return alert("token not Present")
        localStorage.setItem("token",res.data.token)
        let user=JSON.stringify(res.data.user)
        localStorage.setItem("user",user)
        alert("login Sucessful")
        if(res.data.user.role=="Admin"){
            navigate('/admin')
        }
        else{
            navigate('/user')
        }
        
    } catch (error) {
        console.log(error)
    }
    // Mock submit - replace with your login logic
    // console.log({ email, password, remember });
    // alert("Logged in (mock). Replace with real auth.");
  };

  return (
    <div className="ml-container">
      <div className="ml-card">
        <div className="ml-aside">
          <div className="ml-brand">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor" />
            </svg>
            <h1>Notes</h1>
          </div>
          <p className="ml-aside-text">Welcome back! Enter your credentials to access your notes, collaborate with your team, and manage your workspace.</p>
          
        </div>

        <div className="ml-form-area">
          <h2>Sign in to your account</h2>
          <p className="ml-sub">Or <a href="#">create a free account</a></p>

          <form className="ml-form" onSubmit={handleSubmit} noValidate>
            {error && <div className="ml-error" role="alert">{error}</div>}

            <label className="ml-label">
              <span className="ml-label-text">Email</span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="ml-input"
                placeholder="you@domain.com"
                required
                aria-required="true"
              />
            </label>

            <label className="ml-label">
              <span className="ml-label-text">Password</span>
              <div className="ml-pass-row">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="ml-input ml-input-pass"
                  placeholder="Enter your password"
                  required
                  aria-required="true"
                />
                <button
                  type="button"
                  className="ml-toggle"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-pressed={showPassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>

            <div className="ml-row ml-row-between">
              <label className="ml-remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span>Remember me</span>
              </label>

              <a className="ml-forgot" href="#">Forgot?</a>
            </div>

            <button className="ml-submit" type="submit">Sign in</button>

            <div className="ml-or"> <span>or continue with</span></div>

            <div className="ml-socials">
              <button type="button" className="ml-social ml-google" aria-label="Sign in with Google">
                {/* Google svg */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12.23c0-.68-.06-1.33-.17-1.96H12v3.71h5.48c-.24 1.3-.98 2.4-2.09 3.14v2.62h3.37c1.97-1.81 3.11-4.49 3.11-7.51z" fill="#4285F4"/>
                  <path d="M12 22c2.7 0 4.97-.89 6.63-2.42l-3.37-2.62c-.93.62-2.12.98-3.26.98-2.5 0-4.61-1.68-5.37-3.94H3.12v2.48C4.75 19.69 8.11 22 12 22z" fill="#34A853"/>
                  <path d="M6.63 13.99A6.99 6.99 0 0 1 6 12c0-.66.11-1.3.31-1.91V7.61H3.12A10.01 10.01 0 0 0 2 12c0 1.64.39 3.19 1.12 4.61l3.51-2.62z" fill="#FBBC05"/>
                  <path d="M12 6.5c1.47 0 2.78.51 3.82 1.5l2.86-2.86C16.96 3.6 14.7 2.5 12 2.5 8.11 2.5 4.75 4.81 3.12 7.61l3.19 2.48C7.39 8.18 9.5 6.5 12 6.5z" fill="#EA4335"/>
                </svg>
                Google
              </button>

              <button type="button" className="ml-social ml-github" aria-label="Sign in with GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.01-2-3.2.7-3.88-1.4-3.88-1.4-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.73 1.26 3.4.97.11-.76.41-1.26.75-1.55-2.56-.29-5.26-1.28-5.26-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.19a11.06 11.06 0 0 1 5.79 0c2.2-1.5 3.16-1.19 3.16-1.19.64 1.57.24 2.73.12 3.02.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.27 5.68.42.36.8 1.07.8 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" fill="currentColor" />
                </svg>
                GitHub
              </button>
            </div>
          </form>

          <p className="ml-foot">By continuing, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.</p>
        </div>
      </div>
    </div>
  );
}
