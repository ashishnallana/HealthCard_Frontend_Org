import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
// import Layout from "../../components/Layout/Layout";
import { useAuth } from "../context/Auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [mci, setMci] = useState("");
  const [rci, setRci] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/org/org-register`,
        {
          email,
          password,
          name,
          city,
          address,
          mci,
          rci,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.org,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
        // navigate(`/profiles/myprofile/${res?.data?.user.username}`);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
      // console.log(error.response.data.message);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    // <Layout>
    <div className="flex flex-col justify-center items-center h-screen w-screen text-[white] font-semibold">
      <div className="bg-blue-500 rounded-md h-90% w-90% mx-10 my-10 px-11 py-11 shadow-2xl">
      <form
        onSubmit={handleSubmit}
        className="bg-blue-500 py-3 rounded-lg flex flex-col px-5"
      >
        <h1 className="-translate-y-10 text-5xl font-extrabold flex justify-center text_shadow">
          Register
        </h1>

        <div className="flex flex-col">
          <input
            value={name}
            type="text"
            placeholder="Name"
            className="bg-transparent outline-none placeholder:text-white text-xl py-2 border-b-2 my-2"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            value={email}
            type="text"
            placeholder="Email"
            className="bg-transparent outline-none placeholder:text-white text-xl py-2 border-b-2 my-2"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            value={city}
            type="text"
            placeholder="City"
            className="bg-transparent outline-none placeholder:text-white text-xl py-2 border-b-2 my-2"
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            value={address}
            type="text"
            placeholder="Address"
            className="bg-transparent outline-none placeholder:text-white text-xl py-2 border-b-2 my-2"
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            value={mci}
            type="text"
            placeholder="Enter MCI no"
            className="bg-transparent outline-none placeholder:text-white text-xl py-2 border-b-2 my-2"
            onChange={(e) => setMci(e.target.value)}
          />
          <input
            value={rci}
            type="text"
            placeholder="Enter RCI no"
            className="bg-transparent outline-none placeholder:text-white text-xl py-2 border-b-2 my-2"
            onChange={(e) => setRci(e.target.value)}
          />
          <input
            value={password}
            type="Password"
            placeholder="Create password"
            className="bg-transparent outline-none placeholder:text-white text-xl py-2 border-b-2 my-2"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-[#1a1635] px-3 py-2 rounded-md mt-5 mb-3  hover:text-slate-900 hover:bg-blue-400"
        >
          Submit
        </button>
      </form>
      <br />
      <p>
        Already have an account? <Link to={"/login"} className="px-2  hover:text-slate-900">Signin</Link>{" "}
      </p>
      </div>
    </div>
    // </Layout>
  );
};

export default Signup;
