const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const Admin = require("../models/admin")
const bycrypt = require('bcryptjs')


function initPassport()
{


passport.use(new LocalStrategy(
    {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
    },
    (req, username, password, done)=>
    {
        
        return Admin.findOne({username:username})
        .then((user)=>
        {
            if(!user)
            {
                // he she was not registred
                // Loading the credintials
                console.log("Not Found")
                return done(null, false)
            }
            // if there is user then we have to compare password
            bycrypt.compare(password, user.password)
            .then(match =>
                {
                    if(match == false)
                    {
                        console.log('NOT--matched', match)
                        return done(null, false)
                    }
                    if(match == true)
                    {
                        console.log('matched', match)
                        return done(null, user)
                    }
                })
            .catch(err =>
                {
                    console.log(err.message)
                    return done(err)
                })
        })
        .catch(err =>
            {
                return done(err)
            })        
        
    }))
}
passport.serializeUser((user, done)=>
        {
            return done(null, user.id)
        })



passport.deserializeUser((id, done)=>
        {
            Admin.findById(id)
            .then(user =>
                {
                    return done(null, user)
                })
            .catch(err =>
                {
                    return done(err)
                })
        })
    



module.exports = initPassport;