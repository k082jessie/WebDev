let example = new Promise((resolve, reject) => {
  //resolve({ name: "Jessie", age: 18 });
  reject(new Error("not allowed"));
});

example
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
