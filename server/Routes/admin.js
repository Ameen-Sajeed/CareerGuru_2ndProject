const express = require("express");
const {
  getUsers,
  blockUser,
  UnblockUser,
  adminLogin,
  getAllPost,
  getAllComments,
  getAllReports,
  ViewSingleReport,
  blockReport,
  ViewSingleReportJob,
  getAllJob,
  blockJob,
} = require("../controllers/admin");
const check = require("../middlewares/verify");
const router = express.Router();

router.post("/login", adminLogin);

 /* ----------------------------- USER MANAGEMENT ---------------------------- */

router.get("/users", check, getUsers);

router.patch("/blockUsers/:id", check, blockUser);

router.put("/UnblockUsers/:id", check, UnblockUser);

 /* ----------------------------- POST MANAGEMENT ---------------------------- */

router.get("/allpost", check, getAllPost);

router.get("/allcomments", check, getAllComments);

router.get("/allreports", check, getAllReports);

router.get("/singlereports/:id", check, ViewSingleReport);

router.patch("/blockPosts/:id", check, blockReport);

 /* ----------------------------- JOB MANAGEMENT ----------------------------- */

router.get("/singleJobreport/:id", check, ViewSingleReportJob);

router.get("/allJobs", check, getAllJob);

router.patch("/blockJobs/:id", check, blockJob);

module.exports = router;
