import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { serverURL } from "../consts/consts";
import github from "../assets/github-mark.png";

export default function MainPage() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [warning, setWarning] = useState(false);

  function handleChange(event) {
    const currentInputs = { ...inputs };
    currentInputs[event.target.id] = event.target.value;
    setInputs(currentInputs);
  }
  return (
    <div className="flex flex-col gap-5 p-10">
      <p className="font-salsa text-indigo-600 text-2xl">Sky-Login</p>
      <h1 className="text-indigo-500 text-3xl">Log in to your account</h1>
      <p className="text-lg">
        Don't have an account?{" "}
        <Link to="/signup" className="text-indigo-400 hover:underline">
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
            withCredentials: true,
            credentials: "include",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs),
          });
          const response = await data.json();
          if (response.error === "Unauthorized") {
            setWarning(true);
            return;
          }
          setWarning(false);
          navigate("/dashboard");
        }}
      >
        <div className="flex flex-col">
          <label className="text-lg text-indigo-600" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="border-2 rounded-md w-3/12 border-indigo-400 border-indigo-400"
            onChange={handleChange}
            required
          ></input>
        </div>

        <div className="flex flex-col">
          <label className="text-lg text-indigo-600" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="border-2 rounded-md w-3/12 border-indigo-400"
            onChange={handleChange}
            required
          ></input>
        </div>
      </form>
      <button
        form="skysignin"
        className="w-3/12 border-2 rounded-md border-indigo-400 text-lg mt-4 text-indigo-60"
      >
        Sign In!
      </button>

      <div className="pt-4">
        <p>
          Photo by{" "}
          <a
            className="text-indigo-400 hover:underline"
            href="https://unsplash.com/photos/sunset-over-horizon-zc5_p_31U5g"
            target="_blank"
          >
            Joel Henry
          </a>
        </p>
        <p>
          Favicon by{" "}
          <a
            className="text-indigo-400 hover:underline"
            target="_blank"
            href="https://icons8.com/icon/d_2fCSrKs9Vc/flying-duck"
          >
            Icons8
          </a>
        </p>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <a href="https://github.com/SLakehal27" target="_blank">
          <img
            className="w-10 hover:scale-110 transition"
            src={github}
            alt="GitHub Logo"
          ></img>
        </a>
        <p>Copyright © 2024 SLakehal27</p>
      </div>
    </div>
  );
}
