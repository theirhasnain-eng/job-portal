import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../utils/constant";

function Navebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-[#0FA88A] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <nav className="flex w-full items-center justify-between">
          <div className="nav-left">
            <Link
              to="/"
              className="flex items-center gap-2 font-display text-xl font-semibold text-ink-950"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-sm font-bold text-black">
                JF
              </div>
              <span className="text-white text-lg font-bold">JobFinder</span>
            </Link>
          </div>

          <div className="nav-right flex items-center gap-6 text-sm text-ink-500">
            {!user ? (
              // ---- LOGGED OUT ----
              <div>
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
                    {/* <Link
                     to="/candidatedashboard"
                    className="hover:text-white text-sm font-semibold hover:font-bold"
                   >
                     My Applications
                  </Link> */}
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
    </header>
  );
}
export default Navebar;
