// Refracting Code.
document.addEventListener("DOMContentLoaded", () => {
  // Menu Navigation
  function menuactivate() {
    const nav = document.querySelector(".nav");
    const menubtn = document.querySelector(".menubtn");
    menubtn.classList.toggle("active");
    hand.classList.toggle("active");
    nav.classList.toggle("active");
  }
  const hand = document.querySelector(".hand");
  hand.addEventListener("click", menuactivate);

  function handleUserData() {
    //   Source Inputs
    const [countHour, countMin, breakBtw] = [
      document.getElementById("countdownto"),
      document.getElementById("countdowntomin"),
      document.getElementById("breakbtw"),
    ];
    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };

    //   calculate total number of mins to be spent.
    let totalSpendingMin =
      Number(countHour.value) * 60 + Number(countMin.value);
    totalSpendingMin = totalSpendingMin !== 0 ? totalSpendingMin : null;

    if (totalSpendingMin !== null) return;
    //   Define the end time
    const setNewTimeLine = new Date();
    setNewTimeLine.setMinutes(setNewTimeLine.getMinutes + totalSpendingMin);
    const showNewTimeLine = new Intl.DateTimeFormat("en-IN", options).format(
      new Date(setNewTimeLine)
    );
    /*Set up user data*/
    const showEndTime = document.getElementById("countendat");
    showEndTime.textContent = `The Set timer will expire at ${showNewTimeLine}`;
    // Counter
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
});
