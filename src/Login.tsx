import React from "react";
import { AuthResponse } from "./models/authResponse";
import { api } from "./utils/api";
import { useNavigate } from "react-router-dom";

function Login() {
  
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    api<undefined>({
      url: "/api/auth/login",
      body: { username, password },
      method: "POST",
    })
      .then((response) => {
        navigate("/dashboard");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleRegister = () => {
    api<undefined>({
      url: "/api/auth/register",
      body: { username, password },
      method: "POST",
    })
      .then((response) => {
        navigate("/dashboard");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-slate-800 py-6 px-4 flex flex-col rounded-xl w-1/3 shadow-rose-200 shadow-2xl">
        <div className="text-center pb-4">
          <h1 className="text-2xl font-bold text-rose-200">Please login</h1>
        </div>
        <input
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          className="bg-slate-700 py-1 px-2 rounded-lg mb-2 text-rose-500"
        />
        <input
          value={password}
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="bg-slate-700 py-1 px-2 rounded-lg"
        />

        <div className="flex pt-4 justify-center">
          <div className="px-2">
            <button
              className="bg-rose-200 text-slate-800 px-6 py-2 rounded-lg hover:bg-rose-300 hover:text-slate-600"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <div className="px-2">
            <button
              className="bg-rose-200 text-slate-800 px-6 py-2 rounded-lg hover:bg-rose-300 hover:text-slate-600"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
