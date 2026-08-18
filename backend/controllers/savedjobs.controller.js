import User from "../models/user.model.js";

// PATCH /api/user/saved-jobs/:jobId -> toggle save/unsave
export const toggleSaveJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.id; // set by isAuthenticated middleware

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const alreadySaved = user.savedJobs.some(
      (id) => id.toString() === jobId
    );

    if (alreadySaved) {
      user.savedJobs = user.savedJobs.filter(
        (id) => id.toString() !== jobId
      );
    } else {
      user.savedJobs.push(jobId);
    }

    await user.save();

    return res.status(200).json({
      message: alreadySaved ? "Job removed from saved" : "Job saved successfully",
      success: true,
      saved: !alreadySaved,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// GET /api/user/saved-jobs -> get all saved jobs for logged-in candidate
export const getSavedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId).populate({
      path: "savedJobs",
      options: { sort: { createdAt: -1 } },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Saved jobs fetched successfully",
      success: true,
      savedJobs: user.savedJobs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};