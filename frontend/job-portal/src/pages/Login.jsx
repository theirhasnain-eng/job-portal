import React, { useState } from "react";
import axios from "axios";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/authSlice.js";
import store from "../redux/store";
import { Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        // Save the logged-in user so ProtectedRoute / Navbar know who's in
        login(res.data.user);
        toast.success(res.data.message);

        // Send each role to their own dashboard
        if (res.data.user.role === "admin") {
          navigate("/dashboard");
        } else if (res.data.user.role === "recruiter") {
          navigate("/recruiterdashboard");
        } else {
          navigate("/candidatedashboard");
        }
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
    <div>
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-[#0FA88A]">
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-white text-center mb-2">
              Login
            </h1>

            <div className="flex flex-col gap-1">
              <label className="text-white font-medium text-sm">
                Enter Email
              </label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="hasnain@gmail.com"
                className="px-4 py-2 rounded-lg outline-none bg-white/90 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-white focus:bg-white transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-white font-medium text-sm">
                Enter Password
              </label>
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
            {loading ? 
            (
              <button className="w-full my-4 flex ">
                <Loader2 className="mr-10  h-6 w-6  text-white animate-spin" />
                Please wait
              </button>
            ) : (
              <button
                type="submit"
                className="mt-3 bg-white text-[#0FA88A] font-semibold py-2 rounded-lg hover:bg-gray-100 active:scale-95 transition transform"
              >
                Login
              </button>
            )}

            <p className="text-white text-sm text-center mt-2">
              Dont have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold underline hover:text-blue-700"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
