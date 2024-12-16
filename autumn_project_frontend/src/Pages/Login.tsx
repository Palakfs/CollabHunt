import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../Redux/store';
import { userLogin } from "../features/thunks/userAuth";


const LoginPage = () => {
  const [userEnrol, setUserEnrol] = useState<string>(""); 
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error } = useSelector((state: RootState) => state.user);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(userLogin({ user_enrol : Number(userEnrol), password }))
      .unwrap()
      .then(() => {
        console.log("Login successful!");
        navigate("/events"); 
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userEnrol}
              onChange={(e) => setUserEnrol(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {loading && <p className="text-blue-500 mb-4">Logging you in...</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? "Processing..." : "LOGIN"}
            </button>
            <button
              className="bg-blue-200 hover:bg-blue-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => navigate("/signup")}
            >
              SIGN-UP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
