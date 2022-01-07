const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Student = require("./models/student");
const methodOverride = require("method-override");

// middleware
app.use(express.static("public"));
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// 設定每一筆請求都會先以methodOverride進行前置處理
app.use(methodOverride("_method"));
// view engine宣告為ejs
app.set("view engine", "ejs");

mongoose
  .connect("mongodb://localhost:27017/studentDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to mongoDB");
  })
  .catch((err) => {
    console.log("Connection failed");
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("This is homepage");
});

app.get("/students", async (req, res) => {
  try {
    let data = await Student.find();
    res.render("students.ejs", { data });
  } catch {
    res.send("Error with finding data");
  }
});

app.get("/students/insert", (req, res) => {
  res.render("studentInsert.ejs");
});

app.get("/students/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let data = await Student.findOne({ id });
    console.log(data);
    if (data !== null) {
      res.render("studentPage.ejs", { data });
    } else {
      res.send("Cannot find this student. Please enter a valid id.");
    }
  } catch (err) {
    // Without if-else, get ErrorMsg: Cannot read properties of null (reading 'name')
    // the function of catch is to catch Student.findOne msg, not the error msg we assigned(Error!)
    // do not delete catch part, because it will catch the msg from Student(Try commend out const Student = require...)
    res.send("Error!");
    console.log(err);
  }
});

app.post("/students/insert", (req, res) => {
  let { id, name, age, merit, other } = req.body;
  let newStudent = new Student({
    id,
    name,
    age,
    scholarship: { merit, other },
  });
  newStudent
    .save()
    .then(() => {
      console.log("Student accepted");
      res.render("accept.ejs");
    })
    .catch((err) => {
      console.log("student not accepted");
      console.log(err);
      res.render("reject.ejs");
    });
});

app.get("/students/edit/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let data = await Student.findOne({ id });
    if (data !== null) {
      res.render("edit.ejs", { data });
    } else {
      res.send("Cannot find student.");
    }
    res.render("edit.ejs", { data });
  } catch {
    res.send("Error!");
  }
});

app.put("/students/edit/:id", async (req, res) => {
  let { id, name, age, merit, other } = req.body;
  try {
    let d = await Student.findOneAndUpdate(
      { id },
      { id, name, age, scholarship: { merit, other } },
      {
        new: true,
        runValidators: true,
      }
    );
    res.redirect(`/students/${id}`);
  } catch {
    res.render("reject.ejs");
  }
});

app.delete("/students/delete/:id", (req, res) => {
  let { id } = req.params;
  Student.deleteOne({ id })
    .then((msg) => {
      console.log(msg);
      console.log("Deleted successfully");
    })
    .catch((err) => {
      console.log(err);
      console.log("Delete failed");
    });
});

app.get("/*", (req, res) => {
  res.status(404);
  res.send("Not allowed");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
