import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { serverURL } from "../consts/consts";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    user: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [warning, setWarning] = useState(false);

  function handleChange(event) {
    const currentInputs = { ...inputs };
    currentInputs[event.target.id] = event.target.value;
    console.log(currentInputs);
    setInputs(currentInputs);
  }

  async function login(userData) {
    const response = await fetch(`${serverURL}/auth/signin`, {
      withCredentials: true,
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-5 p-10">
      <p className="font-salsa text-indigo-600 text-2xl">Sky-Login</p>
      <h1 className="text-indigo-500 text-3xl">Create your account!</h1>
      <p>
        Have an account?{" "}
        <Link to="/" className="text-indigo-400 hover:underline">
          {" "}
          Log in!
        </Link>
      </p>

      <form
        id="skysignup"
        className="flex flex-col gap-3"
        onSubmit={async (e) => {
          e.preventDefault();
          if (inputs.password != inputs.cpassword) {
            const warning = document.getElementById("warning");
            warning.classList.remove("hidden");
            setWarning(true);
            return;
          }
          const userData = {
            username: inputs.user,
            password: inputs.password,
            email: inputs.email,
          };

          const response = await fetch(`${serverURL}/auth/signup`, {
            withCredentials: true,
            credentials: "include",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          });

          if (response.error === "Unauthorized") {
            navigate("/");
            return;
          }
          await login(userData);
          navigate("/dashboard");
        }}
      >
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            id="user"
            type="text"
            className="border-2 rounded-md w-3/12"
            onChange={handleChange}
            required
          ></input>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="border-2 rounded-md w-3/12"
            onChange={handleChange}
            required
          ></input>
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          {!warning ? (
            <input
              id="password"
              type="password"
              className="border-2 rounded-md w-3/12"
              onChange={handleChange}
              required
            ></input>
          ) : (
            <input
              id="password"
              type="password"
              className="border-2 rounded-md w-3/12 border-red-500"
              onChange={handleChange}
              required
            ></input>
          )}
          <p id="warning" className="hidden text-red-500 font-medium">
            Passwords do not match
          </p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="cpassword">Confirm Password</label>
          {!warning ? (
            <input
              id="cpassword"
              type="password"
              className="border-2 rounded-md w-3/12"
              onChange={handleChange}
              required
            ></input>
          ) : (
            <input
              id="cpassword"
              type="password"
              className="border-2 rounded-md w-3/12 border-red-500"
              onChange={handleChange}
              required
            ></input>
          )}
        </div>
      </form>
      <button form="skysignup" className="w-3/12 border-2 rounded-md">
        Sign Up!
      </button>

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

      <p>SLakehal27 2024</p>
    </div>
  );
}
