import Job from "../models/jobs.model.js";
import jwt from "jsonwebtoken";

// POST /api/jobs  (recruiter)
export const postJob = async (req, res) => {
  try {
    const { title, company, location, jobType, minSalary, maxSalary, skills, description, requirements } = req.body;
    const userId = req.id;

    if (!title || !company || !location || !jobType || !minSalary || !maxSalary || !skills || !description || !requirements) {
      return res.status(400).json({
        message: "Some thing is missing",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      company,
      location,
      jobType,
      minSalary: Number(minSalary),
      maxSalary: Number(maxSalary),
      skills,
      description,
      requirements,
      created_by: userId,
    });

    return res.status(201).json({
      message: "New job is created successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query).populate("created_by", "fullname email");
    if (!jobs) {
      return res.status(404).json({
        message: "jobs not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// this for student or candidate
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "jobs not found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// this for admin to see how many jobs he posted
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId });
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// PUT /api/job/update/:id  (only the recruiter who posted it can edit)
import User from "../models/user.model.js"; // adjust path to match your project

export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    const currentUser = await User.findById(userId);
    const isOwner = job.created_by?.toString() === userId;
    const isAdmin = currentUser?.role === "admin"; // ⚠️ adjust field/value to match your User schema

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        message: "You are not authorized to edit this job",
        success: false,
      });
    }

    const { title, company, location, jobType, minSalary, maxSalary, skills, description, requirements } = req.body;

    if (title) job.title = title;
    if (company) job.company = company;
    if (location) job.location = location;
    if (jobType) job.jobType = jobType;
    if (minSalary) job.minSalary = Number(minSalary);
    if (maxSalary) job.maxSalary = Number(maxSalary);
    if (skills) job.skills = skills;
    if (description) job.description = description;
    if (requirements) job.requirements = requirements;

    await job.save();

    return res.status(200).json({
      message: "Job updated successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// DELETE /api/job/delete/:id  (owner OR admin can delete)
export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    const currentUser = await User.findById(userId);
    const isOwner = job.created_by?.toString() === userId;
    const isAdmin = currentUser?.role === "admin"; // ⚠️ adjust field/value to match your User schema

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        message: "You are not authorized to delete this job",
        success: false,
      });
    }

    await Job.findByIdAndDelete(jobId);

    return res.status(200).json({
      message: "Job deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};