const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const date = require(__dirname + "/date.js")
const app = express()

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

mongoose.connect("mongodb://127.0.0.1:27017/todolist_DB", {useNewUrlParser: true})

const taskSchema = new mongoose.Schema({
  name: String
})

const listSchema = new mongoose.Schema({
  name: String,
  lsit: [taskSchema]
})

const task = new mongoose.model("task", taskSchema)
const list = new mongoose.model("list", listSchema)
app.listen(3000, ()=>{
  console.log("server started at 3000");
})

// var task_array = [];

app.get("/", (req, res)=>{
  var today = date.getDate();
  task.find().then((data)=>{
    res.render("list", {listTitle: today , task_array: data})
  })
})

app.post("/", (req, res)=>{
    var temp_task = new task({
    name: req.body.new_task
  })
  temp_task.save()
  // task_array.push(temp_task)
  res.redirect("/")
})

app.get("/:customListName", (req, res)=>{
  const customListName = req.params.customListName
})

app.post("/delete", (req, res)=>{
  var delete_task = req.body.to_delete
  task.findByIdAndRemove(delete_task).then((data)=>{
    console.log(data);
    console.log("task deleted successfully");
  })
  res.redirect("/")
})
