import { Link } from "react-router-dom";
export default function MainPage() {
  return (
    <div className="p-5">
      <p>Logo</p>
      <h1 className="text-sky-500 text-2xl">Log in to your account</h1>
      <p>
        Don't have an account?{" "}
        <Link to="/signup" className="text-sky-400 hover:underline">
          {" "}
          Sign up!
        </Link>
      </p>
      <form className="flex flex-col">
        <div>
          <label htmlFor="user">Username</label>
          <input
            id="user"
            type="text"
            className="border-2 rounded-md w-3/12"
          ></input>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="border-2 rounded-md w-3/12"
          ></input>
        </div>
      </form>
    </div>
  );
}
