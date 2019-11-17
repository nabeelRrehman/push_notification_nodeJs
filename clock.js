var cron = require('node-cron');
var bot = require('./bot')
const express = require("express");
const app = express.Router();





app.post("/schedule", (req, res) => {

    var title = req.body.title
    var body = req.body.body
    var token = req.body.token
    var link = req.body

    var date = req.body.date
    // bot.start(title, body, token)
    var min = new Date(date).getMinutes()
    var hours = new Date(date).getHours()
    var day = new Date(date).getDay()
    var dat = new Date(date).getDate()
    var month = new Date(date).getMonth() + 1

    switch (req.body.type) {
        case 'monthlycheck':
            var job1 = cron.schedule(`${min} ${hours} ${dat} ${month} ${day}`, () => {
                // console.log('running a task every minute');
                bot.start(title, body, token, link).then(() => {
                    job1.stop()
                })
            });
            job1.start()
            break;

        case 'monthlyads':
            var job2 = cron.schedule(`${min} ${hours} ${dat} ${month} ${day}`, () => {
                // console.log('running a task every minute');
                bot.start(title, body, token, link).then(() => {
                    job2.stop()
                })
            });
            job2.start()
            break;

        case 'discount':
            var job3 = cron.schedule(`${min} ${hours} ${dat} ${month} ${day}`, () => {
                // console.log('running a task every minute');
                bot.start(title, body, token, link).then(() => {
                    job3.stop()
                })
            });
            job3.start()
            break;

        case 'online':
            var job4 = cron.schedule(`${min} ${hours} ${dat} ${month} ${day}`, () => {
                // console.log('running a task every minute');
                bot.start(title, body, token, link).then(() => {
                    job4.stop()
                })
            });
            job4.start()
            break;

        case 'buyapp':
            var job5 = cron.schedule(`${min} ${hours} ${dat} ${month} ${day}`, () => {
                // console.log('running a task every minute');
                bot.start(title, body, token, link).then(() => {
                    job5.stop()
                })
            });
            job5.start()
            break;

        default:
            break;
    }



    res.json('ok')
})


module.exports = app;
