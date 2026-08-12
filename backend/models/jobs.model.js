import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    jobType: {
      type: String,
      required: true,
      enum: ["Full-time", "Part-time", "Internship", "Contract", "Remote"],
    },

    minSalary: {
      type: Number,
      required: true,
      min: 0,
    },

    maxSalary: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: function (value) {
          return value >= this.minSalary;
        },
        message: "Maximum salary must be greater than minimum salary.",
      },
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    description: {
      type: String,
      required: true,
    },

    requirements: {
      type: String,
      required: true,
    },
     created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:false

  },applications:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Application'

  }
  
  },
 
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;