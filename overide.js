document.addEventListener("DOMContentLoaded", () => {
  const reset = document.querySelector(".btn-secondary");

  function menuactivate() {
    const nav = document.querySelector(".nav");
    const menubtn = document.querySelector(".menubtn");
    menubtn.classList.toggle("active");
    hand.classList.toggle("active");
    nav.classList.toggle("active");
  }
  const hand = document.querySelector(".hand");
  hand.addEventListener("click", menuactivate);

  // Handle user input
  async function handleUserData() {
    const countUntil = document.getElementById("countdownto");
    const countUntilmin = document.getElementById("countdowntomin");
    const breakbtw = document.getElementById("breakbtw");

    let userData = {
      displayTime: [countUntil.value, countUntilmin.value],
      countTo: Number(countUntil.value), //Hour
      countTomin: Number(countUntilmin.value), //min
      countTosec: 0, //sec
      countUntil: dateNew,
      break: breakbtw.value,
      todoList: [],
    }; // store user data

    const calTotalRunTime =
      Number(userData.countTo) * 60 + Number(userData.countTomin);
    // // CALCULATE THE ADDED HOURS.
    // let dateNew = new Date();
    // dateNew.setHours(dateNew.getHours() + Number(countUntil.value));
    // CALCULATE THE ADDED MINS
    if (countUntilmin.value !== "") {
      dateNew = new Date(dateNew);
      dateNew.setMinutes(dateNew.getMinutes() + calTotalRunTime);
    }
    // Check for exstiting data\
    const persistant = JSON.parse(localStorage.getItem("userData"));
    if (persistant !== null) {
      if (persistant.todoList !== undefined) {
        userData.todoList = [...persistant.todoList];
      }
      console.log(userData);
    }
    // debugger;
    localStorage.setItem("userData", JSON.stringify(userData));
    location.reload();
  }
  const btnform = document.querySelector(".form");
  btnform.addEventListener("submit", async (event) => {
    event.preventDefault();
    await handleUserData();
  });
  reset.addEventListener("click", () => {
    localStorage.clear();
    console.log("Data reset");
    location.reload();
  });

  function counter() {
    let userData = JSON.parse(localStorage.getItem("userData"));
    console.log(userData);
    if (userData !== null) {
      const countUntilDate = userData.countUntil;
      if (new Date() <= new Date(countUntilDate)) {
        const [disHour, disMin] = userData.displayTime;
        const countUntil = document.getElementById("countdownto");
        const countUntilmin = document.getElementById("countdowntomin");
        countUntil.value = disHour;
        countUntilmin.value = disMin;
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
        ).textContent = `The Set timer will expire at ${countEndAt}`;
        setInterval(() => {
          if (new Date(countUntilDate) > new Date()) {
            const currentDate = new Date();
            const timeBetweenDates = Math.ceil(
              (new Date(countUntilDate) - currentDate) / 1000
            );
            flipAllCards(timeBetweenDates);
            previousTimeBetweenDates = timeBetweenDates;
          } else {
            handleUserData();
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
    handleUserInput();
  });

  const handleUserInput = () => {
    // this function will take the todo inputted, from the input at the top, validate the inputs create the element and add the listener to the checkboxes
    // where on checked the entire div is removed and array is updated with the updated list and storage is updated as well.
    let userData = JSON.parse(localStorage.getItem("userData")); //Full data
    // Add the default setting
    userData === null && handleUserData();
    if (userData !== null) {
      let todoData = userData.todoList; //Todolist;
      const inputField = document.querySelector(".addNewItem");
      // const inputFielddate = document.querySelector(".addNewItemdate");
      const inputData = inputField.value; //User INput

      if (todoData !== undefined) {
        //Check if the array is empty or not
        if (
          todoData.length > 0 ||
          !todoData.includes(inputData.toLowerCase())
        ) {
          //CHECK IF ARR. HAS THE INPUT.VALUE
          // ADD NEW ITEM
          userData.todoList.push(inputData.toLowerCase());
          userData.todoList = userData.todoList.filter((todo) => todo !== "");
          // SAVET TO LOCAL STORAGE.
          localStorage.setItem("userData", JSON.stringify(userData));
          // LOOP THE ARRAY AND GET THE SPAN'S UP AND ROLLING.
          const list = document.querySelector(".todo-items");
          list.innerHTML = "";
          // FILTER THE EMPTY
          todoData
            .filter((todo) => todo !== "")
            .forEach((todo) => {
              // Add New Item
              const listItem = document.querySelector(".template");
              const template = listItem.content.cloneNode(true);
              template.querySelector("span").textContent = todo;
              // template.querySelectorAll("span")[1].textContent = todo;
              // Insert at the top of the list
              list.insertBefore(template, list.children[0]);
            });
          // Adding event listener
          const listItem = document.querySelectorAll(".todo-item");
          [...listItem].forEach((item, i) => {
            const todoChecker = item.querySelector("input");
            todoChecker.addEventListener("click", () => {
              if (todoChecker.checked) {
                setTimeout(() => {
                  // Remove the item from the list.
                  listItem[i].remove();
                  // Remove the filtered text from todolist arr.
                  userData.todoList = userData.todoList.filter((element) => {
                    return element !== item.querySelector("span").textContent;
                  });
                  // SAVET TO LOCAL STORAGE.
                  localStorage.setItem("userData", JSON.stringify(userData));
                }, 300);
              }
            });
          });
        }
      }
      inputField.value = "";
    }
  };
  // After loading function
  counter();
  handleUserInput();
  // Load initial data

  const handleTimerPause = () => {
    let userData = JSON.parse(localStorage.getItem("userData")); //Full data
    const preDate = new Date(userData.countUntil);
    console.log(preDate);
    let postDate = new Date();
    // postDate.setHours(postDate.getHours() + 2);
    let diff = preDate - postDate;

    let ms = diff % 1000;
    let ss = Math.floor(diff / 1000) % 60;
    let mm = Math.floor(diff / 1000 / 60) % 60;
    let hh = Math.floor(diff / 1000 / 60 / 60);

    console.log(`${diff}ms = ${hh}hr, ${mm}min, ${ss}sec, ${ms}ms`);
  };
  handleTimerPause();
});
