import React, { useState } from "react";
// import Layout from "../../components/Layout/Layout";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
// import "../../styles/AuthStyles.css"
import { useAuth } from "../context/Auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/org/org-login`,
        {
          email,
          password,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.org,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error(res.data.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen text-[white] font-semibold">
      <div className="bg-blue-500 rounded-md h-90% w-90% mx-10 my-10 px-11 py-11 shadow-2xl">
        <form
          onSubmit={handleSubmit}
          className="gradient_bg py-3 rounded-lg flex flex-col px-5"
        >
          <h1 className="-translate-y-9 text-5xl font-extrabold flex justify-center text_shadow text-white ">
            LOGIN
          </h1>
          <div>
            {/* <label>email</label> */}
            <input
              value={email}
              type="email"
              placeholder="Email"
              className="bg-transparent outline-none placeholder:text-white text-xl py-2 border-b-2 my-2"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            {/* <label>Password</label> */}
            <input
              value={password}
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none placeholder:text-white text-xl py-2 border-b-2 my-2"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#1a1635] px-3 py-2 rounded-md mt-5 mb-2  hover:text-slate-900 hover:bg-blue-400"
          >
            Login
          </button>
        </form>

        <br />
        <p className="flex  justify-center items-center">
          Don't have an account?{" "}
          <Link to="/signup" className="px-2  hover:text-slate-900">
            {" "}
            Signup{" "}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
