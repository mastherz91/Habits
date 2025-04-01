'use client';

import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchHabitsThunk } from "../features/habitSlice";
import { fetchRegisterUser, fetchLoginUserThunk } from "@/features/user/userSlice";
import { RootState, AppDispatch } from "@/Redux/store";
import Habits from "./habits"
import { getCookie } from "cookies-next";

export default function Home() {
  const dispatch = useDispatch();
  const habits = useSelector((state) => state.habits.habits);
  const habitStatus = useSelector((state) => state.habits.loading);
  const [unername, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      dispatch(fetchHabitsThunk(token));
    }
  }
    , [dispatch, user]);

  const handleRegister = async (e) => {
    dispatch(fetchRegisterUser({ username, password }));
  }
  const handleLogin = async (e) => {
    dispatch(fetchLoginUserThunk({ username, password }));
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-black"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-black"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleLogin}
            className="py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Login
          </button>

          <button
            onClick={() => window.location.href = '/register'}
            className="py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

