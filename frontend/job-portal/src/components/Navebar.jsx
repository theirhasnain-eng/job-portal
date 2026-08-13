import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../utils/constant";

function Navebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      await axios.post(
        `${USER_API_END_POINT}/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      logout();
      navigate("/");
      toast.success("Logged out successfully");
      setMenuOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-[#0FA88A] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <nav className="flex w-full items-center justify-between">
          <div className="nav-left">
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center gap-2 font-display text-xl font-semibold text-ink-950"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-sm font-bold text-black">
                JF
              </div>
              <span className="text-white text-lg font-bold">JobFinder</span>
            </Link>
          </div>

          {/* Hamburger button - only visible on mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 h-9 w-9 rounded-md hover:bg-white/10"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>

          {/* Desktop nav */}
          <div className="nav-right hidden md:flex items-center gap-6 text-sm text-ink-500">
            {!user ? (
              // ---- LOGGED OUT ----
              <div className="flex items-center">
                <Link
                  to="/"
                  className="hover:text-white hover:font-bold text-sm font-semibold mr-2"
                >
                  Home
                </Link>
                <Link
                  to="/login"
                  className="hover:text-[#0FA88A] hover:font-bold text-sm font-semibold p-3 rounded-2xl bg-gray-50 mr-2"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="p-3 rounded-2xl bg-black text-white font-semibold"
                >
                  Get started
                </Link>
              </div>
            ) : (
              // ---- LOGGED IN ----
              <div className="flex items-center gap-4">
                <Link
                  to="/"
                  className="hover:text-white hover:font-bold text-sm font-semibold"
                >
                  Home
                </Link>

                {/* ONLY recruiters see this */}
                {user.role === "recruiter" && (
                  <div>
                    <Link
                      to="/postjob"
                      className="hover:text-white text-sm font-semibold mr-3 hover:font-bold"
                    >
                      List Job
                    </Link>
                    <Link
                      to="/recruiterdashboard"
                      className="hover:text-white text-sm font-semibold hover:font-bold"
                    >
                      Dashboard
                    </Link>
                  </div>
                )}

                {/* ONLY admins see this */}
                {user.role === "admin" && (
                  <div>
                    <Link
                      to="/browsjobs"
                      className="hover:text-white mr-3 text-sm font-semibold hover:font-bold"
                    >
                      Browse jobs
                    </Link>
                    <Link
                      to="/dashboard"
                      className="hover:text-white text-sm font-semibold hover:font-bold"
                    >
                      Admin Panel
                    </Link>
                  </div>
                )}

                {/* ONLY candidates see this (example) */}
                {user.role === "candidate" && (
                  <div>
                    <Link
                      to="/browsjobs"
                      className="hover:text-white text-sm font-semibold hover:font-bold"
                    >
                      Browse jobs
                    </Link>
                  </div>
                )}

                <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-[#0FA88A]">
                    {user.fullname?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-white text-sm font-semibold">
                    {user.fullname}
                  </span>
                </div>

                <button
                  onClick={logoutHandler}
                  className="hover:text-[#0FA88A] hover:font-bold text-sm font-semibold p-3 rounded-2xl bg-gray-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile menu (slides down, only visible when open) */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-3 px-6 pb-6 pt-2 border-t border-white/20">
          {!user ? (
            // ---- LOGGED OUT (mobile) ----
            <>
              <Link
                to="/"
                onClick={closeMenu}
                className="text-white text-sm font-semibold py-2"
              >
                Home
              </Link>
              <Link
                to="/login"
                onClick={closeMenu}
                className="text-sm font-semibold p-3 rounded-2xl bg-gray-50 text-center"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={closeMenu}
                className="p-3 rounded-2xl bg-black text-white font-semibold text-center"
              >
                Get started
              </Link>
            </>
          ) : (
            // ---- LOGGED IN (mobile) ----
            <>
              <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-full w-fit">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-[#0FA88A]">
                  {user.fullname?.charAt(0).toUpperCase()}
                </div>
                <span className="text-white text-sm font-semibold">
                  {user.fullname}
                </span>
              </div>

              <Link
                to="/"
                onClick={closeMenu}
                className="text-white text-sm font-semibold py-2"
              >
                Home
              </Link>

              {user.role === "recruiter" && (
                <>
                  <Link
                    to="/postjob"
                    onClick={closeMenu}
                    className="text-white text-sm font-semibold py-2"
                  >
                    List Job
                  </Link>
                  <Link
                    to="/recruiterdashboard"
                    onClick={closeMenu}
                    className="text-white text-sm font-semibold py-2"
                  >
                    Dashboard
                  </Link>
                </>
              )}

              {user.role === "admin" && (
                <>
                  <Link
                    to="/browsjobs"
                    onClick={closeMenu}
                    className="text-white text-sm font-semibold py-2"
                  >
                    Browse jobs
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className="text-white text-sm font-semibold py-2"
                  >
                    Admin Panel
                  </Link>
                </>
              )}

              {user.role === "candidate" && (
                <Link
                  to="/browsjobs"
                  onClick={closeMenu}
                  className="text-white text-sm font-semibold py-2"
                >
                  Browse jobs
                </Link>
              )}

              <button
                onClick={logoutHandler}
                className="text-sm font-semibold p-3 rounded-2xl bg-gray-50 text-center"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
export default Navebar;
