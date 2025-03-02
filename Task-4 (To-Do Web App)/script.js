document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskText = document.getElementById("task").value.trim();
    let taskDate = document.getElementById("taskDate").value;

    if (taskText === "" || taskDate === "") {
        alert("Please enter both task and date/time.");
        return;
    }

    let task = {
        text: taskText,
        date: taskDate,
        completed: false
    };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("task").value = "";
    document.getElementById("taskDate").value = "";

    renderTasks();
}

function renderTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        let taskInfo = document.createElement("span");
        taskInfo.innerHTML = `${task.text} <br> <small>${new Date(task.date).toLocaleString()}</small>`;

        let taskButtons = document.createElement("div");
        taskButtons.classList.add("task-buttons");

        let completeBtn = document.createElement("button");
        completeBtn.innerText = task.completed ? "Undo" : "Complete";
        completeBtn.style.background = task.completed ? "#dc3545" : "#007bff";
        completeBtn.style.color = "white";
        completeBtn.onclick = () => toggleComplete(index);

        let editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.style.background = "#ffc107";
        editBtn.onclick = () => editTask(index);

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.style.background = "#dc3545";
        deleteBtn.onclick = () => deleteTask(index);

        taskButtons.appendChild(completeBtn);
        taskButtons.appendChild(editBtn);
        taskButtons.appendChild(deleteBtn);

        li.appendChild(taskInfo);
        li.appendChild(taskButtons);
        taskList.appendChild(li);
    });
}

function toggleComplete(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let newText = prompt("Edit Task", tasks[index].text);
    let newDate = prompt("Edit Date & Time (YYYY-MM-DD HH:MM)", tasks[index].date);

    if (newText !== null && newDate !== null) {
        tasks[index].text = newText;
        tasks[index].date = newDate;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function loadTasks() {
    renderTasks();
}
