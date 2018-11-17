const express = require("express");
const mongooose = require("mongoose");
const bodyParser = require("body-parser");

//Pickup the route files

const auth = require("./routes/api/auth");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

const app = express();

//Setup and USE body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

//Setup and assign port variable
const port = process.env.PORT || 5000;

//Server waiting for requests.....
app.listen(port, () => console.log(`Server running on port: ${port}`));
