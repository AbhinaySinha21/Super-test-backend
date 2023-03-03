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
app.get("/comments/:id",(req,res)=>{
    if(req.params.id<comment.length)
    {
        const comt=comment.find((com)=> com.id==req.params.id);
        res.render("show",{find: comt});
    }else{
        res.send(`<h1>Invalid Comment</h1>
                    <h1><a href="/comments"> go to comments</a></h1>`);
    }
});
app.get("/article/this-new",async(req,res)=>{
    const b=await Article.find({title: req.query.tit});
    res.render("this",{dem: b[0]._id});
})
app.get("/article/:id",(req,res)=>{
    res.render("hello",{id: req.params.id});
})
app.get("/article/:id/edit",(req,res)=>{
    const com=comment.find((con)=>con.id==req.params.id);
    res.render("editform",{edit: com});
})
app.patch("/article/:id",async(req,res)=>{
    await Article.UpdateOne({_id: req.params.id},{$set :req.body})
    res.redirect("/article/"+req.params.id);
});
app.delete("/article/:id",(req,res)=>{
    comment.filter((cont)=> cont.id=req.params.id);
    console.log(comment);
    res.redirect("/comments");
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
