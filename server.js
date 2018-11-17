const express = require("express");
const mongooose = require("mongoose");

//Pickup the route files

const auth = require("./routes/api/auth");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

const app = express();

// DB Config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongooose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//Setup and USE routes middleware
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => console.log(`Server running on port: ${port}`));
