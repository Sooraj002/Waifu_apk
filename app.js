// app.js

const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.post("/home", (req, res) => {
  const category = req.body.category;
  const type = req.body.type;

  // Add validation for category and type

  const apiUrl = `https://api.waifu.pics/${type}/${category}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const imageUrl = data.url;
      res.render("index.ejs", { imageUrl });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      // Send an appropriate response back to the client
      res.status(500).send("Error fetching image from API");
    });
});

app.listen(3000, () => {
  console.log("Connection successful");
});
