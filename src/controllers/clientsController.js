const Statistics = require("../models/statistics")
const Info = require("../models/info")
const News = require("../models/news")
const Gallery = require("../models/Gallery")


const home = (req, res) => {
    // here the news and staffs have to be updated then let attach some of the promises 

    Info.find().limit(6)
        .then(staffs => {
            // console.log(staffs)
            News.find().sort({ _id: -1 }).limit(6)
                .then(news => {
                    Gallery.find().sort({ createdAt: -1 }).limit(30)
                    .then(images =>
                        {
                            if (news.length % 2 == 1) {
                                var newsDivisionPoint = Math.round(news.length / 2)
                            }
                            else {
                                var newsDivisionPoint = news.length / 2
                            }
                            if (staffs.length % 2 == 1) {
                                var staffsDivisionPoint = Math.round(staffs.length / 2)
                            }
                            else {
                                var staffsDivisionPoint = staffs.length / 2;
                            }
        
        
                            return res.render("client/index", { staffs, images,news, staffsDivisionPoint, newsDivisionPoint })
                        })
                    // then we have to do the divison point for the 
                    

                })

        })

        .catch(err => {
            console.log(err.message)
            return res.redirect("/404")
        })

}


const staffs = (req, res) => {
    Info.find().limit(30)
        .then(staffs => {

            if (staffs.length % 2 == 0) {
                // then here we can just slice the array into two parties
                // division point
                let divisionPoint = staffs.length / 2;
                return res.render("client/staffs", { staffs: staffs, divisionPoint: divisionPoint })
            }
            // here we will have to do approximation  then how are we going to do so
            divisionPoint = Math.round(staffs.length / 2);
            return res.render('client/staffs', { staffs: staffs, divisionPoint: divisionPoint })
        })
        .catch(err => {
            console.log(err.message)
            res.render("404")
        })
}
const progress = (req, res) => {
    res.render("client/progress")
}


const sport = (req, res) => {
    // res.render("client/sports")
    News.find({category: 'Sports & Games'}).sort({createdAt: -1}).limit(5)
    .then(listedspoUpdates =>
        {
            return res.render("client/sports", {listedspoUpdates})
        })
    .catch(err =>
        {
            console.log(err.message)
            return res.render('404')
        })
}


const about = (req, res) => {
    res.render("client/about")
}
const partnership = (req, res) => {
    News.find({category: 'Partnership'}).sort({createdAt: -1}).limit(5)
    .then(listedpartUpdates =>
        {
            return res.render("client/partnership", {listedpartUpdates})
        })
    .catch(err =>
        {
            console.log(err.message)
            return res.render('404')
        })

}

const service = (req, res) => {
    News.find({category: 'Services'}).sort({createdAt: -1}).limit(5)
    .then(listedServiceUpdates =>
        {
            return res.render("client/services", {listedServiceUpdates})
        })
    .catch(err =>
        {
            console.log(err.message)
            return res.render('404')
        })
}



const state = (req, res) => {
    return Info.find()
        .then(da => {
            res.json(da)
        })
        .catch(err => {
            res.send("err")
        })

}

const academic = (req, res) => {
    News.find({category: 'Academic'}).sort({createdAt: -1}).limit(4)
    .then(listedAcademicUpdates =>
        {
            return res.render("client/academic", {listedAcademicUpdates})
        })
    .catch(err =>
        {
            console.log(err.message)
            return res.render('404')
        })
    
}
const course = (req, res) => {
    res.render("client/courses")
}

const contact = (req, res) => {
    res.render("client/contact")
}

const laboratory = (req, res) => {
    News.find({category: 'Laboratory'}).sort({createdAt: -1}).limit(5)
    .then(listedlabUpdates =>
        {
            return res.render("client/laboratory", {listedlabUpdates})
        })
    .catch(err =>
        {
            console.log(err.message)
            return res.render('404')
        })

}

const library = (req, res) => {
    News.find({category: 'Library'}).sort({createdAt: -1}).limit(5)
    .then(listedlibUpdates =>
        {
            return res.render("client/library", {listedlibUpdates})
        })
    .catch(err =>
        {
            console.log(err.message)
            return res.render('404')
        })
}

const projects = (req, res) => {
    News.find({category: 'Project'}).sort({createdAt: -1}).limit(5)
    .then(listedProjectUpdates =>
        {
            return res.render("client/project", {listedProjectUpdates})
        })
    .catch(err =>
        {
            console.log(err.message)
            return res.render('404')
        })
}


const newSpecific = (req, res) => {
    const id = req.params.id
    News.findById(id)
        .then(obtained => {
            // we need too to pass the specific recently like 6 recently news
            News.find().sort({createdAt: -1}).limit(5)
            .then(listedUpdates =>
                {

                    return res.render("client/specificNew", {obtained, listedUpdates})

                })
            
        })
        .catch(err => {
            console.log(err.message)
            return res.render("404")
        })
}
const updates = (req, res) => {
    News.find().sort({ createdAt: -1 }).limit(30)
        .then(news => {
            if (news.length % 2 == 1) {
                var newsLe = Math.round(news.length / 2);
            }
            else {
                var newsLe = news.length / 2
            }
            return res.render("client/updates", { news: news, newsLength: newsLe })
        })
        .catch(err => {
            console.log(err.message)
            return res.render("404")
        })
}

const gallery =  async (req, res) =>
{
    try{
        const images = await Gallery.find().sort({ createdAt: -1 }).limit(30);
        console.log(images)
        return res.render("client/gallery", {images})
    }
    catch(err)
    {
        console.log(err.message)
        return res.render("404")
    }
}

module.exports =
{
    gallery,
    home,
    state,
    sport,
    partnership,
    service,
    laboratory,
    projects,
    library,
    contact,
    progress,
    course,
    academic,
    about,
    staffs,
    updates,
    newSpecific
}