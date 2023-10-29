import React from "react";
import authStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const store = authStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await store.login();

    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <div className="text-3xl flex items-center justify-center">Login</div>
        <form onSubmit={handleLogin}>
          <input
            onChange={store.updateLoginForm}
            value={store.LoginForm.email}
            type="email"
            name="email"
            className="border-2 flex  h-full my-2 rounded-xl p-3 w-full"
          placeholder="Body..."
          />
          <input
            onChange={store.updateLoginForm}
            value={store.LoginForm.password}
            type="password"
            name="password"
            className="border-2 flex  h-full my-2 rounded-xl p-3 w-full"
          placeholder="Body..."
          />
          <button type="submit" className="border-2 flex w-full h-full rounded-xl p-3 items-center justify-center font-bold bg-purple-400">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
