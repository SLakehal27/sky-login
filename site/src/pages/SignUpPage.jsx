import { useState } from "react";
import { Link } from "react-router-dom";
import { serverURL } from "../consts/consts";

export default function SignUpPage() {
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

  async function getUsers() {
    console.log(serverURL);
    await fetch(`${serverURL}/users`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  }

  return (
    <div className="flex flex-col gap-5 p-10">
      <p>Logo</p>

      <div>
        <h1 className="text-sky-500 text-2xl">Create your account!</h1>
        <p>
          Have an account?{" "}
          <Link to="/" className="text-sky-400 hover:underline">
            {" "}
            Log in!
          </Link>
        </p>
      </div>

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

          await fetch(`${serverURL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          })
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
            })
            .then((json) => {
              console.log(json);
            });
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
    </div>
  );
}
