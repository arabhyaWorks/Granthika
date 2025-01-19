import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { Building2, User, Lock } from "lucide-react";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // navigate('/dashboard');
  };

  return (
    <div className=" w-full min-h-screen flex">
      {/* Left Section - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16 bg-white">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            {/* <Building2 className="h-16 w-16 text-[#1e3a8a] mb-4" /> */}
            <h1
              style={{
                fontSize: "40px",
              }}
              className="font-extrabold text-gray-900 text-center"
            >
              Granthini Workbench
            </h1>

            <div className="flex align-center">
              <div className="flex justify-center items-center">
              <h1 className="font-semibold text-[#1e3a8a] text-2xl">
                Powered by
              </h1>
              </div>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/kathavachak-95a17.appspot.com/o/Bhashini.png?alt=media&token=052c833d-113a-4e7c-870d-abc239fbd68d"
                alt="Bhashini"
                className="w-32 object-contain"
              />
            </div>
            <p className="text-gray-600 mt-2 text-center">
              Welcome back! Please login to your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-[#1e3a8a] hover:text-blue-700"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#1e3a8a] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>

      {/* Right Section - Decorative */}
      <div className="hidden lg:block lg:w-1/2 bg-[#1e1e2d] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffa500] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-50"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
          <div className="max-w-md text-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/kathavachak-95a17.appspot.com/o/Bhashini-blob.png?alt=media&token=6792154e-7d6b-494d-9b6b-9248dadbabc9"
              alt="Office"
              className="w-100 h-100 object-contain rounded-sm shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}