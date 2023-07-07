const userModel = require("../models/models.js")

//Read
module.exports.getUsers = async(req, res) => {
    const users = await userModel.find()
    res.send(users)
}

//Create
module.exports.saveUsers = async(req, res) => {
    userModel.create(req.body)
    .then((data) => {
        console.log("Data Saved!")
    })
    .catch((err) => {
        console.log(err)
    })
}

//Update
module.exports.updateUsers = async(req, res) => {
    const {id} = req.params
    const {task} = req.body
    userModel.findByIdAndUpdate(id, {task})
    .then(() => {
        console.log("Updated Successfully!")
    })
    .catch((err) => {
        console.log(err)
    })
}

//Delete
module.exports.deleteUsers = async(req, res) => {
    const {id} = req.params
    userModel.findByIdAndDelete(id)
    .then(() => {
        console.log("Deleted Successfully!")
    })
    .catch((err) => {
        console.log(err)
    })
}