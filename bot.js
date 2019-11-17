var gcm = require('node-gcm');
// var icon = require('./ic_launcher.png')
const FCM_ApiKey = 'AIzaSyBLjM87tnh3s3r2lsKIrXUTw-Ufeopl8vU'
const newUsers = require('./model/model');

// Set up the sender with your GCM/FCM API key (declare this once for multiple messages)
var sender = new gcm.Sender(FCM_ApiKey);



async function sendScheduleNotification(title, body, token, link) {


    newUsers.Users.find()
        .exec()
        .then((article) => {
            //send response article
            if (article && article.length) {
                var allTokens = []
                article.map((item, index) => {
                    if (item.token) {
                        allTokens.push(item.token)
                    }

                    if (index == article.length - 1) {

                        var message = new gcm.Message({
                            collapseKey: 'demo',
                            priority: 'high',
                            contentAvailable: true,
                            delayWhileIdle: true,
                            timeToLive: 3,
                            restrictedPackageName: "com.tryggare_privat",
                            dryRun: false,
                            data: {
                                link
                            },
                            notification: {
                                title,
                                // icon,
                                body
                            }
                        });

                        var regTokens = allTokens;

                        // Specify which registration IDs to deliver the message to


                        // Actually send the message
                        return sender.send(message, { registrationTokens: regTokens }, function (err, response) {
                            if (err) console.error(err);
                            else return response;
                        });

                    }
                })
            }
        })
        //catch the error
        .catch((err) => res.send(err));


}



module.exports = {
    start: async (title, body, token, link) => {
        return await sendScheduleNotification(title, body, token, link).then((res) => {
            return res
        })
    }
}