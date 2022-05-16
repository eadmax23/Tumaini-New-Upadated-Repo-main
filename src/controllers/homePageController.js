const News = require("../models/news");


const shownewsAdmin = (req, res) => {
    return News.find().sort({createdAt: -1}).limit(30)
        .then(news => {
            console.log("Fetching the data....")
            res.render("newsShow", { news })
        })
        .catch(err => {
            console.log(err.message)
            res.render('404')
        })
}

// for testing purpose


const creates = (req, res) => {
    var { category, time, contact, content, title, location, partcipants, snippet } = req.body
    //console.log(category,time,contact,content,title,location,partcipants)if
    // let format the option data 
    if (category == "1") { category = "Academic" }
    if (category == "2") { category = "Laboratory" }
    if (category == "3") { category = "Library" }
    if (category == "4") { category = "Sports & Games" }
    if (category == "5") { category = "Services" }
    if(category == "6"){category = 'Project'}
    if(category == '7') {category ='Partnership'}
    if (partcipants == "1") { partcipants = "Students" }
    if (partcipants == "2") { partcipants = "Teachers" }
    if (partcipants == "3") { partcipants = "Parents" }
    if (partcipants == "4") { partcipants = "Teachers & Students" }
    if (partcipants == "5") { partcipants = "Parents and Students" }
    if (partcipants == "6") { partcipants = "Parents and Teachers" }
    if (partcipants == "7") { partcipants = "Parents and School Board" }
    if (partcipants == "8") { partcipants = "School Board" }
    if (partcipants == "9") { partcipants = "All" }
    return News.create({ category, title, content, contact, time, location, partcipants, snippet })
        .then(created => {
            res.redirect("/api/news/showNewsAdmin");
        })
        .catch(err => {
            console.log(err.message)
            res.render(404)
        })

}


const getUpdate = (req, res) => {
    let id = req.params.id
    return News.findById(id)
        .then(one => {
            res.render("upadatePost", { one })
        })
        .catch(err => {
            console.log(err.message)
            res.redirect("/404")
        })
}

const homepage = (req, res) => {
    return res.render("homepage")
}

const newsUpdate = (req, res) => {
    // find by the id and then upadate the details given
    var { category, time, contact, content, title, location, partcipants, snippet } = req.body
    var id = req.params.id
    //console.log(category,time,contact,content,title,location,partcipants)if
    // let format the option data 
    if (category == "1") { category = "Academic" }
    if (category == "2") { category = "Laboratory" }
    if (category == "3") { category = "Library" }
    if (category == "4") { category = "Sports & Games" }
    if (category == "5") { category = "Services" }
    if(category == "6"){category = 'Project'}
    if(category=='7'){category = 'Partnership'}
    if (partcipants == "1") { partcipants = "Students" }
    if (partcipants == "2") { partcipants = "Teachers" }
    if (partcipants == "3") { partcipants = "Parents" }
    if (partcipants == "4") { partcipants = "Teachers & Students" }
    if (partcipants == "5") { partcipants = "Parents and Students" }
    if (partcipants == "6") { partcipants = "Parents and Teachers" }
    if (partcipants == "7") { partcipants = "Parents and School Board" }
    if (partcipants == "8") { partcipants = "School Board" }
    if (partcipants == "9") { partcipants = "All" }
    return News.findById(id)
        .then(one => {
            if (one) {
                // we have got the correct id and we can update the information
                return News.updateOne({ _id: id }, { category, title, content, contact, time, location, partcipants, snippet })
                    .then(updated => {
                        res.redirect("/api/news/showNewsAdmin");
                    })
            }
            if (!one) {
                console.log("Invalid id for deleting the news")
                res.redirect("/404")
            }
        })
        .catch(err => {
            console.log(err.message)
            res.redirect("/404")
        })

}

const newsDelete = (req, res) => {

    let id = req.params.id
    console.log(id)
    return News.findById(id) // here we can pass some of the dummy data for the finding of the query
        .then(newObtained => {
            if (newObtained) {
                let id = newObtained.id;
                return News.deleteOne({ _id: id })
                    .then(deleted => {
                        console.log("deleted succesfull")
                        console.log(deleted)
                        res.redirect("/api/news/showNewsAdmin")
                    })
            }
            else if (!newObtained) {
                console.log("Mising redirecting....")
                res.redirect("/404")
            }

        })
        .catch(err => {
            console.log("Something has went wrong while trying to get data......");
            console.log(err.message)
            res.redirect("/404")
        })
}





const news = (req, res) => {
    // fetch all the data from the news tables
    // we have to fetch by limits from the bottom to the latest by getting the newest one first
    return News.find()
        .then(news => {
            news.forEach(fg => {
                console.log(fg.id)
            })
            // then we pass this news to the front end
            res.send("Data have been loaded...")
        })
        .catch(err => {
            console.log("error occured while fetching data..")
            console.log(err.message)
            res.send("404 data can't be obtained")
        })
}

const postNews = (req, res) => {
    let { title, content, category, time, location, partcipants } = req.body;
    let error = []
    // some of the important parts that have to be filled are title/ content/ patcipants/category
    if (title == '' || content == '' || location == '' || category == '' || time == '' || partcipants == '') {
        error.push({ name: "Some of the data are not sent" })
        console.log("Field missing.......")
    }

    // let check the important parts if their missing then we cant post the data to the database.
    if (title == "" || content == "" || partcipants == "" || category == "") {
        // then we can't create the News since the data has to be entered first
        console.log("Bug has happened some of important data were about to be sent");
        // alert the frontend{msg: fill all the important parts title, content, category, partcipants}
        res.send("Important data missing News can't be created");
    }
    else {
        News.create({ title, content, location, partcipants, category, time })
            .then(succ => {
                console.log("Succesful Created One News Post...");
                res.send("One new was created");
            })
            .catch(err => {
                console.log(err.message)
            })
    }
}




module.exports =
{
    homepage: homepage,
    newsUpdate,
    newsDelete,
    news,
    postNews,
    creates,
    shownewsAdmin,
    getUpdate
}