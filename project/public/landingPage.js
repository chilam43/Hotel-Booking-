// let a = true;

// let b = document.querySelector("#down")
// b.addEventListener("click", function () {
//     if (a == true) {

//     }
// })

// drop down box
const adultCount = document.getElementById("adult-count");
const childrenCount = document.getElementById("children-count");
const minusButtonA = document.querySelector(".btn-minus-a");
const plusButtonA = document.querySelector(".btn-plus-a");
const minusButtonC = document.querySelector(".btn-minus-c");
const plusButtonC = document.querySelector(".btn-plus-c");
const adultValue = document.getElementById("dropdown-menu");
const adultValue2 = document.getElementById("dropdown-menu2");
const adultNum = "Adult: ";
const childrenNum = "Children: ";

const checkAvailability = document.querySelector("#check-availability");

minusButtonA.addEventListener("click", function () {
  const count = Number(adultCount.value);
  adultCount.value = Math.max(count - 1, 1);
  adultValue.textContent = adultNum + adultCount.value;
});

plusButtonA.addEventListener("click", function () {
  const count = Number(adultCount.value);
  adultCount.value = Math.min(count + 1, 9);
  adultValue.textContent = adultNum + adultCount.value;
});

minusButtonC.addEventListener("click", function () {
  const count = Number(childrenCount.value);
  childrenCount.value = Math.max(count - 1, 0);
  adultValue2.textContent = childrenNum + childrenCount.value;
});

plusButtonC.addEventListener("click", function () {
  const count = Number(childrenCount.value);
  childrenCount.value = Math.min(count + 1, 9);
  adultValue2.textContent = childrenNum + childrenCount.value;
  console.log(adultValue.textContent);
});

// const target = document.querySelector('#dropdown-menu')
const target2 = document.querySelector(".guest-input-container");

document.addEventListener("click", (event) => {
  const withinBoundaries = event.composedPath().includes(target2);

  if (withinBoundaries) {
    document.querySelector(".guest-input-drop-down").classList.remove("close");
  } else {
    document.querySelector(".guest-input-drop-down").classList.add("close");
  }
});

// cal
// let checkIn = document.getElementById("check")
// let checkOut = document.getElementById("check-out")
let calendarEl = document.getElementById("calendar");

const checkIn = document.querySelector("#check");
const checkOut = document.querySelector("#check-out");

let check = "checkIn"; // true = in, false = out
checkIn.addEventListener("click", () => {
  check = "checkIn";
});

checkOut.addEventListener("click", () => {
  check = "checkOut";
});

document.addEventListener("DOMContentLoaded", function () {
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    selectable: true,

    dateClick: function (info) {

      console.log(info.dateStr);

      if (check == "checkIn") {
        let today = info.dateStr.split("-");
        let dayPlus = +today[2] + 1;
        let dayString = dayPlus <= 9 ? "0" + dayPlus : dayPlus + "";
        today[2] = dayString;

        console.log(today);

        checkIn.value = info.dateStr;
        checkOut.value = today.join("-");
      } else {
        checkOut.value = info.dateStr;
      }
    },
  });
  calendar.render();
});

// if (isClicked = !isClicked) {
//     document.getElementById("check").value = info.dateStr;
// }
// if (checkOut = onclick) {
//     document.getElementById("check-out").value = info.dateStr;
// }

document.addEventListener("click", (event) => {
  const withinBoundaries = event.composedPath().includes(checkIn);
  const withinBoundaries2 = event.composedPath().includes(checkOut);

  if (withinBoundaries || withinBoundaries2) {
    document.querySelector(".cal").classList.remove("vis");
  } else {
    document.querySelector(".cal").classList.add("vis");
  }
});

// submit
document
  .querySelector("#form-check-availability")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const form = event.target;
    const formObject = {};
    formObject["checkIn"] = form.checkIn.value;
    formObject["checkOut"] = form.checkOut.value;
    console.log(formObject);
    console.log("done");
    const res = await fetch("/search-room", {
      // change /register
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    });
    const result = await res.json();
    console.log(result);
    // document.querySelector("#contact-result").textContent = result;
  });

checkAvailability.addEventListener("click", async function () {
  // // window.location = path.join(__dirname, "/select_room.html")
  // const checkAva = await fetch("/search", {
  //     method: "POST",
  // });

  location.href = "/select_room.html";
});

// sweetAlert

const currentForm = document.querySelector("#form-check-availability");
currentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let checkInDate = currentForm.checkIn.value;
  let checkOutDate = currentForm.checkOut.value;
  location.href = `/select_room.html?checkIn=${checkInDate}&checkOutDate=${checkOutDate}`;
});

// window.onload = async () => {
//   const userobj = await fetch("/currentUser");
//   const res = await userobj.json();
//   console.log(res);

//   if (res.user) {
//     document.querySelector("#loginLogout").textContent = "logout";
//     document.querySelector("#register").textContent =
//       res.user.title + "." + res.user.name;
//     document
//       .querySelector("#loginLogoutLink")
//       .addEventListener("click", async (e) => {
//         e.preventDefault();
//         // 唔比佢load
//         await fetch("/logout");
//         // 等佢Del完
//         location.reload();
//         // F5
//       });
//   } else {
//     document.querySelector("#loginLogout").textContent = "Login";
//     document.querySelector("#register").textContent = "Sign-up";
//   }
// };


