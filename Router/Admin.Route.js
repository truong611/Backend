const AdminController = require("../controller/Admin.Controller");

const Router = require("express").Router();

Router.post("/addClub", AdminController.addClub);
Router.post("/addLeague", AdminController.addLeague);
Router.post("/addNews", AdminController.addNews);
Router.post("/addScore", AdminController.addScore);
Router.post("/addULC", AdminController.addULC);
Router.post("/editNews", AdminController.editNews);
Router.post("/deleteCommet", AdminController.adminDeleteComment);
Router.post("/score", AdminController.deleteScore);
Router.post("/ucl", AdminController.deleteUCL);

module.exports = Router;
