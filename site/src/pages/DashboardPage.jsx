import { useState } from "react";

export default function DashboardPage() {
  //TODO : Add conditionnal rendering.
  //TODO : Create logout button that makes the appropriate fetch req.
  const [isSignedIn, setSignIn] = useState(false);
  return <p>No current users</p>;
}
