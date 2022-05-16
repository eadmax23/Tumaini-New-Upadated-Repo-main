const Statistics = require("../models/statistics");

const dashboard = (req, res) =>
{
    res.render("home");
}

const addStaff = (req, res) =>
{
    res.render("addStaff")
}

const staffTable = (req, res) =>
{
    return res.render("staffTable")
}
const quickPost = (req, res) =>
{
    return res.render("quickPost")
}
const create = (req, res) => {
    let { noStudents, noWorkers, noSupporter, noStaffs } = req.body;
    if (
      noStudents == "" ||
      noWorkers == "" ||
      noSupporter == "" ||
      noStudents == ""
    ) {
      res.send("There was error can't create the stastic");
    }
    // we have got the data then we have to insert them to the db
    else {
      return Statistics.create({
        noStaffs,
        noSupporter,
        noWorkers,
        noStudents,
      })
        .then((static) => {
          console.log("Succesful created main static");
          res.redirect("/statistic");
        })
        .catch((err) => {
          console.log(err.message);
          res.render(404);
        });
    }
  };

const postimageToGallery = (req, res) =>
{
  return res.render('gallery')
}

const static = (req, res) =>
{
    return Statistics.find()
            .then(statics =>
                {
                    res.render("statistic", {statics})
                })
            .catch(err => console.log(err.message));
}

const enrolment = (req, res)=>
{
    return res.render("enrolment")
}
const login = (req, res) =>
{
    return res.render("login")
}

const updateStatistic = (req, res)=>
{
    let id = req.params.id;
    return Statistics.findById(id)
    .then(one =>
      {
        res.render("enrolmentupdate.ejs", {one})
      })
    .catch(err =>
      {
        console.log(err.message)
        res.render(404, {error: "Failed to pass data to the "})
      })
}

const updatenow = (req, res) =>
{
  let id = req.params.id
  let { noStaffs, noStudents, noSupporter, noWorkers} = req.body
  return Statistics.updateOne({_id: id},{noSupporter,noStaffs,noWorkers,noStudents})
  .then(updated =>
      {
        console.log("Succesfuly updated the data....")
        res.redirect("/statistic")
      })
      .catch(err =>
        {
          console.log(err.message)
        })


}

module.exports ={
    dashboard: dashboard,
    addStaff: addStaff,
    staffTable: staffTable,
    quickPost: quickPost,
    enrolment,
    login,
    static,
    create,
    updateStatistic,
    updatenow,
    postimageToGallery
}