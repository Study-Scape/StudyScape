'use client'

import { useState } from "react";
import { login, signup } from "./actions";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {isLogin ? "Log In" : "Sign Up"}
          </h1>
        </div>

        <div className="px-8 py-6 bg-gray-50">
          <form>
            <div className="form-group mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full p-2 text-sm text-gray-700 border border-gray-200 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password (Must be at least 6 characters long):
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full p-2 text-sm text-gray-700 border border-gray-200 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {!isLogin && (
              <>
                <div className="form-group mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username:
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="block w-full p-2 text-sm text-gray-700 border border-gray-200 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                    First Name:
                  </label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    required
                    className="block w-full p-2 text-sm text-gray-700 border border-gray-200 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                    Last Name:
                  </label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    required
                    className="block w-full p-2 text-sm text-gray-700 border border-gray-200 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </>
            )}

            {isLogin ? (
              <Button
                type="submit"
                formAction={login}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Log In
              </Button>
            ) : (
              <Button
                type="submit"
                formAction={signup}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Sign Up
              </Button>
            )}
          </form>

          <p className="mt-4 text-sm text-gray-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-600 hover:text-indigo-700 transition duration-300"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
