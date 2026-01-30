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

app.get("/createdata", (req, res) => {
  const data = req.query;

  if (data.id) {
    // UPDATE
    const index = setdata.findIndex(item => item.id == data.id);
    setdata[index] = data;
  } else {
    // CREATE
    data.id = Date.now();
    setdata.push(data);
  }

  fs.writeFileSync("dev-data/data.json", JSON.stringify(setdata));
  res.redirect("/");
});
app.get("/add", (req, res) => {
  res.render("app.ejs", { Updatedata: null });
});
app.get ("/Editdata/:id" ,(req,res)=>{
    const editid=req.params.id;
    // const Editdata=setdata[editid]
    res.render("product.ejs",{setdata})
})
app.get("/Deletedata/:id",(req,res) =>{
    const Deletedata=req.params.id
    setdata.splice(Deletedata,1)
    Updateid = null;
     fs.writeFileSync("dev-data/data.json",JSON.stringify(setdata))
    res.redirect("/")
})
app.get("/Updatedata/:id", (req, res) => {
  const Updatedata = setdata.find(item => item.id == req.params.id);
  res.render("app.ejs", { Updatedata });
});
app.listen(3001)