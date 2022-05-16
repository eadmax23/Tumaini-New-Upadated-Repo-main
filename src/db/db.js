const mongoose = require("mongoose")



async function checkConnection() {
    const connection = await mongoose.connect('mongodb://localhost/tumaini_school');
    if (connection) {
        console.log("Connection succeeded")
    }
    else {
        console.log('connection failed');
    }
}




module.exports = {
    checkConnection: checkConnection
};