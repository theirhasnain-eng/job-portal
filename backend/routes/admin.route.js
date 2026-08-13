import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isAdmin from "../middlewares/isAdmin.js";
import { getAllUsers, toggleUserStatus } from "../controllers/admin.controllers.js";

const router = express.Router();

router.route("/users").get(isAuthenticated, isAdmin, getAllUsers);
router.route("/users/:id/status").patch(isAuthenticated, isAdmin, toggleUserStatus);

export default router;