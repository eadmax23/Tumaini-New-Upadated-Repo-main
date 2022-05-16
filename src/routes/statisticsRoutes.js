const express = require("express");
const router = express.Router();
const StatisticsController = require("../controllers/statisticController")
const security = require("../securerRoute/check")

const staticsRoutes = (app) =>
{
    router.get("/statistics",security.checkLoggedIn ,StatisticsController.statistics);
    router.delete("/statistics",security.checkLoggedIn, StatisticsController.Delete);
    router.post("/createStatistics",security.checkLoggedIn ,StatisticsController.create);
    router.post("/update", security.checkLoggedIn,StatisticsController.update)
    router.get("/requpdate/:id",security.checkLoggedIn ,StatisticsController.populate)
    return app.use("/api/statistics", router)
}

module.exports = staticsRoutes;
