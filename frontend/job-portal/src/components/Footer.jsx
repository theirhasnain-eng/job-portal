// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0FA88A] text-white mt-16">
      <div className="max-w-6xl mx-auto px-8 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="col-span-2 sm:col-span-1">
          <h2 className="text-xl font-bold mb-2">JobFinder</h2>
          <p className="text-white/80 text-sm">
            Connecting talented candidates with the right opportunities.
          </p>
        </div>

        {/* For Job Seekers */}
        <div>
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-white/90">
            Job Seekers
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-white/80">
            <li>
              <Link to="/browsjobs" className="hover:text-white transition">
                Browse Jobs
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-white transition">
                Create Account
              </Link>
            </li>
            <li>
              <Link
                to="/candidatedashboard"
                className="hover:text-white transition"
              >
                My Applications
              </Link>
            </li>
          </ul>
        </div>

        {/* For Recruiters */}
        <div>
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-white/90">
            Recruiters
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-white/80">
            <li>
              <Link to="/signup" className="hover:text-white transition">
                Post a Job
              </Link>
            </li>
            <li>
              <Link
                to="/recruiterdashboard"
                className="hover:text-white transition"
              >
                Manage Listings
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white transition">
                Recruiter Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-white/90">
            Company
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-white/80">
            <li>
              <Link to="/" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20">
        <div className="max-w-6xl mx-auto px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-white/70">
          <p>© {new Date().getFullYear()} JobFinder. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">
              Facebook
            </a>
            <a href="#" className="hover:text-white transition">
              LinkedIn
            </a>
            <a href="#" className="hover:text-white transition">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
