const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
//const position = require("../public/client/Tuma/pictures/")

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/client/Tuma/pictures/");
  },
  filename: function (req, file, cb) {
    var filenam = uuidv4() + path.extname(file.originalname);
    cb(null, filenam);
  },
});

const upload = multer({
  storage: diskStorage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: function (req, file, cb) {
    validateFile(file, cb);
  },
}).single("photo");
function validateFile(file, cb) {
  var Fileextensions = /jpeg|jpg|png|gif/;
  var exten = Fileextensions.test(
    path.extname(file.originalname).toLowerCase()
  );
  var mineType = Fileextensions.test(file.mimetype);
  console.log(exten, mineType);
  if (exten && mineType) {
    cb(null, true);
  } else {
    cb("Error: Images Only");
  }
}

const Info = require("../models/info");

const infoUpdate = (req, res) => {
  // we have to delele the given image from the public folder when we have succesfull

  upload(req, req.file, (err) => {
    if (err) {
      let {
        email,
        firstname,
        lastname,
        title,
        contact,
        location,
        roles,
        subjects,
      } = req.body;
      if (location == "1") {
        location = "Certificate";
      }
      if (location == "2") {
        location = "Diploma";
      }
      if (location == "3") {
        location = "Degree";
      }
      if (title == "1") title = "Mr";
      if (title == "2") title = "Madam";

      var data = {
        title: title,
        location: location,
        subjects: subjects,
        contact: contact,
        firstname: firstname,
        roles: roles,
        lastname: lastname,
        email: email,
        erro: err,
        id: req.params.id,
      };
      return res.render("upadatestaff", { data }); // we display the upadate table with the field that were filled in
      // no deleting but rerendering the page with the data that we have obtained before
    } else {
      // no error the we have to delete the fist the file that we have received
      Info.findById(req.params.id)
        .then((imag) => {
          //console.log('./src/public' + ima.pictureiD);
          fs.unlink("./src/public" + imag.pictureiD, (err) => {
            if (err) {
              console.log("Delete faailed...");
              console.log(err.message);
              // re-render the page and allow the user to enter again the informatio
            } else {
              let {
                email,
                firstname,
                lastname,
                title,
                contact,
                location,
                roles,
                subjects,
              } = req.body;
              if (location == "1") {
                location = "Certificate";
              }
              if (location == "2") {
                location = "Diploma";
              }
              if (location == "3") {
                location = "Degree";
              }
              if (title == "1") title = "Mr";
              if (title == "2") title = "Madam";
              Info.updateOne({_id: req.params.id},
                {
                  firstname,
                  lastname,
                  email,
                  contact,
                  location,
                  roles,
                  subjects,
                  title,
                  pictureiD: req.file.path.slice(10),
                },
                { where: { id: req.params.id } }
              ).then((updated) => {
                return res.redirect("/api/info/info");
              });
            }
          });
        })
        .catch((err) => {
          res.redirect("/404");
          console.log(err.message);
        });
    }
  });
};

const getupdate = (req, res) => {
  let id = req.params.id;
  // here there was an issue but it has been fixed
  Info.findById(id)
    .then((data) => {
      return res.render("upadatestaff", { data });
    })
    .catch((err) => {
      console.log(err.message);
      return res.redirect("/404");
    });
};

const infoDelete = (req, res) => {
  // pass the multer id
  let id = req.params.id;
  return Info.deleteOne({_id: id})
    .then((deleted) => {
      console.log(deleted);
      res.redirect("/api/info/info");
    })
    .catch((err) => res.redirect("/404"));
};
const infoShow = (req, res) => {
  Info.find()
    .then((all) => {
      return res.render("staffTable", { all });
    })
    .catch((err) => {
      console.log(err.message);
      return res.redirect("/404");
    });
};

const createInfo = (req, res) => {
  // I have to play with the given file to ensure that the extenson are well configured
  upload(req, req.file, (err) => {
    if (err) {
      let {
        email,
        firstname,
        lastname,
        title,
        contact,
        location,
        roles,
        subjects,
      } = req.body;
      if (location == "1") {
        location = "Certificate";
      }
      if (location == "2") {
        location = "Diploma";
      }
      if (location == "3") {
        location = "Degree";
      }
      if (title == "1") title = "Mr";
      if (title == "2") title = "Madam";

      const staff = {
        email: email,
        lastname: lastname,
        contact: contact,
        roles: roles,
        firstname: firstname,
        subjects: subjects,
        title: title,
        location: location,
      };
      console.log(staff.email);
      console.log(staff.contact);
      console.log(err);
      const erro = {
        errorName: err,
      };
      return res.render("addStaffFailure", { erro, staff });
    } else {
      // safe then We can direct and do what we are to do
      console.log("Reached.....");
      console.log(req.file);
      console.log("Path", req.file.path.slice(10));
      let {
        email,
        firstname,
        lastname,
        title,
        contact,
        location,
        roles,
        subjects,
      } = req.body;
      if (location == "1") {
        location = "Certificate";
      }
      if (location == "2") {
        location = "Diploma";
      }
      if (location == "3") {
        location = "Degree";
      }
      if (title == "1") title = "Mr";
      if (title == "2") title = "Madam";
      return Info.create({
        email,
        firstname,
        lastname,
        title,
        location,
        roles,
        subjects,
        contact,
        pictureiD: req.file.path.slice(10),
      })
        .then((saved) => {
          res.redirect("/api/info/info");
        })
        .catch((err) => {
          console.log(err.message);
          res.redirect("/404");
        });
    }
  });
};
module.exports = {
  createInfo,
  infoDelete,
  infoShow,
  infoUpdate,
  getupdate,
};
