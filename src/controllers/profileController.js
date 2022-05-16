const encrypt = require("../password/encrypt")
const Admin = require("../models/admin")
const changePassword = (req, res) => {
    return res.send("Changing password")
}

const updateProfile = (req, res) => {
    // we upadate photo and the profile and the welcome notice

    upload(req, req.file, (err) => {
        if (err) {
            // letre render the page and alow the input
        }
        else {
            // safe for file upadating
        }
    })
    var { welcomeNotice } = req.body;
    return res.send("Upadating profile")
}

const profile = (req, res) => {
    return res.render("profile")
}


const addUserAsAdmin = async (req, res) => {
    // we can give him the form to fill then we can submit the user that has been registered
    try {
        return res.render("addAnotherAdmin")
    }
    catch (err) {
        console.log(err.message)
        return res.render("404")
    }
}


const addAdmin = async (req, res) => {
    try {
        const { role, password, username } = req.body;
        if (role != undefined && password != undefined && username != undefined) {
            // let find if there is the username 
            const existsUsername = await Admin.find({ username });
            if (existsUsername.length > 1) {
                const msgError = "username has been taken"
                return res.render('addAnotherAdminFailure', { msgError, password, role, username })
            }
            else {
                const hashed = encrypt(password)
                console.log(hashed)
                const savedAdmin = await Admin.create({ username, password: hashed, role })
                // console.log(savedAdmin);
                if (savedAdmin) {
                    return res.redirect("/api/profile/showAllAdmins")
                }
                else {
                    return res.render('404')
                }
            }
        }
        else {
            return res.render('404')
        }


    }
    catch (err) {
        console.log(err.message)
        return res.render("404")
    }

}

const showAllAdmins = async (req, res) => {
    try {
        const Admins = await Admin.find();
        console.log(Admins)
        return res.render("allAdmins", { Admins })
    }
    catch (err) {
        console.log(err.message)
        return res.render("404")
    }
}
const superAdminDelete = async (req, res) => {
    try
    {
        const {superAdminPassword } =  req.body;
        const superAdmin = await Admin.findOne().sort({createdAt: -1 });
        if(superAdmin.password == superAdminPassword)
        {
            // we have to give access and allow the user to continue
            
        }
    }
    catch(err)
    {
        console.log(err.message)
        return res.render("404")
    }
}

const showTheAdminPageForChanges = (req,res)=>
{
    try
    {
        return res.render("showTheAdminPageForChanges")
    }
    catch
    {
        console.log(err.message)
        return res.render("404")
    }
}
const geteUpdatePage = (req, res) => {
    return res.render("adminUpdate")
}

module.exports = {
    addUserAsAdmin,
    profile,
    updateProfile,
    changePassword,
    geteUpdatePage,
    addAdmin,
    showAllAdmins,
    superAdminDelete,
    showTheAdminPageForChanges
}