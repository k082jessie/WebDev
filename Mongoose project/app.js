const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const fs = require("fs");

// connect to mongoDB
mongoose
  .connect("mongodb://localhost:27017/testDB")
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((err) => {
    console.log("Connection failed.");
    console.log(err);
  });

// define a schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You forgot to enter the name of this student"],
    maxlength: [15, "Name is too long"],
  },
  age: { type: Number, required: true, max: 100, default: 18 },
  major: {
    type: String,
    enum: ["Chem", "EE", "CS", "Law", "undecided"],
    default: "undecided",
  },
  scholarship: {
    merit: {
      type: Number,
      min: [0, "Are you trying to enter negative numbers?"],
      max: 5000,
      default: 0,
    },
    others: { type: Number, min: 0, default: 0 },
  },
});
// create an instance method
studentSchema.methods.totalScholarship = function () {
  return this.scholarship.merit + this.scholarship.others;
};

studentSchema.methods.addAge = function () {
  this.age++;
};

// create a static method
studentSchema.statics.setOtherToZero = function () {
  return this.updateMany({}, { "scholarship.others": 0 });
};

// define middleware
studentSchema.pre("save", async function () {
  fs.writeFile("record.txt", "One data is trying to be saved", (e) => {
    if (e) throw e;
  });
});
studentSchema.post("save", async function () {
  fs.writeFile("record.txt", "One data has been saved", (e) => {
    if (e) throw e;
  });
});

// create a model for students
const Student = mongoose.model("Student", studentSchema); // Singular word and fitst letter should be uppercase

Student.findOneAndUpdate(
  { name: "Zach Peter", major: "CS" },
  { name: "Amy Chen", "scholarship.merit": 1500 },
  { new: true, runValidators: true } // can see the result
)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log("Update failed");
    console.log(err);
  });

// const newStudent = new Student({
//   name: "Zach Peter",
//   age: 27,
//   major: "Chem",
//   scholarship: { merit: 0, others: 0 },
// });

// newStudent
//   .save()
//   .then(() => {
//     console.log("saved");
//   })
//   .catch((e) => {
//     console.log("not saved");
//     fs.writeFile("record.txt", "Data is not saved", (e) => {
//       if (e) throw e;
//     });
//   });

Student.find({})
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
