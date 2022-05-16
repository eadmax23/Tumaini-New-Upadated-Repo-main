const Statistic = require("../models/statistics")
const News = require("../models/news")
const Info = require("../models/info")

const getStastic = (req, res) =>
{
    return Statistic.findOne()
            .then(data =>
                {
                    res.json(data)
                })
            .catch(err =>
                {
                    res.send("Failed").status(404)
                })
}


const NewsRoute = (req, res) =>
{
   return  News.find()
            .then(data => 
                {
                    res.json(data)
                })
            .catch(err =>
                {
                    console.log(err.message)
                    res.send("Error").status(404);
                })

}

module.exports =
{
    getStastic,
    NewsRoute
}