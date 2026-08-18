import React, { useEffect, useState } from "react";
import axios from "axios";
import { JOB_API_END_POINT, USER_API_END_POINT } from "../utils/constant";
import { Link } from "react-router-dom";

function Browsjob() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [savedIds, setSavedIds] = useState(new Set()); // track saved job ids
  const [savingId, setSavingId] = useState(null); // which job is mid-request

  const toggleSave = async (jobId) => {
    setSavingId(jobId);
    try {
      const res = await axios.patch(
        `${USER_API_END_POINT}/saved-jobs/${jobId}`,
        {},
        { withCredentials: true },
      );
      setSavedIds((prev) => {
        const next = new Set(prev);
        if (res.data.saved) {
          next.add(jobId);
        } else {
          next.delete(jobId);
        }
        return next;
      });
    } catch (err) {
      console.error("Failed to toggle save", err);
    } finally {
      setSavingId(null);
    }
  };

  const fetchJobs = async (keyword = "") => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `${JOB_API_END_POINT}/get?keyword=${keyword}`,
        { withCredentials: true },
      );
      if (res.data.success) {
        setJobs(res.data.jobs);
      }
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message || "Could not load jobs. Please try again.",
      );
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const searchHandler = (e) => {
    e.preventDefault();
    fetchJobs(search);
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Jobs</h1>
          <p className="text-gray-500 mb-6">
            Find your next opportunity from the listings below.
          </p>

          <form onSubmit={searchHandler} className="flex gap-2 mb-8 max-w-lg">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or keyword..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#0FA88A] transition"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#0FA88A] text-white font-semibold hover:bg-[#0c8f75] transition"
            >
              Search
            </button>
          </form>

          {loading && (
            <div className="text-center text-gray-500 py-16">
              Loading jobs...
            </div>
          )}

          {!loading && error && (
            <div className="text-center text-red-500 py-16">{error}</div>
          )}

          {!loading && !error && jobs.length === 0 && (
            <div className="text-center text-gray-500 py-16">
              No jobs found. Try a different search.
            </div>
          )}

          {!loading && !error && jobs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => {
                const isSaved = savedIds.has(job._id);
                const isSaving = savingId === job._id;
                return (
                  <div
                    key={job._id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between hover:shadow-md transition"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-bold text-gray-900">
                          {job.title}
                        </h2>
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-[#0FA88A]/10 text-[#0FA88A]">
                          {job.jobType}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">
                        {job.company}
                      </p>
                      <p className="text-sm text-gray-500 mb-3">
                        {job.location}
                      </p>
                      <p className="text-sm text-gray-700 line-clamp-3 mb-4">
                        {job.description}
                      </p>
                      {job.skills?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.skills.slice(0, 4).map((skill, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-2 gap-2">
                      <span className="text-sm font-semibold text-gray-800">
                        Rs {job.minSalary?.toLocaleString()} - Rs{" "}
                        {job.maxSalary?.toLocaleString()}
                      </span>
                      <Link
                        to={`/jobdetails/${job._id}`}
                        className="text-sm font-semibold text-white bg-black px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => toggleSave(job._id)}
                        disabled={isSaving}
                        className={`text-sm p-4 rounded-lg bg-[#0FA88A] font-medium disabled:opacity-50 ${
                          isSaved ? "text-red-500" : "text-[#12345d]"
                        }`}
                      >
                        {isSaving ? "..." : isSaved ? " Saved" : " Save"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Browsjob;
