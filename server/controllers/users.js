const User = require("../Models/user/userSchema");
const bcrypt = require("bcrypt");
const Post = require("../Models/user/PostSchema");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const userVerification = require("../Models/user/userVerification");
const CommentModel = require("../Models/user/commentSchema");
const JobModel = require("../Models/user/JobSchema");
const ChatModel = require("../Models/user/ChatSchema");
const MessageModel = require("../Models/user/MessageSchema");
const ReportModel = require("../Models/user/ReportSchema");
const PostModel = require("../Models/user/PostSchema");
const JobReportModel = require("../Models/user/JobReportSchema");
const JobRequestModel = require("../Models/user/JobRequests");

/* ----------------------------- NODEMAILER INIT ---------------------------- */

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jobseekerj010@gmail.com",
    pass: "onqchtjlalxoxazh",
  },
});

/* -------------------------------------------------------------------------- */
/*                               OTP GERNERATION                              */
/* -------------------------------------------------------------------------- */

const sendOtp = async (result, res) => {
  console.log(result, "hey there");
  try {
    const OTP = await Math.floor(100000 + Math.random() * 900000).toString();
    console.log("OTP");
    console.log(OTP);
    var senEMail = {
      from: "jobseekerj010@gmail.com",
      to: result.email,
      subject: "Sending Email My Instagram",
      text: `Hi ${result.username} Your OTP pin has been generated `,
      html: `<h1>Hi ${result.username}</h1><p>Your OTP is ${OTP}</p>`,
    };

    let hashOTP = await bcrypt.hash(OTP, 10);
    let verify = await userVerification.findOne({ userId: result._id });
    if (!verify) {
      const userverification = new userVerification({
        userId: result._id,
        Otp: hashOTP,
        Created: Date.now(),
        Expiry: Date.now() + 100000,
      });
      await userverification.save();
    } else {
      await userVerification.updateOne(
        { userId: result._id },
        { otp: hashOTP }
      );
    }

    transporter.sendMail(senEMail, function (error, info) {
      console.log("oioioioi");
      if (error) {
        console.log(error, "yuyuuy");
      } else {
        res.json({
          status: "pending",
          msg: "Verification otp mail sent",
          mail: result.email,
          user: result,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                                 VERIFY OTP                                 */
/* -------------------------------------------------------------------------- */

const verifyOtp = async (req, res) => {
  // console.log(req.body.OTP);
  let OtpVerify = await userVerification.findOne({ userId: req.body.user });
  console.log(OtpVerify, "tttttt");
  let correctOtp = await bcrypt.compare(req.body.OTP, OtpVerify.Otp);
  console.log("correctOtp");
  console.log(correctOtp);
  if (correctOtp) {
    await User.updateOne(
      { _id: req.body.user },
      { $set: { verified: "true" } }
    );
    res.status(200).json({ verified: true });
  } else {
    res.status(200).json({ verified: false, msg: "Incorrect OTP" });
  }
};

/* -------------------------------------------------------------------------- */
/*                               REGISTER USERS                               */
/* -------------------------------------------------------------------------- */

const PostSignUp = async (req, res) => {
  // console.log(req.body);

  try {
    let { username, email, phone, password } = req.body;
    password = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      phone,
      password,
    });
    console.log(user);
    await user.save().then((result) => {
      sendOtp(result, res);
      res.status(200).json({ res: user });
    });
  } catch (error) {
    console.log(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                               LOGIN FOR USERS                              */
/* -------------------------------------------------------------------------- */

const PostLogin = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user, "lklklklk");
    if (!user || user.status === "inactive") {
      return res.status(400).json("user not found");
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) return res.status(400).json("wrong password");

    const id = "8394n43x14n384n1njk";
    const usertoken = jwt.sign({ id }, process.env.JWT_KEY, {
      expiresIn: "365d",
    });
    console.log(usertoken);

    return res
      .status(200)
      .json({ state: "ok", usertoken: usertoken, user: user });
  } catch (error) {
    console.log(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                                UPDATE USERS                                */
/* -------------------------------------------------------------------------- */

const UpdateUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      // try {
      //   req.body.password = await bcrypt.hash(req.body.password, 10);
      // } catch (err) {
      //   return res.status(500).json(err);
      // }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account");
  }
};

/* -------------------------------------------------------------------------- */
/*                                 DELETE USER                                */
/* -------------------------------------------------------------------------- */

const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted succesfully");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account");
  }
};

/* -------------------------------------------------------------------------- */
/*                                 FOLLOW USER                                */
/* -------------------------------------------------------------------------- */

const followUser = async (req, res) => {
  if (req.body.id !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.id);
      if (!user.followings.includes(req.body.id)) {
        const userF = await user.updateOne({
          $push: { followings: req.body.id },
        });
        const curruser = await currentUser.updateOne({
          $push: { followers: req.params.id },
        });
        res.status(200).json({ msg: "user has been followed", user: userF });
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can't follow yourself");
  }
};

/* -------------------------------------------------------------------------- */
/*                                UNFOLLOW USER                               */
/* -------------------------------------------------------------------------- */

const unfollowUser = async (req, res) => {
  console.log(req.body.id, "call reached");
  if (req.body.id !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.id);
      if (user.followings.includes(req.body.id)) {
        const userData = await user.updateOne({
          $pull: { followings: req.body.id },
        });
        await currentUser.updateOne({ $pull: { followers: req.params.id } });
        res
          .status(200)
          .json({ msg: "user has been unfollowed", user: userData });
      } else {
        res.status(403).json("you don't follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can't unfollow yourself");
  }
};

/* -------------------------------------------------------------------------- */
/*                                CREATE A POST                               */
/* -------------------------------------------------------------------------- */

const createPost = async (req, res) => {
  let imagename;
  if (req.file) {
    imagename = req.file.filename;
  } else {
    imagename = "";
  }

  try {
    const postData = new Post({
      userId: req.body.User,
      image: imagename,
      Created: Date.now(),
      desc: req.body.desc,
    });
    let result = postData.save();
    if (result) {
      res.status(200).json({ status: true });
    } else {
      res.status(200).json({ status: false });
    }
  } catch (error) {
    console.log(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                               UPDATE  A POST                               */
/* -------------------------------------------------------------------------- */

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

/* -------------------------------------------------------------------------- */
/*                                DELETE A POST                               */
/* -------------------------------------------------------------------------- */

const deletePost = async (req, res) => {
  console.log("reached bvbnm");
  console.log(req.params.id, "hvbjkl");
  try {
    await Post.deleteOne({ _id: req.params.id });
    await CommentModel.deleteMany({ postId: req.params.id });
    console.log("post has deleted");
    res.status(200).json("the post has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

/* -------------------------------------------------------------------------- */
/*                                DELETE A JOB                                */
/* -------------------------------------------------------------------------- */

const deleteJob = async (req, res) => {
  try {
    await JobModel.deleteOne({ _id: req.params.id });
    res.status(200).json("the job has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

/* -------------------------------------------------------------------------- */
/*                             DELETE JOB REQUESTS                            */
/* -------------------------------------------------------------------------- */

const rejectJobRequests = async (req, res) => {
  try {
    await JobRequestModel.deleteOne({ _id: req.params.id });
    res.status(200).json("the job request has been rejected");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                                 LIKE A POST                                */
/* -------------------------------------------------------------------------- */

const LikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The Post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

/* -------------------------------------------------------------------------- */
/*                                 GET A POST                                 */
/* -------------------------------------------------------------------------- */

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* -------------------------------------------------------------------------- */
/*                           GET ALL TIMELINE POSTS                           */
/* -------------------------------------------------------------------------- */

const getAllPosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id }).sort({
      createdAt: -1,
    });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId }).sort({ createdAt: -1 });
      })
    );
    res.json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.json(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                                 FIND USERS                                 */
/* -------------------------------------------------------------------------- */

const findUsers = async (req, res) => {
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
/*                             FIND CLOSE FRIENDS                             */
/* -------------------------------------------------------------------------- */

const findCloseUsers = async (req, res) => {
  const id = req.params.id;
  try {
    User.find({ followings: id })
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
/*                              GET USER BY POST                              */
/* -------------------------------------------------------------------------- */

const getUserPost = async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* -------------------------------------------------------------------------- */
/*                               POST A COMMENT                               */
/* -------------------------------------------------------------------------- */

const addComment = async (req, res) => {
  const comment = new CommentModel(req.body);
  try {
    const comments = await comment.save();
    res.json(comments);
  } catch (error) {
    res.json(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                              GET POST COMMENTS                             */
/* -------------------------------------------------------------------------- */

const getPostComments = async (req, res) => {
  try {
    const postComment = await CommentModel.find({
      postId: req.params.id,
    }).populate("userId", "username");
    res.json(postComment);
  } catch (error) {
    res.json(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                                  ADD A JOB                                 */
/* -------------------------------------------------------------------------- */

const createjob = async (req, res) => {
  try {
    const newJob = new JobModel(req.body);
    await newJob.save();
    res.status(200).json(newJob);
  } catch (error) {
    console.log(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                                 FIND A JOB                                 */
/* -------------------------------------------------------------------------- */
const findJob = async (req, res) => {
  try {
    JobModel.find()
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
/*                                GET USER POST                               */
/* -------------------------------------------------------------------------- */

const userPost = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const userPosts = await Post.find({ userId: user._id }).sort({
      createdAt: -1,
    });
    res.json(userPosts);
  } catch (error) {
    res.json(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                                CREATE CHATS                                */
/* -------------------------------------------------------------------------- */

const createChat = async (req, res) => {
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.recieverId],
  });

  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                                 USER CHATS                                 */
/* -------------------------------------------------------------------------- */

const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: {
        $in: [req.params.userId],
      },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
/* -------------------------------------------------------------------------- */
/*                          FIND CHATS BETWEEN USERS                          */
/* -------------------------------------------------------------------------- */

const findChats = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: {
        $all: [req.params.firstId, req.params.secondId],
      },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                                 ADD MESSAGE                                */
/* -------------------------------------------------------------------------- */

const addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const message = new MessageModel({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                                GET MESSAGES                                */
/* -------------------------------------------------------------------------- */

const getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const result = await MessageModel.find({ chatId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                               GET USER BY ID                               */
/* -------------------------------------------------------------------------- */

const getUser = (req, res) => {
  const id = req.params.id;
  try {
    User.findById(id)
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
/*                                 REPORT POST                                */
/* -------------------------------------------------------------------------- */

const ReportPost = async (req, res) => {
  const ReportPost = new ReportModel(req.body);
  try {
    const Reports = await ReportPost.save();
    await PostModel.updateOne(
      { _id: req.body.postId },
      { $push: { Reports: req.body.userId } }
    );
    res.json(Reports);
  } catch (error) {
    res.json(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                                 REPORT JOB                                 */
/* -------------------------------------------------------------------------- */

const ReportJob = async (req, res) => {
  const ReportJob = new JobReportModel(req.body);
  try {
    const Reports = await ReportJob.save();
    await JobModel.updateOne(
      { _id: req.body.JobId },
      { $push: { Reports: req.body.userId } }
    );
    res.json(Reports);
  } catch (error) {
    res.json(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                              GET JOB    BY ID                              */
/* -------------------------------------------------------------------------- */

const getJObs = async (req, res) => {
  const id = req.params.id;
  try {
    await JobModel.findById(req.params.id)
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
/*                                JOB REQUESTS                                */
/* -------------------------------------------------------------------------- */

const jobRequests = async (req, res) => {
  try {
    const job = await JobModel.findById(req.params.id);

    // if (job.userId !== req.body.id) {

    if (!job.jobRequests.includes(req.body.userId)) {
      await job.updateOne({ $push: { jobRequests: req.body.userId } });
      res.status(200).json("The User has applied for Job");
    } else {
      res.status(404).json("You have already applied for this Job");
    }
    // } else {
    //     res.status(404).json("You posted this Job, So that You Can't Apply!");

    // }
  } catch (err) {
    res.status(500).json({ msg: "error occured" });
  }
};

/* -------------------------------------------------------------------------- */
/*                                  JOB APPLY                                 */
/* -------------------------------------------------------------------------- */

const JobApply = async (req, res) => {
  try {
    const JobApplyData = new JobRequestModel({
      Applicant: req.body.Applicant,
      Resume: req.file.filename,
      JobId: req.body.JobId,
      PostedBy: req.body.postedId,
      AppliedBy: req.body.AppliedBy,
      Created: Date.now(),
    });
    let result = await JobApplyData.save();
    if (!JobModel?.jobRequests?.includes(JobApplyData.Applicant)) {
      let data = await JobModel.updateOne(
        { _id: req.body.JobId },
        { $push: { jobRequests: JobApplyData.Applicant } }
      );

      if (result && data) {
        res.status(200).json({ status: true });
      } else {
        res.status(200).json({ status: false });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                              EDIT USER PROFILE                             */
/* -------------------------------------------------------------------------- */

const EditProfile = async (req, res) => {
  console.log("reavhed");
  console.log(req.params.id, "jhjhj");
  console.log(req.body, "popo");
  try {
    console.log("try");

    let editUser = await User.findById(req.params.id);
    let allUser = await User.find({ _id: { $nin: req.params.id } });
    let userNameExists = allUser.map((user) => {
      console.log(user.username);
      if (user.username == req.body.username) {
        return false;
      }
    });

    if (userNameExists.includes(false)) {
      console.log("usernameindu");
      res.status(200).json({ Update: false, msg: "User name already Exist" });
    } else {
      if (editUser) {
        console.log("else");
        if (req.file) {
          var file = true;
        } else {
          var file = false;
        }
        let edit = await User.updateOne(
          { _id: req.params.id },
          {
            $set: {
              profilePicture: file
                ? req.file.filename
                : editUser.profilePicture,
              username: req.body.username
                ? req.body.username
                : editUser.username,
              bio: req.body.bio ? req.body.bio : editUser.bio,
              phone: req.body.phone ? req.body.phone : editUser.phone,
            },
          },
          { upsert: true }
        );
        let user = await User.findOne({ _id: req.params.id });
        console.log(user, "hey ther");
        if (edit) {
          res
            .status(200)
            .json({ Update: true, msg: "Updated Successfully ", data: user });
        } else {
          res.status(200).json({ Update: false, msg: "Update not done" });
        }
      } else {
        console.log("kerilla");
        res.status(404).json("something went wrong");
      }
    }
  } catch (error) {
    res.status(500).json(error);
    console.log("error");
    console.log(error.message);
  }
};

/* -------------------------------------------------------------------------- */
/*                              VIEW JOB REQUESTS                             */
/* -------------------------------------------------------------------------- */

const viewJobRequests = async (req, res) => {
  const userId = req.params.id;
  try {
    let reports = await JobRequestModel.find({ PostedBy: userId }).sort({_id:-1}).populate(
      "JobId"
    );
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                                SEARCH USERS                                */
/* -------------------------------------------------------------------------- */

const SearchUsers = async (req, res) => {
  console.log("search data");
  let data = req.params.id;
  console.log(data, "searchusers");

  try {
    console.log("hey there");
    let users = await User.find({"username": {$regex: '^' + data, $options: 'i'}})
    //  let users= await User.find()
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  PostSignUp,
  PostLogin,
  UpdateUser,
  deleteUser,
  followUser,
  unfollowUser,
  createPost,
  updatePost,
  deletePost,
  LikePost,
  getPost,
  getAllPosts,
  findUsers,
  getUserPost,
  verifyOtp,
  addComment,
  getPostComments,
  createjob,
  findJob,
  findCloseUsers,
  userPost,
  createChat,
  userChats,
  findChats,
  addMessage,
  getMessages,
  getUser,
  ReportPost,
  getJObs,
  jobRequests,
  ReportJob,
  deleteJob,
  JobApply,
  viewJobRequests,
  rejectJobRequests,
  EditProfile,
  SearchUsers,
};
