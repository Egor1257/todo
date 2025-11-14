const addBtn = document.querySelector(".add");
const block = document.querySelector(".block");
const cancelBtn = document.querySelector(".cancel");
const applyBtn = document.querySelector(".apply");
const inputField = document.querySelector(".modal input");
const tasksContainer = document.querySelector(".tasks");

addBtn.addEventListener("click", () => {
  console.log("+");
  block.style.display = "flex";
});

cancelBtn.addEventListener("click", () => {
  console.log("CANCEL");
  block.style.display = "none";
});

applyBtn.addEventListener("click", () => {
  const text = inputField.value.trim();
  if (text === "") return;

  const note = document.createElement("div");
  note.classList.add("marker");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const label = document.createElement("label");
  label.textContent = text;

  checkbox.addEventListener("change", () => {
    label.classList.toggle("done", checkbox.checked);
  });

  note.appendChild(checkbox);
  note.appendChild(label);
  tasksContainer.appendChild(note);

  block.style.display = "none";
});
const themeToggleBtn = document.getElementById("themeToggle");
const themeToggleBtn_img = document.querySelector("#themeToggle img");

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (themeToggleBtn_img.getAttribute("src") === "moon.svg") {
    themeToggleBtn_img.setAttribute("src", "sun.svg");
  } else {
    themeToggleBtn_img.setAttribute("src", "moon.svg");
  }
});
// const text_note = document.querySelector(".your-note").value;
// const label = document.createElement("label");
// const input = document.createElement("input");
// const span_fake_cb = document.createElement("span");
// const span_text = document.createElement("span");

// label.classList.add("item");
// input.classList.add("cb");
// input.setAttribute("type", "checkbox");

// span_fake_cb.classList.add("fake-cb");
// span_fake_cb.setAttribute("aria-hidden", "true");

// span_text.classList.add("text");
// span_text.innerText = text_note;

// label.appendChild(input);
// label.appendChild(span_fake_cb);
// label.appendChild(span_text);

// document.querySelector(".tasks").appendChild(label);

// document.querySelector(".block").style.display = "none";



