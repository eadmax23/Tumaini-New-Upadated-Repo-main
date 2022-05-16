const express = require("express");
const router = express.Router();
var client = require("../controllers/clientsController")

const rendering = (app) =>
{

    // router.get("/home", client.state)
    //router.get("/404", client.404)
    router.get('/about', client.about)
    router.get("/sport", client.sport)
    router.get("/partnership", client.partnership)
    router.get("/service", client.service)
    router.get("/home", client.home)
    router.get("/gallery", client.gallery)
    router.get("/laboratory", client.laboratory)
    router.get("/progress", client.progress)
    router.get("/library", client.library)
    router.get("/projects", client.projects)
    router.get("/contact", client.contact);
    router.get("/staffs", client.staffs)
    router.get("/course", client.course)
    router.get("/academic",  client.academic)
    router.get("/updates", client.updates)
    router.get("/updates/:id", client.newSpecific)
    return app.use("/", router)
}


module.exports = 
{
    rendering: rendering
}