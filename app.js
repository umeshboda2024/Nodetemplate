const express=require("express")
const app=express()
const fs =require("fs")
const { uptime } = require("process")

let setdata=[]
Updateid=null

const readFile=fs.readFileSync("dev-data/data.json","utf-8")
if (readFile !== ""){
    setdata=JSON.parse(readFile)
}

app.get("/",(req,res) =>{
    res.render("overview.ejs",{setdata,Updatedata:null})
})
app.get("/add",(req,res) =>{
    res.render("app.ejs",{setdata})
})

app.get("/createdata",(req,res)=>{
    const data=req.query
    data.id = setdata.length;
     if(Updateid !== null) {
     setdata[Updateid]=data
     Updateid=null
   
     }
     else{
    setdata.push(data)
       
     }
    
    fs.writeFileSync("dev-data/data.json",JSON.stringify(setdata))
    res.redirect("/")
})
app.get ("/Editdata/:id" ,(req,res)=>{
    const editid=req.params.id;
    const Editdata=setdata[editid]
    res.render("product.ejs",{Editdata,setdata})
})
app.get("/Deletedata/:id",(req,res) =>{
    const Deletedata=req.params.id
    setdata.splice(Deletedata,1)
     fs.writeFileSync("dev-data/data.json",JSON.stringify(setdata))
    res.redirect("/")
})
app.get ("/Updatedata/:id" ,(req,res)=>{
    Updateid=req.params.id;
    const Updatedata=setdata[Updateid]
    res.render("app.ejs",{Updatedata,setdata})
})

app.listen(3001)