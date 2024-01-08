import { useEffect, useState } from "react";
import { serverURL } from "../consts/consts";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  //TODO : Add conditionnal rendering.
  //TODO : Create logout button that makes the appropriate fetch req.
  const [isSignedIn, setSignIn] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`${serverURL}/auth/profile`, {
        withCredentials: true,
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      if (!response) {
        return;
      }
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
    <div className="p-5">
      {isSignedIn ? (
        <>
          <h1 className="text-sky-500 text-2xl"> Welcome {user.username} </h1>
          <p>Email : {user.email}</p>
          <button className="w-3/12 border-2 rounded-md" onClick={logout}>
            Log out
          </button>
        </>
      ) : (
        <p>No current users</p>
      )}
    </div>
  );
}
