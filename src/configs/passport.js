
const passport = require('passport')
const passportlocal = require('passport-local');
const Admin = require("../models/admin")
const decrtypt = require("../password/decrypt")
const LocalStategy = passportlocal.Strategy;
const loginService = require('../services/loginService')

const custom = {
    usernameField: 'username',
    passwordField: 'password' 
}

const verifyCallback = (username, password, done) => {
    console.log("shjshshshsh")
    Admin.findOne({username:username})
    .then((user)=>
    {
        if(!user)
        {
            console.log("jelo")
            return done(null, false,{"full": `the user with Username: ${username} does not exist`})
        }
        const result = loginService.comparePassword(user.password, password,)
        if(result)
        {
            console.log('shasha')
            return done(null, user)
        }
        else{
            console.log("here")
            return done(null, false, {"full": "password incorrect"})
        }
    })
    .catch(err => 
        {
            console.log("failed to reach any place")
            console.log(err)
            done(err)
        })

}

const strategy = new LocalStategy(custom, verifyCallback)

passport.use(strategy)

passport.serializeUser((user, done) =>{
    console.log("failed here to serialize")
    done(null, user.id);

  });
  
passport.deserializeUser((UserId, done) =>{
    loginService.findUserById(id)
      .then((user)=>
      {
          console.log("failed here ")
          done(null, user)
      })
    .catch(err=> 
        {
            console.log(err)
            done(err)
        })
});











