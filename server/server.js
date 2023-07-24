const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()

app.use(cors(
    {
    origin: ["https://user-hub-frontend.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    Credentials: true
    }
))
app.use(express.json())

require("dotenv").config()

// Port
const PORT = process.env.PORT | 4500

// Connection
// For MongoCompass : mongodb://127.0.0.1:27017/usermanagement
// For MongoAtlas : mongodb+srv://<username>:<password>@cluster0.bwjwxak.mongodb.net/<databasename>?retryWrites=true&w=majority

const DB = "mongodb+srv://mohdravish:ravishjmi@cluster0.bwjwxak.mongodb.net/usermanagement?retryWrites=true&w=majority";

mongoose.connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
})
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
    await userModel.create(req.body)
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

//Update
app.put("/update", async(req, res)=>{
    const { _id, ...data} = req.body
    await userModel.findByIdAndUpdate({_id : _id }, data)
        .then(() => {
            console.log("Data Updated!")
        })
        .catch((err) => {
            console.log(err)
        })
})

// Delete
app.delete("/delete/:id", async(req, res) => {
    const {id} = req.params
    await userModel.findByIdAndDelete(id)
    .then(() => {
        console.log("Data Deleted!")
    })
    .catch((err) => {
        console.log(err)
    })
})

// Server
app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`))
