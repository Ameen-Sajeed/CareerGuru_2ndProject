const User = require("../Models/user/userSchema");
const jwt = require("jsonwebtoken");
const CommentModel = require("../Models/user/commentSchema");
const ReportModel = require("../Models/user/ReportSchema");
const PostModel = require("../Models/user/PostSchema");
const JobReportModel = require("../Models/user/JobReportSchema");
const JobModel = require("../Models/user/JobSchema");

/* -------------------------------------------------------------------------- */
/*                                 ADMIN LOGIN                                */
/* -------------------------------------------------------------------------- */

const adminLogin = (req, res) => {
  try {
    const { ADMIN_EMAIL, ADMIN_PWD } = process.env;
    const { email, password } = req.body;

    if (email == ADMIN_EMAIL && password == ADMIN_PWD) {
      const id = "8394n43x14n384n1njk";
      const token = jwt.sign({ id }, process.env.JWT_KEY, {
        expiresIn: "365d",
      });

      console.log(token);

      console.log("email is matched");
      res.status(200).json({ token: token, auth: true, msg: "login success" });
    } else {
      console.log("incorrect email");
      res.status(500).json("Invalid Credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:"error occured"})

  }
};

/* -------------------------------------------------------------------------- */
/*                                 VIEW USERS                                 */
/* -------------------------------------------------------------------------- */

const getUsers = async (req, res) => {
  // console.log("hiiiii");
  try {
    User.find()
      .sort({ _id: -1 })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.json(error);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:"error occured"})

  }
};

/* -------------------------------------------------------------------------- */
/*                                 BLOCK USERS                                */
/* -------------------------------------------------------------------------- */

const blockUser = async (req, res) => {
  try {
    User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: "inactive",
        },
      }
    )
      .then((response) => {
        console.log(response, "popop");
        if (response) res.status(200).json("user has blocked");
      })
      .catch((error) => {
        res.json(error);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:"error occured"})

  }
};

/* -------------------------------------------------------------------------- */
/*                                UNBLOCK USERS                               */
/* -------------------------------------------------------------------------- */

const UnblockUser = (req, res) => {
  try {
    User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: "active",
        },
      }
    )
      .then((response) => {
        if (response) res.status(200).json("user has Unblocked");
      })
      .catch((error) => {
        res.json(error);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:"error occured"})

  }
};

/* -------------------------------------------------------------------------- */
/*                                GET ALL POSTS                               */
/* -------------------------------------------------------------------------- */

const getAllPost = async (req, res) => {
  try {
    await PostModel.find({ Reports: { $ne: [] } })
      .then((response) => {
        res.status(200).json(response);

        console.log(response, "response");
      })
      .catch((error) => {
        res.status(401).json(error);
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                              GET ALL COMMENTS                              */
/* -------------------------------------------------------------------------- */

const getAllComments = async (req, res) => {
  console.log("hiiiii");
  try {
    CommentModel.find()
      .sort({ _id: -1 })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.json(error);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:"error occured"})

  }
};

/* -------------------------------------------------------------------------- */
/*                               GET ALL REPORTS                              */
/* -------------------------------------------------------------------------- */

const getAllReports = async (req, res) => {
  console.log("hiiiii");
  try {
    ReportModel.find()
      .sort({ _id: -1 })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.json(error);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:"error occured"})

  }
};

/* -------------------------------------------------------------------------- */
/*                             VIEW SINGLE REPORT                             */
/* -------------------------------------------------------------------------- */

const ViewSingleReport = async (req, res) => {
  console.log("reached");
  const postId = req.params.id;
  console.log(postId, "kjkjk");
  try {
    let reports = await ReportModel.find({ postId: postId }).populate("userId");
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                                GET ALL JOBS                                */
/* -------------------------------------------------------------------------- */

const getAllJob = async (req, res) => {
  try {
    await JobModel.find({ Reports: { $ne: [] } })
      .then((response) => {
        res.status(200).json(response);

        console.log(response, "response");
      })
      .catch((error) => {
        res.status(401).json(error);
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                          VIEW SINGLE REPORT JOB                            */
/* -------------------------------------------------------------------------- */

const ViewSingleReportJob = async (req, res) => {
  console.log("reached");
  const JobId = req.params.id;
  console.log(JobId, "kjkjk");
  try {
    let reports = await JobReportModel.find({ JobId: JobId }).populate(
      "userId"
    );
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                            BLOCK REPORTED POSTS                            */
/* -------------------------------------------------------------------------- */

const blockReport = async (req, res) => {
  try {
    PostModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ReportStatus: "inactive",
        },
      }
    )
      .then((response) => {
        console.log(response, "popop");
        if (response) res.status(200).json("the post has been blocked");
      })
      .catch((error) => {
        res.json(error);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:"error occured"})

  }
};

/* -------------------------------------------------------------------------- */
/*                             BLOCK REPORTED JOBS                            */
/* -------------------------------------------------------------------------- */

const blockJob = async (req, res) => {
  try {
    JobModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ReportStatus: "inactive",
        },
      }
    )
      .then((response) => {
        console.log(response, "popop");
        if (response) res.status(200).json("the job has been blocked");
      })
      .catch((error) => {
        res.json(error);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:"error occured"})

  }
};

module.exports = {
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
};
