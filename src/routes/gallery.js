const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload')
const imageController = require('../controllers/galleryController')
const security = require("../securerRoute/check")

const galleryRoutes = (app) =>
{
    app.use(fileUpload());
    router.get("/image/:id", security.checkLoggedIn,imageController.getSpecificImage);
    router.post("/addimage", security.checkLoggedIn,imageController.addImageToGallery);
    router.post('/updateimage/:id', security.checkLoggedIn, imageController.updateImageGallery);
    router.get("/getImagesPage", security.checkLoggedIn, imageController.getImages)
    router.get("/deleteimage/:id", security.checkLoggedIn, imageController.deleteImageFromGallery);
    return app.use("/api/image", router)
}


module.exports = {
    galleryRoutes
}