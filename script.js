const addBtn = document.querySelector(".add");
const allBtn = document.querySelector(".ALL");
const searchInput = document.querySelector(".search input");
const container = document.querySelector(".container");
const lunaBtn = document.querySelector(".luna");
const listContainer = document.querySelector(".container");

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
      <input type="checkbox" id="task-${index}" ${
      task.done ? "checked" : ""
    } />
      <label for="task-${index}" class="${task.done ? "done" : ""}">${
      task.text
    }</label>
      <button class="delete">✕</button>
    ;
    listContainer.insertBefore(taskDiv, addBtn);
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


addBtn.addEventListener("click", () => {
  const text = prompt("Введите новую задачу:");
  if (text && text.trim() !== "") {
    tasks.push({ text: text.trim(), done: false });
    renderTasks(currentFilter);
  } else {
    alert("Задача не может быть пустой!");
  }
});


searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll(".marker label").forEach((label) => {
    label.parentElement.style.display = label.textContent
      .toLowerCase()
      .includes(query)
      ? "flex"
      : "none";
  });
});


const filterMenu = document.createElement("div");
filterMenu.classList.add("filters");
filterMenu.innerHTML = 
  <button class="filter" data-filter="all">Все</button>
  <button class="filter" data-filter="active">Активные</button>
  <button class="filter" data-filter="completed">Выполненные</button>
;
allBtn.insertAdjacentElement("afterend", filterMenu);

document.querySelectorAll(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    renderTasks(currentFilter);
  });
});

lunaBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});


renderTasks();