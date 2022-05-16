const express = require("express");
const infoController = require("../controllers/infoController")
const router = express.Router();
const security = require("../securerRoute/check")


let infoRoutes = (app) =>
{
    router.post('/update/:id',security.checkLoggedIn,infoController.infoUpdate);
    router.get("/delete/:id", security.checkLoggedIn,infoController.infoDelete);
    router.get("/info", security.checkLoggedIn,infoController.infoShow);
    router.get("/getUpdate/:id", security.checkLoggedIn,infoController.getupdate)
    router.post("/createInfo",security.checkLoggedIn, infoController.createInfo);
    return app.use("/api/info",router);
}

module.exports = {infoRoutes:infoRoutes}