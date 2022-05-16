const Statistics = require("../models/statistics");

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

const update = (req, res) => {

};

const populate = (req, res) => {
  const id= req.params.id;
  console.log(id)
  return Statistics.findById(id)
  .then(one =>
    {
        res.redirect("/enrolment")
    })
  .catch(err => 
    {
        console.log(err.message)
        res.render(404)
    });
};




const Delete = (req, res) => {
  return res.send("deleting....");
};
const statistics = (req, res) => {
  Statistics.find()
    .then((contact) => {
      console.log(contact.noStaffs);
      console.log(contact.noSupporter);
      res.send("Supposrtes" + String(contact.noSupporter));
    })
    .catch((err) => {
      console.log(err.message);
      res.send("Bad gateway...");
    });
};

module.exports = {
  create,
  update,
  Delete,
  statistics,
  populate
};
