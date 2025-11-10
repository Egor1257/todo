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
