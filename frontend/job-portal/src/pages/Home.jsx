import React, { useState } from "react";
import { Link } from "react-router-dom";


function Home() {
  const [search, setSearch] = useState("");
  return (
    <div>
    
      <section className="bg-gray-50 px-8 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#0FA88A] text-xs font-bold tracking-widest uppercase mb-4">
            Open roles, updated daily
          </p>
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Every open role, verified and in one lane.
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Job Finder connects job seekers with recruiters posting real, open
            positions — reviewed by an admin team so listings stay current and
            applications never disappear into a black hole.
          </p>

          {/* Search bar */}
          <div className="flex items-center bg-white rounded-full shadow-sm border border-gray-200 p-1.5 max-w-xl mx-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Job title, skill, or company"
              className="flex-1 px-4 py-2.5 text-sm outline-none rounded-full text-gray-700 placeholder-gray-400"
            />
            <button className="bg-gray-900 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-800 transition whitespace-nowrap">
              Search jobs
            </button>
          </div>

          <p className="text-gray-500 text-sm mt-4">
            Or{" "}
            <Link
              to="/browsjobs"
              className="text-[#0FA88A] font-medium underline hover:text-[#0c8f75]"
            >
              browse every open role
            </Link>
          </p>
        </div>
      </section>

      {/* Role breakdown */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Job seekers */}
          <div>
            <span className="inline-block bg-[#E6F7F2] text-[#0FA88A] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              For job seekers
            </span>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Search, apply, track
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Filter by location and job type, apply in a click, and see every
              application's status in one dashboard.
            </p>
          </div>

          {/* Recruiters */}
          <div>
            <span className="inline-block bg-orange-50 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              For recruiters
            </span>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Post and manage openings
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              List a role in minutes, review applicants, and update or close a
              posting the moment it's filled.
            </p>
          </div>

          {/* Admins */}
          <div>
            <span className="inline-block bg-[#E6F7F2] text-[#0FA88A] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              For admins
            </span>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Full oversight
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Review every listing across the platform, edit or remove any job,
              and manage recruiter and seeker accounts.
            </p>
          </div>
        </div>
      </section>
      
    </div>
  );
}

export default Home;
