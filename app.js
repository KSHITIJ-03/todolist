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
  task_list: [taskSchema]
})

const task = new mongoose.model("task", taskSchema)
const list = new mongoose.model("list", listSchema)
app.listen(3000, ()=>{
  console.log("server started at 3000");
})

// var task_array = [];
var today = date.getDate();
app.get("/", (req, res)=>{
  task.find().then((data)=>{
    res.render("list", {listTitle: today , task_array: data})
  })
})

app.post("/", (req, res)=>{
  const new_task = req.body.new_task
  const new_list = req.body.list;
  var temp_task = new task({
    name: new_task
  })
  if(new_list === today){
    temp_task.save()
    // task_array.push(temp_task)
    res.redirect("/")
  }
  else{
    list.findOne({name: new_list}).then((data)=>{
      data.task_list.push(new_task)
      // data.save();
      console.log("new list tasks" + data.task_list);
      res.redirect("/" + new_list)
    })
  }

})

app.get("/:customListName", (req, res)=>{
  const customListName = req.params.customListName
  list.findOne({name: customListName}).then((data)=>{
    if(!data){
      console.log("does not exist");
      //console.log(data);
      const temp_list = new list({
        name: customListName,
        task_list: []
      })
      temp_list.save()
      res.redirect("/" + customListName)
    }
    else{
      //console.log(data);
      //console.log(data.name);
      //console.log(data.task_list);
      console.log("exist");
       res.render("list", {listTitle: data.name , task_array: data.task_list})
    }
  })
})

app.post("/delete", (req, res)=>{
  var delete_task = req.body.to_delete
  task.findByIdAndRemove(delete_task).then((data)=>{
    console.log(data);
    console.log("task deleted successfully");
  })
  res.redirect("/")
})
