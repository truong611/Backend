const League = require("../model/League");
const News = require("../model/News");
const User = require("../model/User");
const Score = require("../model/Score");
const ULC = require("../model/ULC");

module.exports = {
  userCreateAccount: async (req, res) => {
    const userExist = await User.findOne({ userName: req.body.userName });
    if (userExist) {
      return res.status(200).send({ msg: "Username exists", status: false });
    }
    const user = await User(req.body);
    await user.save();
    res
      .status(200)
      .send({ msg: "create new user success", status: true, user: user });
  },
  userComment: async (req, res) => {},
  userUpdateAccount: async (req, res) => {},
  userGetLeague: async (req, res) => {
    const league = await League.find()
      .populate({
        path: "clubs",
        populate: {
          path: "cId",
          model: "Club",
        },
      })
      .exec();
    console.log(league);
    res.json(league);
  },
  userGetTranfer: async (req, res) => {
    const tranfer = await News.find({
      typeNews: { $eq: 0 },
    });
    res.json(tranfer);
  },
  userUCL: async (req, res) => {
    const tranfer = await News.find({
      typeNews: { $eq: 1 },
    });
    res.json(tranfer);
  },
  userGetScore: async (req, res) => {
    const score = await Score.find().populate("guest").populate("home");
    console.log(score);
    res.json(score);
  },
  userGetULC: async (req, res) => {
    const score = await ULC.find().populate("guest").populate("home");
    console.log(score);
    res.json(score);
  },
  userLogin: async (req, res) => {
    const user = await User.findOne(req.body);
    if (!user) {
      return res.json({ isLogin: false });
    }
    res.json({ isLogin: true, uId: user._id, avatar: user.avatar });
  },
  userGetInfo: async (req, res) => {
    const info = await User.findById(req.body.id);
    res.json(info);
  },
  userUpdateInfo: async (req, res) => {
    const user = await User.findById(req.body._id);
    user.userName = req.body.userName;
    user.password = req.body.password;
    await user.save();
    res.json({ isSucess: true, user });
  },
  userUploadAvatar: async (req, res) => {
    const user = await User.findById(req.body._id);
    user.avatar = "http://localhost:8080/img/" + req.file.filename;
    await user.save();
    res.json({ isSucess: true, user });
  },
  userGetLeagueByTeam: async (req, res) => {
    const league = await Score.find({ guest: req.params.id })
      .populate("guest")
      .populate("home");
    const league2 = await Score.find({ home: req.params.id })
      .populate("guest")
      .populate("home");
    const result = league.concat(league2);
    res.json(result);
  },
  getTeamByLeague: async (req, res) => {
    const team = await League.findById(req.params.id)
      .populate({
        path: "clubs",
        populate: {
          path: "cId",
          model: "Club",
        },
      })
      .exec();
    res.json(team);
  },
  deletePost: async (req, res) => {
    await News.deleteOne({ _id: req.body.id });
    res.json({ oke: "oke" });
  },
  userAddcomment: async (req, res) => {
    const posts = await News.findById(req.body.pid);
    posts.comment = posts.comment.concat({
      uId: req.body.uId,
      comment: req.body.comment,
    });
    await posts.save();
    res.json(posts);
  },
  getAllComment: async (req, res) => {
    const posts = await News.findById(req.params.id).populate("comment.uId");
    res.json(posts);
  },
  searchScore: async (req, res) => {
    const home = await Score.find().populate("guest").populate("home");
    const result = [];
    home.map((el) => {
      if (
        el.home.clubName.includes(req.params.search) ||
        el.guest.clubName.includes(req.params.search)
      ) {
        result.push(el);
      }
    });
    res.json(result);
  },
  searchUCL: async (req, res) => {
    const home = await ULC.find().populate("guest").populate("home");
    const result = [];
    home.map((el) => {
      if (
        el.home.clubName.includes(req.params.search) ||
        el.guest.clubName.includes(req.params.search)
      ) {
        result.push(el);
      }
    });
    res.json(result);
  },
};
