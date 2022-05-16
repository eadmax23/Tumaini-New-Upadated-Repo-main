const express = require("express");
const controller = require("../controllers/homePageController")
let router = express.Router();
const security = require("../securerRoute/check")

let newRoutes = (app) => {
    router.post("/update/:id",security.checkLoggedIn, controller.newsUpdate);
    router.get("/delete/:id",security.checkLoggedIn, controller.newsDelete);
    router.get("/news",security.checkLoggedIn, controller.news);
    router.get("/UpdatePage/:id",security.checkLoggedIn, controller.getUpdate)
    router.get("/showNewsAdmin",security.checkLoggedIn, controller.shownewsAdmin)
    router.get("/createNews",security.checkLoggedIn, controller.postNews)
    router.post('/creates',security.checkLoggedIn, controller.creates)
    return app.use("/api/news", router);
};

module.exports = 
{
    newRoutes
}
