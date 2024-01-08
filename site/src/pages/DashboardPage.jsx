import { useEffect, useState } from "react";
import { serverURL } from "../consts/consts";
import { useNavigate } from "react-router-dom";
import whiteGithubLogo from "../assets/github-mark-white.png";

export default function DashboardPage() {
  const [isSignedIn, setSignIn] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`${serverURL}/auth/profile`, {
        withCredentials: true,
        credentials: "include",
      });
      if (!response.ok) {
        setSignIn(false);
        return;
      }
      const data = await response.json();
      setUser(data);
      setSignIn(true);
    }
    fetchUser();
  }, []);

  async function logout() {
    const response = await fetch(`${serverURL}/auth/logout`, {
      method: "POST",
      withCredentials: true,
      credentials: "include",
    });
    if (!response) {
      return;
    }
    navigate("/");
  }

  return (
    <div
      className="p-5 bg-gradient-to-t from-pink-300 to-blue-500 h-screen flex  
    flex-col justify-center items-center"
    >
      {isSignedIn ? (
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-white text-6xl"> Welcome {user.username} </h1>
          <p className="text-white text-2xl">Email : {user.email}</p>
          <button
            className="w-9/12 border-2 rounded-md text-sky-50 shadow-md text-2xl"
            onClick={logout}
          >
            Log out
          </button>
        </div>
      ) : (
        <p className="text-white text-6xl">Bro stop looking at the code 😂</p>
      )}

      <div className="flex items-center gap-2 pb-16 absolute bottom-0">
        <a href="https://github.com/SLakehal27" target="_blank">
          <img
            className="w-9 hover:scale-110 transition"
            src={whiteGithubLogo}
            alt="GitHub Logo"
          ></img>
        </a>
        <p className="text-white text-3xl">Copyright © 2024 SLakehal27</p>
      </div>
    </div>
  );
}
