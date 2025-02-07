document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.textContent = task.text;
            if (task.completed) {
                li.style.textDecoration = "line-through";
            }
            li.addEventListener("click", () => toggleTask(index));
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "X";
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                deleteTask(index);
            });
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (text === "") return;
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ text, completed: false });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = "";
        loadTasks();
    }

    function toggleTask(index) {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }

    function deleteTask(index) {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }

    document.querySelector("button").addEventListener("click", addTask);
    loadTasks();
});
