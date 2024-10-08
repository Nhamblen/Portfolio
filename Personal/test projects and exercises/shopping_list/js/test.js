function clickButton() {
  const inputValue = input.value;
  input.value = "";

  const li = document.createElement("li");
  ul.appendChild(li);

  const span = document.createElement("span");
  span.textContent = (inputValue);
  li.appendChild(span);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = ("Delete");
  li.appendChild(deleteButton);

  deleteButton.addEventListener("click", function () {
      ul.removeChild(li); // Remove the list item when the button is clicked
  });

  input.focus();
};

const ul = document.querySelector("ul");
const input = document.querySelector("input");
const btn = document.querySelector("button");

btn.addEventListener("click", clickButton);



/* 

OLD TEST CODE (DELETE)

const p1 = document.createElement("p");
p1.style.color = "red";
p1.textContent = "Hey I'm red!";
container.appendChild(p1);

const h3 = document.createElement("h3");
h3.style.color = "blue";
h3.textContent = "I'm a blue h3!";
container.appendChild(h3);

const div = document.createElement("div");
div.setAttribute("style", "border: 1px solid black; background: pink;");

const h1 = document.createElement("h1");
h1.textContent = "I'm in a div";
div.appendChild(h1);

const p2 = document.createElement("p");
p2.textContent = "ME TOO!";
div.appendChild(p2);

container.appendChild(div);

// the JavaScript file
// METHODS 2 & 3
function alertFunction() {
    alert("YAY! YOU DID IT!");
  }
const btn = document.querySelector("#btn");
btn.addEventListener("click", function (e) {
    e.target.style.background = "blue";
  }); */
