const express = require("express");
const configViewEngine = require("../src/configs/viewEngine");
const webRoutes = require("../src/routes/web");
const infoRoutes = require("../src/routes/newRoutes")
const statisticsRoutes = require("../src/routes/statisticsRoutes");
const imageRoutes = require("../src/routes/gallery")
//const clientGetRoutes = require("../src/routes/clientGetRoutes")
const client = require("../src/routes/clientRender")
const profileRoutes = require("../src/routes/profileRoute")
const db = require("../src/db/db")
const encrypt = require("../src/password/encrypt")

// const cors = require("cors")


// bring in passport for the work of authentication // authentication for parts 
const initPassport = require("../src/configs/passme");
const security = require("../src/securerRoute/check")

// session and passport for the login and authentication
const passport = require("passport");
const session = require("express-session");
const MongoStore = require('connect-mongo');

const News = require("../src/models/news")
const Info = require("../src/models/info")
const Admin = require("../src/models/admin")

const getRoutes = require("../src/routes/getroutes");

db.checkConnection();

const app = express();


const mongoDbUrl = 'mongodb://localhost/tumaini_school'
// let inialize the session
app.use(session(
    {
        secret: 'YelTec',
        resave: true,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: mongoDbUrl, ttl: 5 * 60 * 60}),
        cookie: { maxAge: 1000 * 60 * 60 * 24 }
    }))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.port || 3300;

app.use(passport.initialize())
app.use(passport.session())

initPassport();

configViewEngine(app);


app.post("/login", passport.authenticate('local',
    {
        successRedirect: "/dashboard",
        failureRedirect: "/login"
    }))

//const one = require("../src/public/client/Tumaini Senior Secondary School/js/")
// initializing the routes
getRoutes(app);
profileRoutes.profileRoutes(app);
infoRoutes.infoRoutes(app);
webRoutes.newRoutes(app);
statisticsRoutes(app);
imageRoutes.galleryRoutes(app);



client.rendering(app);

//const clent  = require("../src/controllers/client/clientController")

app.get("/404", (req, res) => {
    res.render("404");
})

app.get('/logout', security.postLogOut)

app.get("/register", security.checkLoggedOut, (req, res) => {
    res.render("register")
})

//const po = require("../src/public/client/Tuma/pictures/")
app.post("/register", (req, res) => {
    let { password, username } = req.body;
    // perform validatin and hash  password
    let hashed = encrypt(password)
    console.log(hashed)
    if (hashed) {
        // we have succesfully hashed the password
        return Admin.create({ password: hashed, username })
            .then(registered => {
                res.redirect("/login")
            })
            .catch(err => {
                console.log(err.message)
                res.redirect("/404")

            })
    }
    else {
    }

})




app.listen(port, () => {
    console.log(`App is building on ${port}`);
})