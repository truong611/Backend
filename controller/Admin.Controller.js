const User = require("../model/User");
const Club = require("../model/Club");
const News = require("../model/News");
const Score = require("../model/Score");
const ULC = require("../model/ULC");
const League = require("../model/League");

module.exports = {
  // addLeague: async (req, res) => {
  //     const user = await User(req.body)
  //     await user.save()
  //     res.status(200).json(user)
  // },
  addNews: async (req, res) => {
    const news = await News(req.body);
    await news.save();
    res.status(200).json(news);
  },

  addScore: async (req, res) => {
    try {
      const score = await Score(req.body);
      await score.save();
      res.status(200).json(score);
    } catch (error) {
      res.status(200).json(error);
    }
  },
  addULC: async (req, res) => {
    try {
      const score = await ULC(req.body);
      await score.save();
      res.status(200).json(score);
    } catch (error) {
      res.status(200).json(error);
    }
  },
  addClub: async (req, res) => {
    const club = await Club(req.body);
    await club.save();
    res.status(200).json(club);
  },
  addLeague: async (req, res) => {
    const isLeague = await League.findOne({ name: req.body.name });
    if (isLeague) {
      isLeague.clubs = isLeague.clubs.concat(req.body.clubs);
      await isLeague.save();
      return res.status(200).json(isLeague);
    }
    const league = await League(req.body);
    await league.save();
    res.status(200).json(league);
  },
  editNews: async (req, res) => {
    console.log(req.body.id);
    const newc = await News.findById(req.body.id);
    console.log(newc);
    newc.title = req.body.title;
    newc.link = req.body.link;
    await newc.save();
    res.status(200).json(newc);
  },
  adminDeleteComment: async (req, res) => {
    const posts = await News.findById(req.body.pId);
    posts.comment = posts.comment.filter((el) => el._id != req.body.cId);
    await posts.save();
    res.json(posts);
  },
  deleteScore: async (req, res) => {
    const posts = await Score.findById(req.body.pId);
    posts._id = posts.filter((el) => el._id != req.body.cId);
    await posts.save();
    res.json(posts);
  },
  deleteUCL: async (req, res) => {
    const posts = await News.findById(req.body.pId);
    posts.comment = posts.comment.filter((el) => el._id != req.body.cId);
    await posts.save();
    res.json(posts);
  },
};
