function openFeatures() {
  var dashboard = document.querySelector(".allElems");
  var allElems = document.querySelectorAll(".elem");
  var fullElemPage = document.querySelectorAll(".fullElem");
  var fullElemPageBackBtn = document.querySelectorAll(".fullElem .back");

  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      var id = Number(elem.dataset.id);
      fullElemPage[id].style.display = "block";
    });
  });

  fullElemPageBackBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      var id = Number(back.dataset.id);
      fullElemPage[id].style.display = "none";
    });
  });
}

openFeatures();

function todoList() {
  var currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("Task list is Empty");
  }

  function renderTask() {
    let allTask = document.querySelector(".allTask");

    let sum = "";

    currentTask.forEach(function (elem, idx) {
      sum =
        sum +
        `<div class="task">
        <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
        <p>${elem.details}</p>
        <button id=${idx}>Mark as Completed</button>
        </div>`;
    });

    allTask.innerHTML = sum;

    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    document.querySelectorAll(".task button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        renderTask();
      });
    });
  }
  renderTask();

  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form #task-input");
  let taskDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckbox = document.querySelector(".addTask form #check");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheckbox.checked,
    });
    renderTask();

    taskCheckbox.checked = false;
    taskInput.value = "";
    taskDetailsInput.value = "";
  });
}

todoList();

function dailyPlanner() {
  var dayPlanner = document.querySelector(".day-planner");

  var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  var hours = Array.from(
    { length: 18 },
    (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`
  );

  var wholeDaySum = "";
  hours.forEach(function (elem, idx) {
    var savedData = dayPlanData[idx] || "";

    wholeDaySum =
      wholeDaySum +
      `<div class="day-planner-time">
    <p>${elem}</p>
    <input id=${idx} type="text" placeholder="..." value=${savedData}>
</div>`;
  });

  dayPlanner.innerHTML = wholeDaySum;

  var dayPlannerInput = document.querySelectorAll(".day-planner input");

  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      console.log("hello");
      dayPlanData[elem.id] = elem.value;

      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}

dailyPlanner();

function motivationalQuote() {
  var motivationQuoteContent = document.querySelector(".motivation-2 h1");
  var motivationAuthor = document.querySelector(".motivation-3 h2");

  async function fetchQuote() {
    let response = await fetch("https://dummyjson.com/quotes/random");
    let data = await response.json();

    motivationQuoteContent.innerHTML = data.quote;
    motivationAuthor.innerHTML = data.author;
  }

  fetchQuote();
}

motivationalQuote();

function pomodoroTimer() {
  let timer = document.querySelector(".pomo-timer h1");
  let startBtn = document.querySelector(".pomo-timer .start-timer");
  let pauseBtn = document.querySelector(".pomo-timer .pause-timer");
  let resetBtn = document.querySelector(".pomo-timer .reset-timer");
  let session = document.querySelector(".pomodoro-fullpage .session");
  let isWorkSession = true;

  let totalSeconds = 25 * 60;
  let timerInterval = null;

  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    timer.innerHTML = `${String(minutes).padStart("2", "0")}:${String(
      seconds
    ).padStart("2", "0")}`;
  }

  function startTimer() {
    clearInterval(timerInterval);

    if (isWorkSession) {
      timerInterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = false;
          clearInterval(timerInterval);
          timer.innerHTML = "05:00";
          session.innerHTML = "Take a Break";
          session.style.backgroundColor = "var(--blue)";
          totalSeconds = 5 * 60;
        }
      }, 10);
    } else {
      timerInterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = true;
          clearInterval(timerInterval);
          timer.innerHTML = "25:00";
          session.innerHTML = "Work Session";
          session.style.backgroundColor = "var(--green)";
          totalSeconds = 25 * 60;
        }
      }, 10);
    }
  }

  function pauseTimer() {
    clearInterval(timerInterval);
  }
  function resetTimer() {
    clearInterval(timerInterval);

    isWorkSession = true;
    totalSeconds = 25 * 60;

    timer.innerHTML = "25:00";
    session.innerHTML = "Work Session";
    session.style.backgroundColor = "var(--green)";

    timerInterval = null;
  }
  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}

pomodoroTimer();

function dailyGoals() {
  let form = document.querySelector(".addGoal form");
  let goalDetailsInput = document.querySelector(".addGoal form textarea");

  var currentGoal = [];

  if (localStorage.getItem("currentGoal")) {
    currentGoal = JSON.parse(localStorage.getItem("currentGoal"));
  } else {
    console.log("goal is empty");
  }

  function renderGoal() {
    let allGoal = document.querySelector(".allGoal");
    let clutter = "";

    currentGoal.forEach(function (elem, idx) {
      clutter += `<div class="goal">
                        <p>${elem.details}</p>
                        <button id="${idx}">Mark as completed</button>
                    </div>`;
    });

    allGoal.innerHTML = clutter;
    localStorage.setItem("currentGoal", JSON.stringify(currentGoal));

    document.querySelectorAll(".goal button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentGoal.splice(btn.id, 1);
        renderGoal();
      });
    });
  }
  renderGoal();
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currentGoal.push({ details: goalDetailsInput.value });
    renderGoal();
    goalDetailsInput.value = "";
  });
}

dailyGoals();
