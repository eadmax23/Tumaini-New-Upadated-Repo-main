
 const express = require("express")
 const router = express.Router();
 const clientController = require("../controllers/clientController")
 const security = require("../securerRoute/check")

 const clientGetRoutes = (app) =>
 {

     router.get("/statistic",security.checkLoggedIn,clientController.getStastic)
     return app.use("/api", router)
 }


 module.exports = {
     clientGetRoutes
 }