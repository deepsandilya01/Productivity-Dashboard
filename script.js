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

function dateTimeWeather() {
  const API_KEY = "1ea45e980d314de9bb4183939260201";
  let CITY = "";

  const dom = {
    time: document.querySelector(".header1 h1"),
    date: document.querySelector(".header1 h2"),
    temp: document.querySelector(".header2 h2"),
    condition: document.querySelector(".header2 h4"),
    precipitation: document.querySelector(".header2 .precipitation"),
    humidity: document.querySelector(".header2 .humidity"),
    wind: document.querySelector(".header2 .wind"),
    header: document.querySelector("header"),
  };

  const headerInput = document.querySelector(".header1 input");
  const header1h4 = document.querySelector(".header1 h4");

  async function weatherAPICall(city) {
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city},IN`
      );

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      const { current, location } = data;

      dom.temp.textContent = `${current.temp_c} °C`;
      dom.condition.textContent = current.condition.text;
      dom.precipitation.textContent = `Precipitation : ${current.precip_mm} mm`;
      dom.humidity.textContent = `Humidity : ${current.humidity}%`;
      dom.wind.textContent = `Wind : ${current.wind_kph} km/h`;

      header1h4.textContent = `${location.name}, ${location.country}`;
    } catch (err) {
      console.error("Weather API Error:", err);

      dom.temp.textContent = `Temp : ?`;
      dom.condition.textContent = `Condition : ?`;
      dom.precipitation.textContent = `Precipitation : ?`;
      dom.humidity.textContent = `Humidity : ?`;
      dom.wind.textContent = `Wind : ?`;

      header1h4.textContent = `City not found ❌`;
    }
  }

  headerInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      CITY = e.target.value.trim();

      if (CITY.length > 2) {
        weatherAPICall(CITY);
        headerInput.value = "";
      }
    }
  });

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const pad = (n) => String(n).padStart(2, "0");

  function setBackground(hours) {
    let img = "";

    // 🌙 Late Night (12 AM – 4 AM)
    if (hours >= 0 && hours < 4) {
      img = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"; // deep night sky
    }

    // 🌌 Early Morning (4 AM – 6 AM)
    else if (hours >= 4 && hours < 6) {
      img = "https://images.unsplash.com/photo-1502082553048-f009c37129b9"; // dawn
    }

    // 🌅 Morning (6 AM – 9 AM)
    else if (hours >= 6 && hours < 9) {
      img = "https://images.unsplash.com/photo-1493359280673-61f0f1a7a11e"; // sunrise
    }

    // ☀️ Late Morning (9 AM – 12 PM)
    else if (hours >= 9 && hours < 12) {
      img = "https://images.unsplash.com/photo-1498354136128-58f790194fa7"; // bright morning
    }

    // 🌤️ Afternoon (12 PM – 4 PM)
    else if (hours >= 12 && hours < 16) {
      img = "https://images.unsplash.com/photo-1717361279773-b2e7ee713d2e"; // sunny afternoon
    }

    // 🌇 Evening (4 PM – 6 PM)
    else if (hours >= 16 && hours < 18) {
      img = "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429"; // golden hour
    }

    // 🌆 Sunset (6 PM – 8 PM)
    else if (hours >= 18 && hours < 20) {
      img = "https://images.unsplash.com/photo-1722999523044-80af4abe1ada"; // sunset
    }

    // 🌙 Night (8 PM – 12 AM)
    else {
      img = "https://images.unsplash.com/photo-1514912885225-5c9ec8507d68"; // night city
    }

    document.querySelector("header").style.backgroundImage = `url(${img})`;
  }

  function timeDate() {
    const now = new Date();

    const dayName = days[now.getDay()];
    const hours24 = now.getHours();
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());

    const hours12 = hours24 % 12 || 12;
    const ampm = hours24 >= 12 ? "PM" : "AM";

    dom.time.textContent = `${dayName} ${hours12}:${minutes}:${seconds} ${ampm}`;
    dom.date.textContent = `${now.getDate()} ${
      months[now.getMonth()]
    }, ${now.getFullYear()}`;

    setBackground(hours24);
  }

  timeDate();
  setInterval(timeDate, 1000);
}

dateTimeWeather();
