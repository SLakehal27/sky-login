import { useEffect, useState } from "react";
import { serverURL } from "../consts/consts";

export default function DashboardPage() {
  //TODO : Add conditionnal rendering.
  //TODO : Create logout button that makes the appropriate fetch req.
  const [isSignedIn, setSignIn] = useState(false);
  const [user, setUser] = useState({});
  useEffect(async () => {
    const response = await fetch(`${serverURL}/auth/profile`, {
      withCredentials: true,
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
  }, []);
  return <>{isSignedIn ? <p>{user.username}</p> : <p>No current users</p>}</>;
}
