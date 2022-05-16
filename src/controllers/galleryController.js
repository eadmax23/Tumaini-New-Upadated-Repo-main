const gallery = require("../models/Gallery")
const path = require('path')
const utils = require('util')
const fs = require('fs')

const validateImage = (file) => {
    const errors = []
    const filesize = file.size / 1000000; // in mbs
    const filename = file.name

    if (filesize > 5) {
        errors.push({ name: "Image size should be less than 5 mbs" })
    }
    const imagesRegex = new RegExp("png|jpg|jepg|gif");
    const fileextname = path.extname(filename)
    if (!imagesRegex.test(fileextname)) {
        errors.push({ name: "Images only not other file" })
        console.log('image has been pushed  as the error')
    }
    // console.log(filename, filesize,fileextname)

    return errors;

}

const saveTheimage = async (fileReceived, url) => {
    const saved = await utils.promisify(fileReceived.mv)(url)
    console.log(saved)
    return saved
}
const addImageToGallery = async (req, res) => {
    try {
        const data = req.body
        // console.log(data.eventname, data.eventdecription)
        const imageReceived = req.files.eventimage
        const errors = validateImage(imageReceived)
        console.log(errors.length)
        if (errors.length > 0) {
            // we have got an error then we have to send back the form with the errors
            return res.render("galleryerror", { errors })
        }
        const url = "./src/public/Gallery/" + imageReceived.md5 + path.extname(imageReceived.name)
        console.log(url)
        // const savedImage = saveTheimage(imageReceived, url)
        imageReceived.mv(url, function (err) {
            if (err) {
                // throw "image failed to be saved"
                return res.render('404')
            }
            else {
                // let load the database and save the image path and its description
                const path = url.slice(12,)
                gallery.create(
                    {
                        imagename: path,
                        eventname: data.eventname,
                        eventDescription: data.eventdecription
                    }).then(saved => {
                        console.log(saved)
                        return res.redirect("/api/image/getImagesPage")
                    }).catch(err => {
                        console.log(err.message)
                        return res.render('404')
                    })
            }

        })
        // return res.send("Image has been added")
    }
    catch (err) {
        console.log(err.message)
        return res.render(404)
    }



}

const getImages = (req, res) => {
    try {
        gallery.find().sort({ _id: -1 }).limit(12)
            .then(images => {
                return res.render('showgallery', { images });
            })
            .catch(err => {
                console.log(err.message)
                return res.render('404')
            })

    }
    catch (err) {
        console.log(err.message)
        return res.render('404')
    }

}
const deleteImageFromGallery = (req, res) => {
    try {
        const id = req.params.id
        gallery.findById(id)
            .then(imgdata => {
                // let first delete the img 
                const path = "./src/public" + imgdata.imagename;
                fs.unlink(path, (err) => {
                    if (err) {
                        return res.render("404")
                    }
                    else {
                        // then lets delete the other data in the data
                        console.log("ready deleted the image")
                        gallery.deleteOne({ _id: id })
                            .then(deletedOne => {
                                return res.redirect("/api/image/getImagesPage")
                            })
                    }
                })
            })
    }
    catch (err) {
        console.log(err.message)
        return res.render('404')
    }
}

const updateImageGallery = (req, res) => {
    const id = req.params.id
    const data = req.body
    const imageReceived = req.files.eventimage
    const errors = validateImage(imageReceived)
    if (errors > 0) {
        return res.render("galleryerrorInUpdating", { errors, id })
    }
    // here we have to delete the file image we have 
    gallery.findById(id)
        .then(obtained => {
            const obtainedImage = "./src/public" + obtained.imagename
            fs.unlink(obtainedImage, (err) => {
                if (err) {
                    console.log(err.message)
                    return res.render('404')
                }
                else {
                    const url = "./src/public/Gallery/" + imageReceived.md5 + path.extname(imageReceived.name)
                    console.log(url)
                    // const savedImage = saveTheimage(imageReceived, url)
                    imageReceived.mv(url, function (err) {
                        if (err) {
                            // throw "image failed to be saved"
                            return res.render('404')
                        }
                        else {
                            // let load the database and save the image path and its description
                            const path = url.slice(12,)
                            gallery.updateOne({ _id: id }, {
                                imagename: path,
                                eventname: data.eventname,
                                eventDescription: data.eventDescription
                            }).then(saved => {
                                console.log(saved)
                                return res.redirect("/api/image/getImagesPage")
                            })
                        }

                    })
                }
            })
        })
        .catch(err => {
            console.log(err.message)
            return res.render('404')
        })


}

const getSpecificImage = (req, res) => {
    try {
        const id = req.params.id
        gallery.findById(id)
            .then(data => {
                return res.render('updategallery', { data })
            })
            .catch(err => {
                console.log(err.message)
                return res.render('404')
            })

    }
    catch (err) {
        console.log(err.message)
        return res.render('404')
    }
}


module.exports = {
    getSpecificImage,
    addImageToGallery,
    updateImageGallery,
    deleteImageFromGallery,
    getImages
}