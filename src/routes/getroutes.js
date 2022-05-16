const express = require("express");
const router = express.Router();
const getControllers = require("../controllers/getcontroller");
const security = require("../securerRoute/check")

const normalRoutes = (app) =>
{
    router.get("/dashboard", security.checkLoggedIn,getControllers.dashboard);
    router.get("/addStaff", security.checkLoggedIn,getControllers.addStaff);
    router.get("/staffTable", security.checkLoggedIn,getControllers.staffTable);
    router.get("/quickPost", security.checkLoggedIn,getControllers.quickPost);
    router.get("/enrolment", security.checkLoggedIn,getControllers.enrolment);
    router.get("/postimageToGallery", security.checkLoggedIn, getControllers.postimageToGallery)
    router.get("/login",security.checkLoggedOut,getControllers.login)
    router.get("/statistic", security.checkLoggedIn,getControllers.static)
    router.post("/create/statistic", security.checkLoggedIn,getControllers.create)
    router.get("/create/statistic/:id",security.checkLoggedIn ,getControllers.updateStatistic)
    router.post("/update/statistic/:id", security.checkLoggedIn,getControllers.updatenow)// controller for query for updating the db
    return app.use("/", router);
}
module.exports = normalRoutes;