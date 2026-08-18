import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { toggleSaveJob, getSavedJobs } from "../controllers/savedjobs.controller.js";

const savejobsRouter = express.Router();

savejobsRouter.route("/saved-jobs/:jobId").patch(isAuthenticated, toggleSaveJob);
savejobsRouter.route("/saved-jobs").get(isAuthenticated, getSavedJobs);

export default savejobsRouter;