import User from "../models/user.model.js";

// GET /api/admin/users -> all recruiters + candidates together
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["recruiter", "candidate"] } })
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Users fetched successfully",
      success: true,
      users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// PATCH /api/admin/users/:id/status -> block/unblock a user
export const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    return res.status(200).json({
      message: `User ${user.isActive ? "activated" : "blocked"} successfully`,
      success: true,
      user: {
        _id: user._id,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};