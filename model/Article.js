const mongoose=require("mongoose");
const articleSchema= new mongoose.Schema({
    title: String,
    markdown: String,
    description: String
});

const Article=mongoose.model("Articles",articleSchema);
module.exports = Article;