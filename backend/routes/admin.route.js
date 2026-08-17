import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isAdmin from "../middlewares/isAdmin.js";
import { getAllUsers, toggleUserStatus } from "../controllers/admin.controllers.js";

const adminRouter= express.Router();

adminRouter.route("/get/user").get(isAuthenticated, isAdmin, getAllUsers);
adminRouter.route("/user/:id/status").patch(isAuthenticated, isAdmin, toggleUserStatus);

export default adminRouter;