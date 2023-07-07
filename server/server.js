const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()

app.use(cors())
app.use(express.json())

require("dotenv").config()

// Port
const PORT = process.env.PORT | 4500

// Connection
mongoose.connect("mongodb://127.0.0.1:27017/usermanagement")
.then(()=>{
    console.log("MongoDB Connected")
})
.catch((err)=>console.log(err))

// Schema
const schemaData = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
},{
    timeStamps : true
});

// Model
const userModel = mongoose.model("User", schemaData);

// Create
app.post("/save", async(req, res)=>{
    userModel.create(req.body)
    .then((data) => {
        console.log("Data Submitted!")
    })
    .catch((err) => {
        console.log(err)
    })
})

// Read
app.get("/get", async(req, res) => {
    const data = await userModel.find({})
    res.send(data)
})

// Delete
app.delete("/delete/:id", async(req, res) => {
    const {id} = req.params
    userModel.findByIdAndDelete(id)
    .then(() => {
        console.log("Data Deleted!")
    })
    .catch((err) => {
        console.log(err)
    })
})

// Server
app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`))

//Update
// module.exports.updateUsers = async(req, res) => {
//     const {id} = req.params
//     const {task} = req.body
//     userModel.findByIdAndUpdate(id, {task})
//     .then(() => {
//         console.log("Updated Successfully!")
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// }

//Update
// app.put("/update", async(req, res)=>{
//     console.log(req.body)
//     const { id, ...rest} = req.body
//     console.log(rest)
//     const data = await userModel.updateOne({_id : id}, rest)
//     res.send({success : true, message : "Data Updated Successfully", data : data})
// })