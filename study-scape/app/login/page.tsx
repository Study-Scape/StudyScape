'use client'

import { useState } from "react";
import { login, signup } from "./actions";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <h1>{isLogin ? "Log In" : "Sign Up"}</h1>
      
      <form>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />
        </div>
        
        {!isLogin && (
          <>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input id="username" name="username" type="text" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="first_name">First Name:</label>
              <input id="first_name" name="first_name" type="text" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="last_name">Last Name:</label>
              <input id="last_name" name="last_name" type="text" required />
            </div>
          </>
        )}
        
        {isLogin ? (
          <button type="submit" formAction={login}>Log In</button>
        ) : (
          <button type="submit" formAction={signup}>Sign Up</button>
        )}
        
        <p className="toggle-form">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)}
            className="toggle-button"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </p>
      </form>
    </div>
  );
}