const addBtn = document.querySelector(".add");
const allBtn = document.querySelector(".ALL");
const searchInput = document.querySelector(".search input");
const lunaBtn = document.querySelector(".luna");
const container = document.querySelector(".container");

let tasks = [
  { text: "NOTE #1", done: false },
  { text: "NOTE #2", done: true },
  { text: "NOTE #3", done: false },
];

let currentFilter = "all";


function renderTasks(filter = "all") {
  document.querySelectorAll(".marker").forEach((el) => el.remove());

  let filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.done;
    if (filter === "completed") return task.done;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("marker");
    taskDiv.innerHTML = 
      <input type="checkbox" id="task-${index}" ${task.done ? "checked" : ""}>
      <label for="task-${index}" class="${task.done ? "done" : ""}">${task.text}</label>
      <button class="delete">✕</button>
    ;
    container.insertBefore(taskDiv, addBtn);
  });

  document.querySelectorAll(".marker input").forEach((checkbox, i) => {
    checkbox.addEventListener("change", () => {
      tasks[i].done = checkbox.checked;
      renderTasks(currentFilter);
    });
  });

  document.querySelectorAll(".delete").forEach((btn, i) => {
    btn.addEventListener("click", () => {
      tasks.splice(i, 1);
      renderTasks(currentFilter);
    });
  });
}