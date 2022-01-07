// async function getJoke() {
//   let data = await fetch("https://v2.jokeapi.dev/joke/Programming");
//   let parseData = await data.json();
//   console.log(parseData);
// }
// getJoke();

// async function getWeather() {
//   let data = await fetch(url);
//   let parseData = await data.json();
//   console.log(parseData);
// }
// getWeather();

import fetch from "node-fetch";
import express from "express";
const app = express();
import ejs from "ejs";
import https from "https";

// api key
const myKey = "5b71ff380e5bca0b9e1eceb280e92e7a";

// kelvin to celsius
function k2c(k) {
  return (k - 273.15).toFixed(2);
}

// middleware
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/:city", async (req, res) => {
  let { city } = req.params;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}`;

  let d = await fetch(url);
  let djs = await d.json();
  let { temp } = djs.main;
  let cTemp = k2c(temp);
  res.render("weather.ejs", { djs, cTemp });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
