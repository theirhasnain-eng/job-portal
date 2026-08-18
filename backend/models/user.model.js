import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    companyname: {
      type: String,
      unique: true,
      required: false,
      sparse: true, // allows many docs with no companyname (candidates), only enforces uniqueness when a value IS provided
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["candidate", "recruiter", "admin"],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    savedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;