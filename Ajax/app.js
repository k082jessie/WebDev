function getData(name) {
  if (name == "Jessie") {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          name: "Jessie Yen",
          age: Math.floor(Math.random() * 30),
          major: "CS",
        });
      }, 2000);
    });
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Not allowed to acess data."));
      }, 2000);
    });
  }
}

function getMovies(age) {
  if (age < 12) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("cartoon movies");
      }, 1500);
    });
  } else if (age < 18) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("teen movies");
      }, 1500);
    });
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("adult movies");
      }, 1500);
    });
  }
}

// getData("Jessie").then((obj) => {
//   console.log(obj);
//   return getMovies(obj.age)
//     .then((msg) => {
//       console.log(msg);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// async await try catch
async function showMovie() {
  try {
    const obj = await getData("Jessie");
    const movie = await getMovies(obj.age);
    console.log(movie);
  } catch (e) {
    console.log(e);
  }
}

showMovie();
