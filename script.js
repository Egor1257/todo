const addBtn = document.querySelector(".add");
const block = document.querySelector(".block");
const cancelBtn = document.querySelector(".cancel");
const applyBtn = document.querySelector(".apply");
const inputField = document.querySelector(".modal input");
const tasksContainer = document.querySelector(".tasks");
const searchInput = document.querySelector(".search input");
const filterSelect = document.querySelector(".filter");

// --- открыть модалку ---
addBtn.addEventListener("click", () => {
  block.style.display = "flex";
});

// --- закрыть модалку ---
cancelBtn.addEventListener("click", () => {
  block.style.display = "none";
});

// --- добавление новой заметки ---
applyBtn.addEventListener("click", () => {
  const text = inputField.value.trim();
  if (text === "") return;

  createNote(text);

  inputField.value = "";
  block.style.display = "none";
});

// ======= ФУНКЦИЯ СОЗДАНИЯ ЗАМЕТКИ =========
function createNote(text) {
  const note = document.createElement("div");
  note.classList.add("marker", "item");

  const left = document.createElement("div");
  left.style.display = "flex";
  left.style.alignItems = "center";
  left.style.gap = "10px";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const label = document.createElement("label");
  label.textContent = text;

  checkbox.addEventListener("change", () => {
    label.classList.toggle("done", checkbox.checked);
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
    note.style.opacity = "0";
    note.style.transform = "translateX(-20px)";
    setTimeout(() => note.remove(), 200);
  });

  note.appendChild(left);
  note.appendChild(editBtn);
  note.appendChild(deleteBtn);

  tasksContainer.appendChild(note);
}

// ====== Закрытие модалки кликом по фону ======
block.addEventListener("click", (e) => {
  if (e.target === block) block.style.display = "none";
});

// ====== ТЕМНАЯ ТЕМА ======
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

// ====== ПОИСК ======
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  document.querySelectorAll(".item").forEach((note) => {
    const text = note.querySelector("label").textContent.toLowerCase();
    note.style.display = text.includes(value) ? "flex" : "none";
  });
});

// ====== ФИЛЬТР (ALL / Active / Done) ======
filterSelect.addEventListener("change", () => {
  const value = filterSelect.value;

  document.querySelectorAll(".item").forEach((note) => {
    const isDone = note.querySelector("input[type='checkbox']").checked;

    if (value === "ALL") {
      note.style.display = "flex";
    } else if (value === "Active") {
      note.style.display = isDone ? "none" : "flex";
    } else if (value === "Done") {
      note.style.display = isDone ? "flex" : "none";
    }
  });
});
