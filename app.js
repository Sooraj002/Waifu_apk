const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.get("/home", (req, res) => {
  res.send("index")
})

// app.get("/home", (req, res) => {
//   const apiUrl = `https://api.waifu.pics/sfw/waify`;
//   // const apiUrl = `https://api.waifu.pics/${type}/${categoru}`;

//   fetch(apiUrl)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       const imageUrl = data.url;
//       res.render("index.ejs", { imageUrl });
//     })
//     .catch((error) => {
//       console.error("There was a problem with the fetch operation:", error);
//     });
// });

app.listen(3000, () => {
  console.log("Connection successful");
});
