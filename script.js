const form = document.querySelector("#taskForm");
const inputTask = document.querySelector("#inputTask");
const taskList = document.querySelector("#taskList");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const task = inputTask.value;

  if (!task) {
    alert("Please write down a task");
    return;
  }

  // Create the new task list item using innerHTML
  const newLi = document.createElement("li");
  newLi.innerHTML = `
    <span>${task}</span>
    <button class="edit-button">Edit</button>
    <button class="delete-button">Delete</button>
  `;

  taskList.appendChild(newLi);
  inputTask.value = ""; // Clear input field

  // Add event listeners for Edit and Delete buttons
  const deleteButton = newLi.querySelector(".delete-button");
  const editButton = newLi.querySelector(".edit-button");

  deleteButton.addEventListener("click", () => deleting(newLi));
  editButton.addEventListener("click", () => editing(newLi, editButton));
});

// Delete functionality
function deleting(liTag) {
  taskList.removeChild(liTag);
}

// Edit functionality
function editing(liTag, editButton) {
  const liContent = liTag.querySelector("span");
  const currentTask = liContent.textContent;

  // Replace content with input field
  liTag.innerHTML = `
    <input type="text" value="${currentTask}" class="edit-input" />
    <button class="save-button">Save</button>
    <button class="delete-button">Delete</button>
  `;

  // Add event listeners for Save and Delete buttons
  const saveButton = liTag.querySelector(".save-button");
  const deleteButton = liTag.querySelector(".delete-button");
  const editInput = liTag.querySelector(".edit-input");

  saveButton.addEventListener("click", () => saving(liTag, editInput));
  deleteButton.addEventListener("click", () => deleting(liTag));
}

// Save functionality
function saving(liTag, input) {
  const updatedTask = input.value;

  // Update task content
  liTag.innerHTML = `
    <span>${updatedTask}</span>
    <button class="edit-button">Edit</button>
    <button class="delete-button">Delete</button>
  `;

  // Reattach event listeners for Edit and Delete
  const editButton = liTag.querySelector(".edit-button");
  const deleteButton = liTag.querySelector(".delete-button");

  editButton.addEventListener("click", () => editing(liTag, editButton));
  deleteButton.addEventListener("click", () => deleting(liTag));
}
