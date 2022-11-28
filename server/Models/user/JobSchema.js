const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    Company: {
      type: String,
    },

    Designation: {
      type: String,
    },

    location: {
      type: String,
    },

    TypeofWork: {
      type: String,
    },
    Desc: {
      type: String,
    },
    Salary: {
      type: String,
    },
    Time: {
      type: String,
    },
    jobRequests: {
      type: Array,
      default:[]
    },
  },
  { timestamps: true }
);

const JobModel = mongoose.model("Jobs", JobSchema);
module.exports = JobModel;
