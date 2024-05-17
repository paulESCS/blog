import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

app.get("/", (req, res) => {
  const data = {
    location: "Home",
    featuredPosts: posts,
    posts: posts,
  };
  res.render("index.ejs", data);
});

app.get("/create", (req, res) => {
  const data = {
    location: "Create",
  };
  res.render("index.ejs", data);
});

app.post("/submitNew", (req, res) => {
  const data = {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    date: new Date(),
  };
  posts.push(data);
  res.redirect("/");
});

app.get("/view", (req, res) => {
  const data = {
    location: "View",
    posts: posts,
  };
  res.render("index.ejs", data);
});

app.get("/viewPost", (req, res) => {
  const data = {
    location: "View",
    posts: posts,
    post: posts.find((post) => post.title === req.query.title),
  };
  res.render("index.ejs", data);
});

app.get("/update", (req, res) => {
  const data = {
    location: "Update",
    posts: posts,
    post: posts.find((post) => post.title === req.query.title),
    originalTitle: req.query.title,
  };
  res.render("index.ejs", data);
});

app.post("/updatePost", (req, res) => {
  const { originalTitle, title, content, image } = req.body;
  const postIndex = posts.findIndex((post) => post.title === originalTitle);

  if (postIndex !== -1) {
    posts[postIndex] = {
      title,
      content,
      image,
      date: new Date(),
    };
  } else {
    console.log("Post not found.");
    res.redirect("/viewPost");
  }

  res.redirect("/");
});

app.post("/deletePost", (req, res) => {
  const title = req.body.title;
  const action = req.body.action;

  // Assuming you have a `posts` array in your `locals` object
  const index = posts.findIndex((post) => post.title === title);

  if (index !== -1) {
    posts.splice(index, 1);
    res.redirect("/view");
  } else {
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
