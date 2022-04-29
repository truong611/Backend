const UserController = require("../controller/User.Controller");
var multer = require("multer");
var path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

const Router = require("express").Router();

Router.get("/league", UserController.userGetLeague);
Router.get("/tranfer", UserController.userGetTranfer);
Router.get("/ucl", UserController.userUCL);
Router.get("/score", UserController.userGetScore);
Router.get("/getULC", UserController.userGetULC);
Router.post("/login", UserController.userLogin);
Router.post("/createAccount", UserController.userCreateAccount);
Router.post("/info", UserController.userGetInfo);
Router.post("/update", UserController.userUpdateInfo);

Router.post(
  "/upload",
  upload.single("avatar"),
  UserController.userUploadAvatar
);
Router.get("/leagueById/:id", UserController.userGetLeagueByTeam);
Router.get("/leagueByTeam/:id", UserController.getTeamByLeague);
Router.post("/deletePost", UserController.deletePost);
Router.post("/userAddcomment", UserController.userAddcomment);
Router.get("/userGetAllComment/:id", UserController.getAllComment);
Router.get("/searchScore/:search", UserController.searchScore);
Router.get("/searchUCL/:search", UserController.searchScore);

module.exports = Router;
