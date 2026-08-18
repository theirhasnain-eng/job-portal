import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT, USER_API_END_POINT } from "../utils/constant";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setJob(res.data.job);
        }
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.message || "Could not load this job.");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  useEffect(() => {
    // check if this job is already in the user's saved list
    const checkSaved = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/saved-jobs`, {
          withCredentials: true,
        });
        if (res.data.success) {
          const isSaved = res.data.savedJobs.some((j) => j._id === id);
          setSaved(isSaved);
        }
      } catch (err) {
        // not logged in, or not a candidate — silently ignore
        console.log(err);
      }
    };
    checkSaved();
  }, [id]);

  const toggleSave = async () => {
    setSaving(true);
    try {
      const res = await axios.patch(
        `${USER_API_END_POINT}/saved-jobs/${id}`,
        {},
        { withCredentials: true },
      );
      setSaved(res.data.saved);
    } catch (err) {
      console.error("Failed to toggle save", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading job details...
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-gray-500">
        <p>{error || "Job not found."}</p>
        <Link to="/browsjobs" className="text-[#0FA88A] font-semibold">
          Back to Browse Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <Link
          to="/browsjobs"
          className="text-sm text-[#0FA88A] font-semibold mb-4 inline-block"
        >
          &larr; Back to Browse Jobs
        </Link>

        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#0FA88A]/10 text-[#0FA88A]">
            {job.jobType}
          </span>
        </div>

        <p className="text-gray-500 mb-1">{job.company}</p>
        <p className="text-gray-500 mb-6">{job.location}</p>

        <p className="text-lg font-semibold text-gray-800 mb-6">
          Rs {job.minSalary?.toLocaleString()} - Rs{" "}
          {job.maxSalary?.toLocaleString()}
        </p>

        {job.skills?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {job.skills.map((skill, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Description</h2>
          <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Requirements</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {job.requirements}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex-1 py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition">
            Apply Now
          </button>
          <button
            onClick={() => toggleSave(job._id)}
            disabled={saving}
            className={`text-sm p-4 rounded-lg bg-[#0FA88A] font-medium disabled:opacity-50 ${
              saved ? "text-red-500" : "text-[#12345d]"
            }`}
          >
            {saving ? "..." : saved ? " Saved" : " Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
