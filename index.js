const express=require('express')
const mongoose=require('mongoose')
const https=require('https')
const body=require('body-parser')
const { request } = require('http')
const app=express()
app.set('view engine', 'ejs');
app.use(body.urlencoded({extended:true}))
app.use(express.static("public"))

mongoose.connect("mongodb+srv://rosebastianrb:<Josupass1815>@cluster0.g8bbpqj.mongodb.net/tododb",{ useNewUrlParser: true })




//create a schema
const todoschema= new mongoose.Schema({task:String})

const todomodel = mongoose.model("task",todoschema);

//const t1= new todomodel({task:"Coding"})
//const t2= new todomodel({task:"Gaming"})
//const t3= new todomodel({task:"Singing"})

//t1.save()
//t2.save()
//t3.save()



app.get("/", function (req, res) {

    todomodel.find().then((result) => {
        res.render('index', { task: result })
    }).catch((err) => {

        console.log(err)

    });

})

app.post("/",function(req,res){
   var todotask=req.body.task
   //console.log(task)
  //lists.push(task)

  const task = new todomodel({task:todotask})

  task.save()
   res.redirect("/")
})

app.post("/delete",function(req,res){
    var item=req.body.checkbox
    todomodel.deleteOne({_id:item}).then((result)=>{
        res.redirect("/")
    }).catch((err)=>{
        console.log(err)
    });
})


app.listen(process.env.Port  ||3000,function(){
    console.log('Server is up and running')
})