let chart;

function initDashboard() {
    checkAuth();

    const user = JSON.parse(localStorage.getItem("boostlyUser"));
    document.getElementById("welcomeUser").innerText =
        "Welcome, " + user.name + " 👋";

    loadTasks();
    updateAnalytics();
    createChart();
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const category = document.getElementById("categorySelect").value;
    const dueDate = document.getElementById("dueDate").value;
    const priority = document.getElementById("prioritySelect").value;

    if (!taskInput.value) return;

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({
        text: taskInput.value,
        category,
        dueDate,
        priority,
        completed: false,
        date: new Date().toISOString()
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";

    loadTasks();
    updateAnalytics();
    createChart();
}

function loadTasks(filteredCategory = "All") {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (filteredCategory !== "All") {
        tasks = tasks.filter(task => task.category === filteredCategory);
    }

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed-task" : "";

        li.innerHTML = `
            <div>
                <strong>${task.text}</strong>
                <br>
                <small>${task.category} | ${task.priority} | Due: ${task.dueDate || "N/A"}</small>
            </div>

            <div>
                <button onclick="toggleComplete(${index})">✔</button>
                <button onclick="deleteTask(${index})">❌</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function filterTasks() {
    const selected = document.getElementById("filterSelect").value;
    loadTasks(selected);
}

function toggleComplete(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = !tasks[index].completed;

    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
    updateAnalytics();
    createChart();
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
    updateAnalytics();
    createChart();
}

function updateAnalytics() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const completed = tasks.filter(task => task.completed).length;

    document.getElementById("dailyCount").innerText = tasks.length;
    document.getElementById("weeklyCount").innerText = completed;
    document.getElementById("monthlyCount").innerText =
        tasks.length > 0 ? Math.round((completed / tasks.length) * 100) + "%" : "0%";
}

function createChart() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const completed = tasks.filter(task => task.completed).length;
    const pending = tasks.length - completed;

    const ctx = document.getElementById("progressChart");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Completed", "Pending"],
            datasets: [{
                data: [completed, pending],
                backgroundColor: ["#4CAF50", "#FF5252"]
            }]
        }
    });
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
