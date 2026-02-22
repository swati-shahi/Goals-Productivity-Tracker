function initDashboard() {
    checkAuth();

    const user = JSON.parse(localStorage.getItem("boostlyUser"));
    document.getElementById("welcomeUser").innerText = 
        "Welcome, " + user.name + " 👋";

    loadTasks();
    updateAnalytics();
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value;

    if (!taskText) return;

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({
        text: taskText,
        date: new Date().toISOString()
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";

    loadTasks();
    updateAnalytics();
}

function loadTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${task.text}
            <button onclick="deleteTask(${index})">❌</button>
        `;
        taskList.appendChild(li);
    });
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    loadTasks();
    updateAnalytics();
}

function updateAnalytics() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const today = new Date();
    let daily = 0;
    let weekly = 0;
    let monthly = 0;

    tasks.forEach(task => {
        const taskDate = new Date(task.date);
        const diff = today - taskDate;

        const dayDiff = diff / (1000 * 60 * 60 * 24);

        if (dayDiff <= 1) daily++;
        if (dayDiff <= 7) weekly++;
        if (dayDiff <= 30) monthly++;
    });

    document.getElementById("dailyCount").innerText = daily;
    document.getElementById("weeklyCount").innerText = weekly;
    document.getElementById("monthlyCount").innerText = monthly;
}
