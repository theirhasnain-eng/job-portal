import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { JOB_API_END_POINT } from "../utils/constant";
import { useAuth } from "../context/AuthContext";

function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/get`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setJobs(res.data.jobs);
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Could not load job listings.");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job listing? This can't be undone."))
      return;
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setJobs((prev) => prev.filter((job) => job._id !== id));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Could not delete job.");
    }
  };

  const myJobsCount = jobs.filter(
    (job) => job.created_by?._id === user?._id || job.created_by === user?._id,
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#0FA88A] text-white px-8 py-5 flex justify-between items-center shadow">
        <div>
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-white/80">Manage job listings</p>
        </div>
      </header>

      <main className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Total Jobs on Portal</p>
            <p className="text-3xl font-bold text-gray-800">{jobs.length}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Posted by You</p>
            <p className="text-3xl font-bold text-[#0FA88A]">{myJobsCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">
              All Job Listings
            </h2>
            <Link to="/postjob">
              <button className="bg-[#0FA88A] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#0c8f75] transition">
                + Add Job Listing
              </button>
            </Link>
          </div>

          {loading && (
            <p className="p-6 text-gray-500">Loading job listings...</p>
          )}
          {!loading && error && <p className="p-6 text-red-500">{error}</p>}
          {!loading && !error && jobs.length === 0 && (
            <p className="p-6 text-gray-500">
              No job listings yet. Add your first one.
            </p>
          )}

          {!loading && !error && jobs.length > 0 && (
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Company</th>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Posted By</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => {
                  const isOwner =
                    job.created_by?._id === user?._id ||
                    job.created_by === user?._id;

                  const canManage = isOwner || user?.role === "admin";
                  return (
                    <tr key={job._id} className="border-t border-gray-100">
                      <td className="px-6 py-3 font-medium text-gray-800">
                        {job.title}
                      </td>
                      <td className="px-6 py-3 text-gray-600">{job.company}</td>
                      <td className="px-6 py-3 text-gray-600">
                        {job.location}
                      </td>
                      <td className="px-6 py-3 text-gray-600">{job.jobType}</td>
                      <td className="px-6 py-3 text-gray-600">
                        {job.created_by?.fullname || "Unknown"}
                      </td>
                      <td className="px-6 py-3 text-right space-x-2">
                        {canManage ? (
                          <>
                            <button
                              onClick={() => navigate(`/editjob/${job._id}`)}
                              className="text-[#0FA88A] font-medium hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(job._id)}
                              className="text-red-500 font-medium hover:underline"
                            >
                              Delete
                            </button>
                          </>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
