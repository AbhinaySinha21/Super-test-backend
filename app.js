const exp=require("express");
const path=require("path");
const body=require("body-parser");
const mo=require("method-override");
const mongoose=require("mongoose");
const Article=require("./model/Article");
const app=exp();
app.use(exp.static(__dirname+"/public"))
app.set("view engine",'ejs');
app.use(body.urlencoded({extended: true}));
app.use(mo('_method'));

mongoose.connect("mongodb://127.0.0.1:27017/articleDB").then(()=>{
    console.log("DB connected");
});

app.get("/article",async(req,res)=>{
    const Allarticles=await Article.find();
    res.render("templete",{article: Allarticles});
});

app.get("/article/new",(req,res)=>{
    res.render("form");
});
app.get("/article/this-new",async(req,res)=>{
    const b=await Article.find({title: req.query.tit});
    res.render("this",{dem: b[0]._id});
})
app.get("/article/:id",(req,res)=>{
    const b=Article.find({title: req.params.id});
    res.render("hello",{id: b});
})
app.get("/article/:id/edit",(req,res)=>{
    const com=Article.find({_id: req.params.id});
    res.render("editform",{edit: com});
})
app.patch("/article/:id",async(req,res)=>{
    const b=await Article.find({title: req.params.id});
    await Article.UpdateOne({_id: b[0]._id},{$set :req.body})
    res.redirect("/article/"+req.params.id);
});
app.delete("/article/:id",async(req,res)=>{
    const b=await Article.find({title: req.params.id});
    await Article.deleteOne({_id: b[0]._id});
    res.redirect("/article");
})
app.post("/article",(req,res)=>{
    const item=new Article({
        title: req.body.title,
        markdown: req.body.markdown,
        description: req.body.description
    });
    item.save();
    res.redirect("/article/this-new?tit="+req.body.title);
});
app.listen(3500,()=>{
    console.log("running at 3500");
});
