const mongoose = require('mongoose');
var expireDate = 1209600000


//mongoDb collection schema for register users
var UsersSchema = mongoose.Schema({
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    name: { type: String, required: true },
    region: { type: String, required: true },
    token: { type: String, required: false },
    checklists: { type: Object, required: false },
    notification: { type: Array, required: false },
    status: { type: String, default: 'trial' },
    CreatedOn: { type: Date, default: Date.now() },
    ExpireOn: { type: Date, default: Date.now() + expireDate },
});



//users schema
const Users = mongoose.model('Users', UsersSchema);



const obj = {
    Users,
}
//export object contain users,articles
module.exports = obj;