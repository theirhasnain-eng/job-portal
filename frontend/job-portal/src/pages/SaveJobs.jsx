import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant.js";

function SaveJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  const fetchSavedJobs = useCallback(async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/saved-jobs`, {
        withCredentials: true,
      });
      setJobs(res.data.savedJobs);
    } catch (err) {
      console.error("Failed to fetch saved jobs", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSavedJobs();
  }, [fetchSavedJobs]);

  const removeJob = async (jobId) => {
    setRemovingId(jobId);
    try {
      await axios.patch(
        `${USER_API_END_POINT}/saved-jobs/${jobId}`,
        {},
        { withCredentials: true },
      );
      // remove from local state instead of refetching everything
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (err) {
      console.error("Failed to remove saved job", err);
    } finally {
      setRemovingId(null);
    }
  };

  if (loading) return <p className="p-6 text-gray-400">Loading...</p>;

  return (
    <div className="p-6 space-y-4 h-62">
      <h2 className="text-lg font-semibold text-gray-800">Saved Jobs</h2>
      {jobs.length === 0 ? (
        <p className="text-gray-400 text-sm">No saved jobs yet.</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job._id}
            className="border rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <h3 className="font-medium">{job.title}</h3>
              <p className="text-sm text-gray-500">{job.location}</p>
            </div>
            <button
              onClick={() => removeJob(job._id)}
              disabled={removingId === job._id}
              className="text-sm font-medium text-red-500 hover:underline disabled:opacity-50"
            >
              {removingId === job._id ? "Removing..." : "Remove"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default SaveJobs;
