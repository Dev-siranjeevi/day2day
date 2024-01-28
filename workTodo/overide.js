document.addEventListener("DOMContentLoaded", () => {
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
    // CALCULATE THE ADDED HOURS.
    let dateNew = new Date();
    dateNew.setHours(dateNew.getHours() + Number(countUntil.value));

    console.log(dateNew);
    // CALCULATE THE ADDED MINS
    if (countUntilmin.value !== "") {
      dateNew = new Date(dateNew);
      dateNew.setMinutes(dateNew.getMinutes() + Number(countUntilmin.value));
    }
    console.log(dateNew);
    const userData = {
      countTo: countUntil.value,
      countTomin: countUntilmin.value,
      countTosec: 0,
      countUntil: dateNew,
      break: breakbtw.value,
      todoList: [],
    }; // store user data
    localStorage.setItem("userData", JSON.stringify(userData));
    location.reload();

    console.log(JSON.parse(localStorage.getItem("userData")));
  }
  const btnform = document.querySelector(".form");
  btnform.addEventListener("submit", async (event) => {
    event.preventDefault();
    await handleUserData();
  });

  function counter() {
    let userData = JSON.parse(localStorage.getItem("userData"));

    const countUntilDate = userData.countUntil;
    if (new Date() <= new Date(countUntilDate)) {
      const countEnd = userData.countTo;
      const countTomin = userData.countTomin;
      const countUntil = document.getElementById("countdownto");
      const countUntilmin = document.getElementById("countdowntomin");
      countUntil.value = countEnd;
      countUntilmin.value = countTomin;
      const countToDate = new Date().setHours(
        new Date().getHours() + Number(countEnd)
      );
      options = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      };
      let countEndAt;
      let countToDateFinal;
      if (countTomin !== "") {
        const countToDateMin = new Date(countToDate).setMinutes(
          new Date(countToDate).getMinutes() + Number(countTomin)
        );
        countEndAt = new Intl.DateTimeFormat("en-IN", options).format(
          new Date(countToDateMin)
        );
        countToDateFinal = countToDateMin;
      } else {
        countEndAt = new Intl.DateTimeFormat("en-IN", options).format(
          new Date(countToDate)
        );
        countToDateFinal = countToDate;
      }
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
          // debugger;
          // alert("Timer Rest for the time being");
        }
      }, 250);
      let previousTimeBetweenDates;
    }
  }

  counter();

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
  todolist.addEventListener("submit", (event) => {
    event.preventDefault();
    handleUserInput();
    // const list = document.querySelector(".todo-items");
    // const inputData = document.querySelector(".addNewItem");
    // const todoData = JSON.parse(localStorage.getItem("userData")).todoList;
    // console.log(todoData);
    // // Loop through the lisrt
    // if (todoData.lenght > 0) {
    //   todoData.forEach((todo) => {
    //     // validate if the item is already available
    //     if (!todoData.includes(inputData.value.toLowerCase())) {
    //       // Add New Item
    //       const listItem = document.querySelector(".template");
    //       const template = listItem.content.cloneNode(true);
    //       template.querySelector("span").textContent = inputData.value;
    //       // Insert at the top of the list
    //       list.insertBefore(template, list.children[0]);
    //     } else {
    //       alert("You already have it in your list");
    //     }
    //   });
    // }
    // // INput Checked
    // const todoItems = document.querySelector(".todo-items");
    // const inputCheckBox = todoItems.querySelectorAll("input[type=checkbox]");
    // [...inputCheckBox].forEach((input) => {
    //   input.checked ? console.log(input) : console.log("Hey");
    // });
  });

  const handleUserInput = () => {
    let userData = JSON.parse(localStorage.getItem("userData")); //Full data
    let todoData = userData.todoList; //Todolist;
    const inputField = document.querySelector(".addNewItem");
    const inputData = inputField.value; //User INput
    console.log(todoData.length !== "undefined");
    if (todoData.length !== "undefined") {
      //Check if the array is empty or not
      if (todoData.length > 0 || !todoData.includes(inputData.toLowerCase())) {
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
                listItem[i].remove();

                userData.todoList.splice(i, 1);
                // SAVET TO LOCAL STORAGE.
                localStorage.setItem("userData", JSON.stringify(userData));
              }, 300);
            }
          });
        });
      }
    }
    inputField.value = "";
  };
  // const handleUserInput = () => {
  //   let userData = JSON.parse(localStorage.getItem("userData")); //Full data
  //   let todoData = userData.todoList; //Todolist;
  //   const inputData = document.querySelector(".addNewItem").value; //User INput

  //   //Check if the array is empty or not
  //   if (todoData.length > 0 || !todoData.includes(inputData.toLowerCase())) {
  //     //CHECK IF ARR. HAS THE INPUT.VALUE
  //     // ADD NEW ITEM
  //     userData.todoList.push(inputData.toLowerCase());

  //     // SAVET TO LOCAL STORAGE.
  //     localStorage.setItem("userData", JSON.stringify(userData));
  //     // LOOP THE ARRAY AND GET THE SPAN'S UP AND ROLLING.
  //     const list = document.querySelector(".todo-items");
  //     list.innerHTML = "";
  //     // FILTER THE EMPTY
  //     todoData
  //       .filter((todo) => todo !== "")
  //       .forEach((todo) => {
  //         // Add New Item
  //         const listItem = document.querySelector(".template");
  //         const template = listItem.content.cloneNode(true);
  //         template.querySelector("span").textContent = todo;
  //         // Insert at the top of the list
  //         list.insertBefore(template, list.children[0]);
  //       });
  //     // Adding event listener
  //     const listItem = document.querySelectorAll(".todo-item");
  //     [...listItem].forEach((item, i) => {
  //       const todoChecker = item.querySelector("input");
  //       todoChecker.addEventListener("click", () => {
  //         if (todoChecker.checked) {
  //           setTimeout(() => {
  //             listItem[i].remove();
  //           }, 300);
  //         }
  //       });
  //     });
  //   }
  // };
  handleUserInput();
});
