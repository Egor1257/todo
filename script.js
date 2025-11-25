// ======================
// Получаем элементы DOM
// ======================
const addBtn = document.querySelector(".add");
const block = document.querySelector(".block");
const cancelBtn = document.querySelector(".cancel");
const applyBtn = document.querySelector(".apply");
const inputField = document.querySelector(".modal input");
const tasksContainer = document.querySelector(".tasks");
const searchInput = document.querySelector(".search input");
const filterSelect = document.querySelector(".filter");
const themeToggleBtn = document.getElementById("themeToggle");
const themeToggleBtn_img = document.querySelector("#themeToggle img");

// ======================
// --- открыть модалку ---
// ======================
addBtn.addEventListener("click", () => {
  block.style.display = "flex";
});

// ======================
// --- закрыть модалку ---
// ======================
cancelBtn.addEventListener("click", () => {
  block.style.display = "none";
});

// ======================
// --- закрытие модалки кликом по фону ---
// ======================
block.addEventListener("click", (e) => {
  if (e.target === block) block.style.display = "none";
});

// ======================
// --- добавление новой заметки ---
// ======================
applyBtn.addEventListener("click", () => {
  const text = inputField.value.trim();
  if (text === "") return;

  createNote(text);

  inputField.value = "";
  block.style.display = "none";
});

// ======================
// ======= ФУНКЦИЯ СОЗДАНИЯ ЗАМЕТКИ =========
// ======================
function createNote(text) {
  const note = document.createElement("div");
  note.classList.add("marker", "item"); // "item" нужен для поиска/фильтра

  const left = document.createElement("div");
  left.style.display = "flex";
  left.style.alignItems = "center";
  left.style.gap = "10px";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const label = document.createElement("label");
  label.textContent = text;

  // --------- ЛОГИКА ЧЕКБОКСА ------------
  checkbox.addEventListener("change", () => {
    label.classList.toggle("done", checkbox.checked); // зачёркивание
    note.classList.toggle("done", checkbox.checked); // для фильтра
    applyFilter(); // обновляем фильтр сразу
  });

  left.appendChild(checkbox);
  left.appendChild(label);

  // ---- Кнопка EDIT ----
  const editBtn = document.createElement("button");
  editBtn.textContent = "EDIT";
  editBtn.classList.add("edit-btn");

  editBtn.addEventListener("click", () => {
    const newText = prompt("Edit note:", label.textContent);
    if (newText && newText.trim() !== "") {
      label.textContent = newText.trim();
    }
  });

  // ---- Кнопка DELETE ----
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "DEL";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", () => {
    note.remove();
  });

  note.appendChild(left);
  note.appendChild(editBtn);
  note.appendChild(deleteBtn);

  tasksContainer.appendChild(note);
}

// ======================
// ====== ПОИСК ЗАМЕТОК ======
// ======================
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  document.querySelectorAll(".item").forEach((note) => {
    const text = note.querySelector("label").textContent.toLowerCase();
    note.style.display = text.includes(value) ? "flex" : "none";
  });
});

// ======================
// ====== ФИЛЬТР ACTIVE / DONE / ALL ======
// ======================
filterSelect.addEventListener("change", applyFilter);

function applyFilter() {
  const value = filterSelect.value;
  const notes = document.querySelectorAll(".item");

  notes.forEach((note) => {
    const isDone = note.classList.contains("done");

    if (value === "ALL") {
      note.style.display = "flex";
    } else if (value === "Active") {
      note.style.display = isDone ? "none" : "flex";
    } else if (value === "Done") {
      note.style.display = isDone ? "flex" : "none";
    }
  });
}
// ======================
// ====== ТЕМНАЯ ТЕМА ======
// ======================
themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (themeToggleBtn_img.getAttribute("src") === "moon.svg") {
    themeToggleBtn_img.setAttribute("src", "sun.svg");
  } else {
    themeToggleBtn_img.setAttribute("src", "moon.svg");
  }
});
