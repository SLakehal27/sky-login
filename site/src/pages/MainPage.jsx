import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { serverURL } from "../consts/consts";

export default function MainPage() {
  //TODO : Prob remove redundant use of handleChange lol
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [warning, setWarning] = useState(false);

  function handleChange(event) {
    const currentInputs = { ...inputs };
    currentInputs[event.target.id] = event.target.value;
    console.log(currentInputs);
    setInputs(currentInputs);
  }
  return (
    <div className="flex flex-col gap-5 p-10">
      <p>Logo</p>
      <h1 className="text-sky-500 text-2xl">Log in to your account</h1>
      <p>
        Don't have an account?{" "}
        <Link to="/signup" className="text-sky-400 hover:underline">
          {" "}
          Sign up!
        </Link>
      </p>
      <form
        id="skysignin"
        className="flex flex-col gap-3"
        onSubmit={async (e) => {
          e.preventDefault();
          const data = await fetch(`${serverURL}/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs),
          });
          const response = await data.json();
          console.log(response);
          if (response.error === "Unauthorized") {
            setWarning(true);
            return;
          }
          setWarning(false);
          navigate("/dashboard");
        }}
      >
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            className="border-2 rounded-md w-3/12"
            onChange={handleChange}
            required
          ></input>
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="border-2 rounded-md w-3/12"
            onChange={handleChange}
            required
          ></input>
        </div>
      </form>

      <button form="skysignin" className="w-3/12 border-2 rounded-md">
        Sign In!
      </button>
    </div>
  );
}
