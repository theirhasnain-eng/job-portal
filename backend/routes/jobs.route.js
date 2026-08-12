import express from "express";
import { login, register } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob, updateJob, deleteJob } from "../controllers/jobs.controller.js";


const jobsRouter = express.Router();

jobsRouter.post("/post", isAuthenticated, postJob);
jobsRouter.get("/get", isAuthenticated, getAllJobs);
jobsRouter.get("/getadminjobs", isAuthenticated, getAdminJobs);
jobsRouter.get("/get/:id",getJobById);
jobsRouter.put("/update/:id", isAuthenticated, updateJob);
jobsRouter.delete("/delete/:id", isAuthenticated, deleteJob);


export default jobsRouter;