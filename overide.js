// document.addEventListener("DOMContentLoaded", () => {
const actionBtn = document.querySelector(".addlist");
const reset = document.querySelector(".btn-secondary");
const submit = document.querySelector(".btn-primary");
const inputField = document.getElementById("todoinput");
const todoTimer = document.getElementById("todoTimer");
const todoTimermin = document.getElementById("todoTimermin");
const breaktime = document.getElementById("breaktime");
const countUntil = document.getElementById("countdownto");
const countUntilmin = document.getElementById("countdowntomin");
const breakbtw = document.getElementById("breakbtw");
const nav = document.querySelector(".nav");
const menubtn = document.querySelector(".menubtn");
const dialog = document.getElementById("myDialog");
const closemodal = document.getElementById("closemodal");
const userSetting = document.getElementById("userSetting");
const repeatTimer = document.getElementById("repeatTimer");
let stat;
const handleTimerPause = () => {
  let userData = JSON.parse(localStorage.getItem("userData")); //Full data
  const preDate = new Date(userData.countUntil);
  let postDate = new Date();
  let diff = preDate - postDate;

  let ms = diff % 1000;
  let ss = Math.floor(diff / 1000) % 60;
  let mm = Math.floor(diff / 1000 / 60) % 60;
  let hh = Math.floor(diff / 1000 / 60 / 60);

  console.log(`${diff}ms = ${hh}hr, ${mm}min, ${ss}sec, ${ms}ms`);
  return [hh, mm];
};
function menuactivate() {
  // menubtn.classList.toggle("active");
  // hand.classList.toggle("active");
  // dialog.classList.toggle("active");
  // userSetting.classList.toggle("active");
  dialog.showModal();
  // console.log(dialog.attributes);
}
closemodal.addEventListener("click", () => {
  menuactivate();
  dialog.close();
});
const hand = document.querySelector(".hand");
hand.addEventListener("click", menuactivate);
// Handle user input
async function handleUserData() {
  // // CALCULATE THE ADDED HOURS.
  let dateNew = new Date();
  dateNew.setHours(dateNew.getHours() + Number(countUntil.value));
  // CALCULATE THE ADDED MINS
  if (countUntilmin.value !== "") {
    dateNew.setMinutes(dateNew.getMinutes() + Number(countUntilmin.value));
  }
  let userData = {
    displayTime: [countUntil.value, countUntilmin.value],
    countTo: Number(countUntil.value), //Hour
    countTomin: Number(countUntilmin.value), //min
    breakTime: breaktime.value, //sec
    break: breakbtw.value,
    totalBreakTime: breaktime.value * breakbtw.value,
    countUntil: dateNew,
    todoList: [],
    timerrepeat: repeatTimer.checked,
  }; // store user data
  // getPer();
  // Check for exstiting data\
  const persistant = JSON.parse(localStorage.getItem("userData"));
  if (persistant !== null) {
    if (persistant.todoList !== undefined) {
      userData.todoList = [...persistant.todoList];
    }
  }

  console.log(userData);

  localStorage.setItem("userData", JSON.stringify(userData));
  location.reload();
}
const btnform = document.querySelector(".form");
btnform.addEventListener("submit", async (event) => {
  menubtn.classList.toggle("active");
  hand.classList.toggle("active");
  dialog.classList.toggle("active");
  dialog.close();
  event.preventDefault();
  await handleUserData();
});
reset.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

function counter() {
  let userData = JSON.parse(localStorage.getItem("userData"));
  // console.log(userData);
  if (userData !== null) {
    const countUntilDate = userData.countUntil;
    if (new Date() <= new Date(countUntilDate)) {
      const [disHour, disMin] = userData.displayTime;
      const countUntil = document.getElementById("countdownto");
      const countUntilmin = document.getElementById("countdowntomin");
      countUntil.value = disHour;
      countUntilmin.value = disMin;
      repeatTimer.checked = userData.timerrepeat;
      options = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      };
      let countEndAt = new Intl.DateTimeFormat("en-IN", options).format(
        new Date(countUntilDate)
      );

      document.getElementById(
        "countendat"
      ).innerHTML = `The Set timer will expire at <span class="time">${countEndAt}</span>`;
      stat = setInterval(() => {
        if (new Date(countUntilDate) > new Date()) {
          const currentDate = new Date();
          const timeBetweenDates = Math.ceil(
            (new Date(countUntilDate) - currentDate) / 1000
          );
          flipAllCards(timeBetweenDates);
          previousTimeBetweenDates = timeBetweenDates;
        }
      }, 250);
      let previousTimeBetweenDates;
    }
  }
}

function flipAllCards(time) {
  if (time !== 0) {
    const seconds = time % 60;
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);

    flip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10));
    flip(document.querySelector("[data-hours-ones]"), hours % 10);
    flip(
      document.querySelector("[data-minutes-tens]"),
      Math.floor(minutes / 10)
    );
    flip(document.querySelector("[data-minutes-ones]"), minutes % 10);
    flip(
      document.querySelector("[data-seconds-tens]"),
      Math.floor(seconds / 10)
    );
    flip(document.querySelector("[data-seconds-ones]"), seconds % 10);
  }
}

function flip(flipCard, newNumber) {
  const topHalf = flipCard.querySelector(".flip-top");
  const startNumber = parseInt(topHalf.textContent);
  if (newNumber === startNumber) return;

  const bottomHalf = flipCard.querySelector(".flip-bottom");
  const topFlip = document.createElement("div");
  topFlip.classList.add("top-flip");
  const bottomFlip = document.createElement("div");
  bottomFlip.classList.add("bottom-flip");

  top.textContent = startNumber;
  bottomHalf.textContent = startNumber;
  topFlip.textContent = startNumber;
  bottomFlip.textContent = newNumber;

  topFlip.addEventListener("animationstart", (e) => {
    topHalf.textContent = newNumber;
  });
  topFlip.addEventListener("animationend", (e) => {
    topFlip.remove();
  });
  bottomFlip.addEventListener("animationend", (e) => {
    bottomHalf.textContent = newNumber;
    bottomFlip.remove();
  });
  flipCard.append(topFlip, bottomFlip);
}
// *************************************************************TODO LIST *************************************************************
// Add new Item
const todolist = document.querySelector(".todolist");

todolist.addEventListener("submit", async (event) => {
  event.preventDefault();
  await handleUserInput();
});
// When a user Input changed.
inputField.addEventListener("input", () => {
  const inputValue = inputField.value;
  if (inputValue !== "") {
    actionBtn.classList.add("active");
  } else {
    actionBtn.classList.remove("active");
  }
});
const handleUserInput = async () => {
  // this function will take the todo inputted, from the input at the top, validate the inputs create the element and add the listener to the checkboxes
  // where on checked the entire div is removed and array is updated with the updated list and storage is updated as well.
  let userData = JSON.parse(localStorage.getItem("userData")); //Full data
  // Add the default setting
  userData === null && handleUserData();
  if (userData !== null) {
    if (userData.displayTime.length > 0) {
      let todoData = userData.todoList; //Todolist;
      const inputData = inputField.value; //User INput
      if (todoData !== undefined) {
        const isavailable = todoData.some((todoItem) => {
          return todoItem.task === inputData;
        });
        //Check if the array is empty or not
        // (todoData.length > 0) &
        if (!isavailable) {
          // ADD NEW ITEM
          // userData.todoList.push(inputData.toLowerCase());
          inputData !== "" &&
            userData.todoList.push({
              task: inputData.toLowerCase(),
              timerAdd: false,
              timetospend:
                Number(todoTimer.value) * 60 + Number(todoTimermin.value),
            });
          userData = setUpTimer(userData.todoList);
          console.log(userData);
          // SAVET TO LOCAL STORAGE.
          localStorage.setItem("userData", JSON.stringify(userData));

          countUntil.value = Number(userData.countTo); //Hour
          countUntilmin.value = Number(userData.counatTomin); //min
          clearInterval(stat);
          counter();
          // LOOP THE ARRAY AND GET THE SPAN'S UP AND ROLLING.
          const list = document.querySelector(".todo-items");
          list.innerHTML = "";
          // FILTER THE EMPTY
          todoData
            .filter((todo) => todo.task !== "")
            .forEach((todo) => {
              // Add New Item
              const listItem = document.querySelector(".template");
              const template = listItem.content.cloneNode(true);
              // template.querySelector("div").classList.add(`id${todo.id}`);
              template.querySelector(".trail--data").textContent = todo.task;
              template.querySelector(".trail-content--timer").textContent = `${
                Number(todo.timetospend) > 60
                  ? (Number(todo.timetospend) / 60).toFixed(2) + " hr"
                  : Number(todo.timetospend) + "min"
              } `;
              // Insert at the top of the list
              list.insertBefore(template, list.children[0]);
            });

          // counter();
          location.reload;
          // Adding event listener
          const listItem = document.querySelectorAll(".todo-item");
          [...listItem].forEach((item, i) => {
            const todoChecker = item.querySelector("input");
            todoChecker.addEventListener("click", () => {
              if (todoChecker.checked) {
                setTimeout(() => {
                  // Remove the item from the list.
                  listItem[i].remove();
                  console.log(userData.todoList[i]);
                  // Remove the filtered text from todolist arr.
                  userData.todoList = userData.todoList.filter((element) => {
                    return (
                      element.task !== item.querySelector("span").textContent
                    );
                  });
                  //   // SAVET TO LOCAL STORAGE.
                  localStorage.setItem("userData", JSON.stringify(userData));
                }, 300);
              }
            });
          });
          // submit.click();
        }
      }
      inputField.value = "";
    }
  }
};

const setUpTimer = (todolist) => {
  let userData = JSON.parse(localStorage.getItem("userData")); //Full data
  if (userData !== undefined) {
    const isEmpty = userData.displayTime.filter((e) => e !== 0);
    let totalTaskTime = 0;
    let updateHour = 0;
    let updateMin = 0;
    const [hour, min] = handleTimerPause();
    const countHour = hour * 60;
    const initialTimer = countHour + min;
    const timerYetToadd =
      isEmpty.length !== 0
        ? todolist.filter((task) => !task.timerAdd)
        : [...todolist];

    timerYetToadd.forEach((task) => {
      totalTaskTime = totalTaskTime + task.timetospend;
      task.timerAdd = true;
    });

    console.log([totalTaskTime, initialTimer]);
    console.log();
    const diff =
      Math.sign(initialTimer) !== -1
        ? totalTaskTime + initialTimer
        : totalTaskTime;

    if (Math.sign(diff) == 1) {
      const totalTime = diff / 60;

      if (totalTime.toString().includes(".")) {
        const [hour, min] = totalTime.toString().split(".");
        updateHour = Number(hour);
        updateMin = Number((Number("0." + min) * 60).toFixed(0));
      } else {
        updateHour = diff / 60;
      }
    }
    if (totalTaskTime > initialTimer) {
      let countUptil = new Date();
      countUptil.setHours(countUptil.getHours() + Number(updateHour));
      countUptil.setMinutes(countUptil.getMinutes() + Number(updateMin));
      const [countTo, countTomin, countUntil] = [
        updateHour,
        updateMin,
        countUptil,
      ];
      console.log([updateHour, updateMin, countUptil]);
      userData.countTomin = countTomin;
      userData.countTo = countTo;
      userData.displayTime = [countTo, countTomin];
      userData.countUntil = countUntil;
      userData.todoList = todolist;
      countUntil.value = countTo;
      countUntilmin.value = countTomin;
      // localStorage.setItem("userData", JSON.stringify(userData));
      console.log("Data set up done");
    }
    return userData;
  } else {
    handleUserInput();
  }
};

// After loading function
counter();
handleUserInput();
