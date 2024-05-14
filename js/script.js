"use strict";

function handleDragStart(e) {
  e.dataTransfer.setData("text/plain", this.id);
}

function handleDragEnter(e) {
  e.preventDefault();
  this.style.backgroundColor = "lightgray";
}

function handleDragLeave() {
  this.style.backgroundColor = "";
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();

  const draggedTaskId = e.dataTransfer.getData("text/plain");

  const draggedTask = document.getElementById(draggedTaskId);
  let dropTarget = this;
  while (dropTarget && !dropTarget.classList.contains("task")) {
    dropTarget = dropTarget.parentNode;
  }

  if (dropTarget) {
    dropTarget.parentNode.insertBefore(draggedTask, dropTarget);
  } else {
    document.querySelector(".tasks").appendChild(draggedTask);
  }

  saveTasks();
  
}

document.querySelector(".tasks").addEventListener("click", function (e) {
  let targetElement = e.target;

  while (targetElement != null) {
    if (targetElement.classList.contains("crossButton")) {
      targetElement.closest(".task").remove();

      saveTasks();

      return;
    }
    targetElement = targetElement.parentElement;
  }
});

function saveTasks() {
  const tasks = Array.from(document.querySelectorAll(".task"));
  const tasksData = tasks.map((task) => ({
    html: task.outerHTML,
    textContent: task.textContent,
    isCompleted: task.classList.contains("line-through"),
  }));

  localStorage.setItem("tasks", JSON.stringify(tasksData));
}

function loadTasks() {
  const tasksData = JSON.parse(localStorage.getItem("tasks"));

  if (tasksData) {
    const tasksContainer = document.querySelector(".tasks");
    tasksData.forEach((taskData) => {
      tasksContainer.insertAdjacentHTML("beforeend", taskData.html);
      const task = tasksContainer.lastChild;
      if (taskData.isCompleted) {
        const hide = task.querySelector(".hide");
        const taskText = task.querySelector(".taskP");
        hide.classList.add("hidden");
        taskText.classList.add("text-lightGrayishBlue");
        taskText.style.textDecoration = "line-through";
      }

      task.setAttribute("draggable", "true");
      task.addEventListener("dragstart", handleDragStart);
      task.addEventListener("dragenter", handleDragEnter);
      task.addEventListener("dragleave", handleDragLeave);
      task.addEventListener("dragover", handleDragOver);
      task.addEventListener("drop", handleDrop);
    });
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  loadTasks();
  
  let currentMode = localStorage.getItem("mode") || "light";

  const inputStyle = document.getElementById("inputStyle");
  const moonIcon = document.querySelector(".icon-moon");
  const sunIcon = document.querySelector(".icon-sun");
  sunIcon.style.display = "none";

  if (currentMode === "dark") {
    moonIcon.style.display = "none";
    sunIcon.style.display = "block";
  } else {
    moonIcon.style.display = "block";
    sunIcon.style.display = "none";
  }

  
  function updateUI() {
    console.log("Updating UI");
    const bodyClassList = document.body.classList;
    const tasksText = document.querySelectorAll(".taskP");
    const textBg = document.querySelectorAll(".task");
    const inputStyle = document.getElementById("inputStyle");
    const tasksCounter = document.getElementById("bg-tasks-counter");
    const footer = document.getElementById("bg-footer");
    const footerD = document.getElementById("bg-footer-d");
    if (currentMode === "dark") {
      bodyClassList.add("dark-mode", "bg-veryDarkBlue");
      bodyClassList.remove("bg-veryLightGray");
      tasksText.forEach((task) => {
        task.classList.add("text-lightGrayishBlueHover");
      });
      textBg.forEach((task) => {
        task.classList.add("dark-mode", "bg-veryDarkDesaturatedBlue");
        task.classList.remove("bg-white");
      });

      inputStyle.classList.add("bg-veryDarkDesaturatedBlue", "text-white");
      inputStyle.classList.remove("bg-white");
      tasksCounter.classList.remove("bg-white");
      tasksCounter.classList.add("bg-veryDarkDesaturatedBlue");
      footer.classList.remove("bg-white");
      footer.classList.add("bg-veryDarkDesaturatedBlue");
      footerD.classList.remove("bg-white");
      footerD.classList.add("bg-veryDarkDesaturatedBlue");
    } else {
      bodyClassList.add("bg-veryLightGray");
      bodyClassList.remove("dark-mode", "bg-veryDarkBlue");
      tasksText.forEach((task) => {
        task.classList.remove("text-lightGrayishBlueHover");
      });
      textBg.forEach((task) => {
        task.classList.remove("dark-mode", "bg-veryDarkDesaturatedBlue");
        task.classList.add("bg-white");
      });
      inputStyle.classList.remove("bg-veryDarkDesaturatedBlue", "text-white");
      inputStyle.classList.add("bg-white", "text-darkGray");
      tasksCounter.classList.add("bg-white");
      tasksCounter.classList.remove("bg-veryDarkDesaturatedBlue");
      footer.classList.add("bg-white");
      footer.classList.remove("bg-veryDarkDesaturatedBlue");
      footerD.classList.add("bg-white");
      footerD.classList.remove("bg-veryDarkDesaturatedBlue");
    }
    console.log("currentMode:", currentMode);
    console.log("inputStyle element:", inputStyle);
    console.log("tasksCounter element:", tasksCounter);
    console.log("footerD element:", footerD);
  }

  function toggleMode() {
    currentMode = currentMode === "light" ? "dark" : "light";
    localStorage.setItem("mode", currentMode);

    if (currentMode === "dark") {
      moonIcon.style.display = "none";
      sunIcon.style.display = "block";
    } else {
      moonIcon.style.display = "block";
      sunIcon.style.display = "none";
    }

    updateUI();
    saveTasks();
  }
  moonIcon.addEventListener("click", toggleMode);
  sunIcon.addEventListener("click", toggleMode);

  updateUI();

  localStorage.setItem("mode", currentMode);
  saveTasks();

  const tasks = document.querySelectorAll(".task");
  tasks.forEach((task) => {
    task.setAttribute("draggable", "true");
    task.addEventListener("dragstart", handleDragStart);
    task.addEventListener("dragenter", handleDragEnter);
    task.addEventListener("dragleave", handleDragLeave);
    task.addEventListener("dragover", handleDragOver);
    task.addEventListener("drop", handleDrop);
  });

  inputStyle.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && this.value.trim() !== "") {
      e.preventDefault();

      var taskId = "task" + Date.now();
      var taskHTML = `
  <div  id="${taskId}" class="task mx-auto md:w-2/5  flex items-center py-4 border-b border-gray-300 bg-white rounded-t-lg text-xs font-100 font-body pt-[17px] pb-[17px] pl-5 pr-3 tracking-normal cursor-pointer">
    <button class="toggleButton cursor-pointer circle mr-3 relative w-5 h-5 border border-gray-200 rounded-full">
      <div class='hide hidden'>
        <div class="checkContainer hover-border absolute flex justify-center align-middle items-center w-5 h-5 rounded-full bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-checkBackgroundLinearGgradient1 to-checkBackgroundLinearGgradient2 border-2  ">
          <img src="images/icon-check.svg" alt="Check Icon" class="w-[10px] h-[10px]">
        </div>
      </div>
    </button>
    <p class="taskP flex-1 text-[12px] font-body tracking-wider text-darkGrayishBlue  bottom-3 ml-1 hover:text-lg">${this.value}</p>
    <button class='crossButton ml-auto focus:outline-none'>
      <img src="images/icon-cross.svg" alt="Cross Icon" class="w-[13px] h-[13px]">
    </button>
  </div>
`;

      document
        .querySelector(".tasks")
        .insertAdjacentHTML("beforeend", taskHTML);
      document.querySelector(".count").textContent =
        document.querySelectorAll(".task").length;

      var newTask = document.getElementById(taskId);
      newTask.addEventListener("dragstart", handleDragStart);
      newTask.addEventListener("dragenter", handleDragEnter);
      newTask.addEventListener("dragleave", handleDragLeave);
      newTask.addEventListener("dragover", handleDragOver);
      newTask.addEventListener("drop", handleDrop);


      var taskP = newTask.querySelector('.taskP');
      taskP.addEventListener('mouseover', function() {
        this.style.fontSize = 'larger'; // Replace 'larger' with the actual size you want
      });
      taskP.addEventListener('mouseout', function() {
        this.style.fontSize = '12px'; // Replace '12px' with the original size
      });



      if (currentMode === "dark") {
        newTask.classList.add("dark-mode", "bg-veryDarkDesaturatedBlue");
        newTask.classList.remove("bg-white");
      }

      this.value = "";
      saveTasks();
    }
  });

  document.querySelector(".tasks").addEventListener("click", function (e) {
    if (e.target.classList.contains("toggleButton")) {
      const hide = e.target.querySelector(".hide");
      const taskText = e.target.nextElementSibling;

      hide.classList.toggle("hidden");
      taskText.classList.add("text-lightGrayishBlue");
      taskText.style.textDecoration = "line-through";

      const totalTasks = document.querySelectorAll(".task").length;
      const completedTasks = document.querySelectorAll(
        ".taskP.text-lightGrayishBlue"
      ).length;
      const tasksLeft = totalTasks - completedTasks;
      document.querySelector(".count").textContent = tasksLeft;
      saveTasks();
    }
  });

  document.querySelector(".tasks").addEventListener("click", function (e) {
    let targetElement = e.target;

    while (targetElement != null) {
      if (targetElement.classList.contains("crossButton")) {
        targetElement.closest(".task").remove();
        return;
      }
      targetElement = targetElement.parentElement;
    }
  });

  
  document.querySelectorAll(".completed-btn").forEach((completedBtn) => {
    completedBtn.addEventListener("click", function () {
      const allTasks = document.querySelectorAll(".task");

      allTasks.forEach(function (task) {
        if (
          task
            .querySelector(".taskP")
            .classList.contains("text-lightGrayishBlue")
        ) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
      });

      const completedTasks = document.querySelectorAll(
        ".taskP.text-lightGrayishBlue"
      );
      document.querySelector(".count").textContent = completedTasks.length;
    });
  });
  document.querySelectorAll(".active-btn").forEach((activeBtn) => {
    activeBtn.addEventListener("click", function () {
      const allTasks = document.querySelectorAll(".task");
      allTasks.forEach(function (task) {
        if (
          task
            .querySelector(".taskP")
            .classList.contains("text-lightGrayishBlue")
        ) {
          task.style.display = "none";
        } else {
          task.style.display = "flex";
        }
      });
    });

    const activeTasks = document.querySelectorAll(
      ".taskP:not(.text-lightGrayishBlue)"
    );
    document.querySelector(".count").textContent = activeTasks.length;
  });

  document.querySelectorAll(".all-btn").forEach((allBtn) => {
    allBtn.addEventListener("click", function () {
      const allTasks = document.querySelectorAll(".task");

      allTasks.forEach(function (task) {
        task.style.display = "flex";
        task.addEventListener("dragstart", handleDragStart);
        task.addEventListener("dragenter", handleDragEnter);
        task.addEventListener("dragleave", handleDragLeave);
        task.addEventListener("dragover", handleDragOver);
        task.addEventListener("drop", handleDrop);
      });

      document.querySelector(".count").textContent = allTasks.length;
    });
  });

  document.querySelectorAll(".clear-btn").forEach((clearBtn) => {
    clearBtn.addEventListener("click", function () {
      const completedTasks = document.querySelectorAll(
        ".taskP.text-lightGrayishBlue"
      );
      completedTasks.forEach(function (task) {
        task.parentElement.remove();
      });
      document.querySelector(".count").textContent =
        document.querySelectorAll(".task").length;
        saveTasks();
    });
  });
});
