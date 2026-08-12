import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/authSlice.js";
import store from "../redux/store";
import { Loader2 } from "lucide-react";

function Signup() {
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    fullname: "",
    companyname: "",
    email: "",
    password: "",
    role: "candidate",
  });
  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const payload = { ...input };
    if (payload.role !== "recruiter") {
      delete payload.companyname; // don't send an empty companyname for candidates
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-[#0FA88A]">
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            Create Account
          </h1>

          {/* Role Selector */}
          <div className="flex bg-white/20 rounded-lg p-1 mb-2">
            <button
              type="button"
              onClick={() => setInput({ ...input, role: "candidate" })}
              className={`flex-1 py-2 rounded-md text-sm font-semibold transition ${
                input.role === "candidate"
                  ? "bg-white text-[#0FA88A] shadow"
                  : "text-white"
              }`}
            >
              I'm a Candidate
            </button>
            <button
              type="button"
              onClick={() => setInput({ ...input, role: "recruiter" })}
              className={`flex-1 py-2 rounded-md text-sm font-semibold transition ${
                input.role === "recruiter"
                  ? "bg-white text-[#0FA88A] shadow"
                  : "text-white"
              }`}
            >
              I'm a Recruiter
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-white font-medium text-sm">Full Name</label>
            <input
              name="fullname"
              type="text"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Hasnain Ahmed"
              className="px-4 py-2 rounded-lg outline-none bg-white/90 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-white focus:bg-white transition"
            />
          </div>

          {input.role === "recruiter" && (
            <div className="flex flex-col gap-1">
              <label className="text-white font-medium text-sm">
                Company Name
              </label>
              <input
                name="companyname"
                value={input.companyname}
                onChange={changeEventHandler}
                type="text"
                placeholder="Acme Corp"
                className="px-4 py-2 rounded-lg outline-none bg-white/90 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-white focus:bg-white transition"
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-white font-medium text-sm">Email</label>
            <input
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              type="email"
              placeholder="hasnain@gmail.com"
              className="px-4 py-2 rounded-lg outline-none bg-white/90 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-white focus:bg-white transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-white font-medium text-sm">Password</label>
            <input
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="px-4 py-2 rounded-lg outline-none bg-white/90 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-white focus:bg-white transition"
            />
          </div>

          <div className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="w-4 h-4 accent-white cursor-pointer"
            />
            <p className="text-white text-sm select-none">Show password</p>
          </div>

          {loading ? (
            <button className="w-full my-4 flex ">
              <Loader2 className="mr-10  h-6 w-6  text-white animate-spin" />
              Please wait
            </button>
          ) : (
            <button
              type="submit"
              className="mt-3 bg-white text-[#0FA88A] font-semibold py-2 rounded-lg hover:bg-gray-100 active:scale-95 transition transform"
            >
              Sign up
            </button>
          )}

          <p className="text-white text-sm text-center mt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold underline hover:text-gray-100"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
