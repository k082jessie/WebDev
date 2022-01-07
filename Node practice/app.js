let greeting = require("./greeting");
let myName = "Jessie";
greeting.morning(myName);
greeting.night(myName);

// let path = require("path");
// let newPath = path.join(__dirname, "try.js");
// console.log(newPath);

// console.log(path.basename(__filename)); //can only get filename without previous path
// console.log(__dirname);
// console.log(__filename);

// const url = require("url");
// const googleURL = "file:///D:/Wilson%20Ren/WebDev/Taiwan%20project/index.html";
// const parsedURL = url.parse(googleURL, true);
// console.log(typeof parsedURL.query);

// fs(file system)
// const fs = require("fs");
// fs.writeFile("log.txt", "Today is Dec. 16.", (e) => {
//   if (e) throw e;
//   console.log("File has been written.");
// });
// fs.readFile("./log.txt", "utf8", (e, data) => {
//   if (e) throw e;
//   console.log(data);
// });

// node server
// const http = require("http");
// const url = require("url");
// const fs = require("fs");
// const path = require("path");

// const server = http.createServer((req, res) => {
//   if (req.url == "/") {
//     fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.write(data);
//       res.end();
//     });
//   } else {
//     let parseURL = url.parse(req.url);
//     res.write("Hello, " + parseURL.pathname);
//     res.end();
//   }
// });

// server.listen(3501, () => {
//   console.log("Server is running on port 3501.");
// });

// ejs
const express = require("express");
const app = express();
const ejs = require("ejs");

// middleware
app.use(express.static("public"));

app.get("/", (req, res) => {
  // database => an array of objects
  const languages = [
    { name: "Python", rating: 9.5, popularity: 9.7, trending: "super hot" },
    { name: "Java", rating: 8.6, popularity: 8.2, trending: "same" },
    { name: "C++", rating: 6.6, popularity: 7.7, trending: "same" },
    { name: "PHP", rating: 2.5, popularity: 4.7, trending: "decreasing" },
    { name: "Javascript", rating: 8.5, popularity: 8.1, trending: "same" },
  ];
  res.render("index.ejs", { languages });
});

app.get("/response", (req, res) => {
  let { fullname, age } = req.query;
  res.render("respond.ejs", { fullname, age });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
