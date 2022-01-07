// array
let arr = ["Harry", "Ron", "Snap"];

// JS for loop
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
  console.log(i);
}

// forEach
arr.forEach((person, index) => {
  console.log(person);
  console.log(index);
});

// object
let harry = {
  name: "Harry Potter",
  age: 40,
  married: true,
  sayHi() {
    console.log("Harry says hi to you");
  },
};
console.log(harry.name);
harry.sayHi();

// function
function add(n1, n2) {
  return n1 + n2;
}
add(12, 9);
console.log(add(12, 9));

// class
let c1 = {
  radius: 10,
  getArea() {
    return Math.PI * this.radius * this.radius;
  },
};
console.log(c1.radius);
console.log(c1.getArea());

class Circle {
  constructor(radius) {
    this.radius = radius;
  }
  getArea() {
    return Math.PI * this.radius * this.radius;
  }
}
let c2 = new Circle(5);
console.log(c2.radius);
console.log(c2.getArea());

// sum = 1 + 2 + ... + n
function fun1(n) {
  let sum = 0;
  for (i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}
console.log(fun1(5));
let time1 = window.performance.now();
fun1(1000000000);
let time2 = window.performance.now();
let timeDiff1 = (time2 - time1) / 1000.0;
console.log(timeDiff1);

function fun2(n) {
  return ((1 + n) * n) / 2;
}
console.log(fun2(5));
let time3 = window.performance.now();
fun1(1000000000);
let time4 = window.performance.now();
let timeDiff2 = (time4 - time3) / 1000.0;
console.log(timeDiff2);
