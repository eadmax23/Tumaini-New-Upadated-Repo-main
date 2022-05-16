const express = require("express")
const router = express.Router();
const profileController = require("../controllers/profileController");

const security = require("../securerRoute/check");

const profileRoutes = (app) =>
{
    router.get('/profile', security.checkLoggedIn, profileController.profile);
    router.post('/updateProfile',security.checkLoggedIn, profileController.updateProfile)
    router.get("/changePassword",security.checkLoggedIn, profileController.changePassword)
    router.get("/update", security.checkLoggedIn, profileController.geteUpdatePage)
    router.get("/adduserAsAdmin", security.checkLoggedIn, profileController.addUserAsAdmin)
    router.post("/addAdmin", security.checkLoggedIn, profileController.addAdmin )
    router.get("/showAllAdmins", security.checkLoggedIn, profileController.showAllAdmins)
    router.post("/superAdmin/DeleteAdmin", security.checkLoggedIn, profileController.superAdminDelete)
    router.get("/showTheAdminPageForChanges", security.checkLoggedIn, profileController.showTheAdminPageForChanges)
    return app.use("/api/profile", router);
}

    



module.exports = {profileRoutes: profileRoutes}