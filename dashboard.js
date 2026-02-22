const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDate");
const taskList = document.getElementById("taskList");
const progressBar = document.getElementById("progressBar");
const chartCanvas = document.getElementById("productivityChart");

let tasks = JSON.parse(localStorage.getItem("boostlyTasks")) || [];
let currentFilter = "all";

/* -------- SAVE -------- */
function saveTasks() {
  localStorage.setItem("boostlyTasks", JSON.stringify(tasks));
}

/* -------- ADD TASK -------- */
function addTask() {
  if (taskInput.value.trim() === "") return;

  tasks.push({
    text: taskInput.value,
    completed: false,
    dueDate: dueDateInput.value
  });

  taskInput.value = "";
  dueDateInput.value = "";
  saveTasks();
  renderTasks();
}

/* -------- FILTER -------- */
function setFilter(filter) {
  currentFilter = filter;
  renderTasks();
}

/* -------- RENDER -------- */
function renderTasks() {
  taskList.innerHTML = "";
  const today = new Date().toISOString().split("T")[0];

  tasks.forEach((task, index) => {
    if (
      currentFilter === "completed" && !task.completed ||
      currentFilter === "pending" && task.completed ||
      currentFilter === "overdue" &&
      (task.completed || !task.dueDate || task.dueDate >= today)
    ) {
      return;
    }

    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <div>
        <span onclick="toggleComplete(${index})">${task.text}</span>
        ${task.dueDate ? `<small>Due: ${task.dueDate}</small>` : ""}
      </div>
      <i class="fa-solid fa-trash" onclick="deleteTask(${index})"></i>
    `;

    taskList.appendChild(li);
  });

  updateStats();
  updateProgress();
  drawChart();
}

/* -------- DELETE -------- */
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

/* -------- TOGGLE COMPLETE -------- */
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

/* -------- STATS -------- */
function updateStats() {
  document.getElementById("totalTasks").textContent = tasks.length;
  document.getElementById("completedTasks").textContent =
    tasks.filter(t => t.completed).length;
  document.getElementById("pendingTasks").textContent =
    tasks.filter(t => !t.completed).length;
}

/* -------- PROGRESS BAR -------- */
function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percent = total === 0 ? 0 : (completed / total) * 100;
  progressBar.style.width = percent + "%";
}

/* -------- PRODUCTIVITY CHART -------- */
function drawChart() {
  const ctx = chartCanvas.getContext("2d");
  ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);

  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.filter(t => !t.completed).length;

  const total = completed + pending;
  if (total === 0) return;

  const completedWidth = (completed / total) * chartCanvas.width;

  ctx.fillStyle = "#6366F1";
  ctx.fillRect(0, 0, completedWidth, 40);

  ctx.fillStyle = "#00E5FF";
  ctx.fillRect(completedWidth, 0, chartCanvas.width - completedWidth, 40);
}

/* -------- INIT -------- */
renderTasks();