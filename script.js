const modal = document.getElementById("modal");
const addBtn = document.getElementById("addBtn");
const cancelBtn = document.getElementById("cancel");
const applyBtn = document.getElementById("apply");
const input = document.getElementById("newNoteInput");
const tasks = document.getElementById("tasks");


addBtn.addEventListener("click", () => {
  modal.classList.add("active");
  input.value = "";
  input.focus();
});


cancelBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});


modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("active");
});


applyBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text === "") return;

  const note = document.createElement("div");
  note.classList.add("marker");
  note.innerHTML = 
    <input type="checkbox" />
    <label>${text}</label>
    ;
  tasks.appendChild(note);

  modal.classList.remove("active");
});