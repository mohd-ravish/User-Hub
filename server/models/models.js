const mongoose = require('mongoose');

//Schema
const schemaData = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
},{
    timeStamps : true
});

//Model
module.exports = mongoose.model("User", schemaData);