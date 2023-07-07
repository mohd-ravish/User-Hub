const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()

const routes = require("./routes/routes.js")

require("dotenv").config()

app.use(routes)
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT | 4500

app.listen(PORT, () => console.log("SERVER IS RUNNING ON PORT 4500"))

//Connection
mongoose.connect("mongodb://127.0.0.1:27017/usermanagement")
.then(()=>{
    console.log("MongoDB Connected")
})
.catch((err)=>console.log(err))

//Read
// app.get("/", async(req, res) => {
//     const data = await userModel.find({})
//     res.send(data)
// })

//Create
// app.post("/create", async(req, res)=>{
//     console.log(req.body)
//     const data = new userModel(req.body)
//     await data.save()
//     res.send({success : true, message : "Data Saved Successfully", data : data})
// })

//Update
// app.put("/update", async(req, res)=>{
//     console.log(req.body)
//     const { id, ...rest} = req.body
//     console.log(rest)
//     const data = await userModel.updateOne({_id : id}, rest)
//     res.send({success : true, message : "Data Updated Successfully", data : data})
// })

// Delete
// app.delete("/delete/:id", async(req, res)=>{
//     const id = req.params.id
//     userModel.deleteOne({_id : id})
//     // res.send({success : true, message : "Data Deleted Successfully", data : data})
// })