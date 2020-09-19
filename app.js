var express = require("express");
var app=express();
var bodyParser = require("body-parser");
var mongoose  = require("mongoose");
var methodOverride = require("method-override");
var  expressSanitizer = require("express-sanitizer");

mongoose.connect("mongodb+srv://svb:ssvvb2103@cluster0.1nmkb.mongodb.net/RestFulBlogAppDB1?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false });
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
// Sanitizer must always come after body parser.
app.use(expressSanitizer());  


// schema
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date,default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Default blogs to show if needed
// Restful routes
// Blog.create({
//     title: "Test Blog",
//     image: "data:image/jpeg;base64,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",
//     body :  "This is the blog test body"
// });

app.get("/",function(req,res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req,res){
    Blog.find({},function(err,blogs){
      if(err){
          console.log("somthing went wrong");
        }else{
            res.render("index.ejs",{blogs:blogs});
        }  
    });
});


// New route
app.get("/blogs/new", function(req,res){
    res.render("new.ejs");
});

// Create route
app.post("/blogs",function(req,res){
    // Sanitize the body of the blog....
    req.body.blog.body = req.sanitize(req.body.blog.body);
        Blog.create(req.body.blog,function(err,newBlog){
        if(err){
            console.log("somthing went wrong!!");
        }else{
            res.redirect("/blogs");
        }
    });
});


//Show route
app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
            console.log(err);
          }else{
              res.render("show.ejs",{blog:foundBlog});
          }  
    });
}); 


// Edit route
app.get("/blogs/:id/edit", function(req,res){
    Blog.findById(req.params.id, function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
            console.log(err);
        }else{
            res.render("edit.ejs",{blog:foundBlog});
        }
    });
});


// Update route

app.put("/blogs/:id", function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id,req.body.blog, function(err,updatedBlog){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/" + req.params.id);
        }
    });   
});


// Delete/Destroy Route

app.delete("/blogs/:id", function(req,res){
    // Destroy data
    Blog.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/blogs");
        }
    });
});





app.listen(3000, function() { 
console.log("This is the blog APP");
console.log('Server listening on port 3000'); 
});
