const User = require("../Models/user/userSchema");
const jwt = require("jsonwebtoken");
const Post = require("../Models/user/PostSchema");
const CommentModel = require("../Models/user/commentSchema");
const ReportModel = require("../Models/user/ReportSchema");
const { populate } = require("../Models/user/userSchema");

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
  }
};

/* -------------------------------------------------------------------------- */
/*                                GET ALL POSTS                               */
/* -------------------------------------------------------------------------- */

const getAllPost = async (req, res) => {
  try {
    const report = await ReportModel.find().populate("postId");
    const comments = await CommentModel.find().populate("postId");
    console.log(comments, "oioi");
    res.status(200).json({ data1: report, data2: comments });
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
};
