import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { JOB_API_END_POINT } from "../utils/constant";

function PostJob() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "Full-time",
    minSalary: "",
    maxSalary: "",
    skills: "",
    description: "",
    requirements: "",
  });
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...input,
        minSalary: Number(input.minSalary),
        maxSalary: Number(input.maxSalary),
        skills: input.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      const res = await axios.post(`${JOB_API_END_POINT}/post`, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/browsjobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Post a Job</h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Job Title
            </label>
            <input
              name="title"
              value={input.title}
              onChange={changeHandler}
              type="text"
              placeholder="Frontend Developer"
              className="px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#0FA88A] transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Company
            </label>
            <input
              name="company"
              value={input.company}
              onChange={changeHandler}
              type="text"
              placeholder="Acme Corp"
              className="px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#0FA88A] transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Location
            </label>
            <input
              name="location"
              value={input.location}
              onChange={changeHandler}
              type="text"
              placeholder="Lahore, Pakistan"
              className="px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#0FA88A] transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Job Type
            </label>
            <select
              name="jobType"
              value={input.jobType}
              onChange={changeHandler}
              className="px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#0FA88A] transition bg-white"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">
                Min Salary
              </label>
              <input
                name="minSalary"
                value={input.minSalary}
                onChange={changeHandler}
                type="number"
                placeholder="50000"
                className="px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#0FA88A] transition"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">
                Max Salary
              </label>
              <input
                name="maxSalary"
                value={input.maxSalary}
                onChange={changeHandler}
                type="number"
                placeholder="90000"
                className="px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#0FA88A] transition"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Skills{" "}
              <span className="text-gray-400 font-normal">
                (comma separated)
              </span>
            </label>
            <input
              name="skills"
              value={input.skills}
              onChange={changeHandler}
              type="text"
              placeholder="React, Tailwind CSS, Node.js"
              className="px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#0FA88A] transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={input.description}
              onChange={changeHandler}
              rows={4}
              placeholder="Describe the role, responsibilities, and team..."
              className="px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#0FA88A] transition resize-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Requirements
            </label>
            <textarea
              name="requirements"
              value={input.requirements}
              onChange={changeHandler}
              rows={4}
              placeholder="List the required experience, skills, and qualifications..."
              className="px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#0FA88A] transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 py-3 rounded-lg bg-[#0FA88A] text-white font-semibold hover:bg-[#0c8f75] transition disabled:opacity-60"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostJob;
