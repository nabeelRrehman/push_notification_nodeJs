const express = require("express");
const app = express.Router();
var gcm = require('node-gcm');
// var icon = require('../ic_launcher.ico')

const FCM_ApiKey = 'AIzaSyBLjM87tnh3s3r2lsKIrXUTw-Ufeopl8vU'

// Set up the sender with your GCM/FCM API key (declare this once for multiple messages)
var sender = new gcm.Sender(FCM_ApiKey);




//POST REQUEST 


app.post("/send", (req, res) => {

    // Prepare a message to be sent
    var message = new gcm.Message({
        collapseKey: 'demo',
        priority: 'high',
        contentAvailable: true,
        delayWhileIdle: true,
        timeToLive: 3,
        // restrictedPackageName: "com.tryggare_privat",
        dryRun: false,
        data: {
            link: req.body
        },
        notification: {
            title: req.body.title,
            // icon: require('../ic_launcher.ico'),
            body: req.body.body
        }
    });

    var type = typeof req.body.token
    var regTokens

    if (type == 'string') {

        regTokens = [req.body.token];

    } else {

        regTokens = req.body.token;

    }
    // Specify which registration IDs to deliver the message to


    // Actually send the message
    sender.send(message, { registrationTokens: regTokens }, function (err, response) {
        if (err) console.error(err);
        else res.send(response);
    });

})




module.exports = app;