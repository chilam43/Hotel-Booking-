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
const adultNum = "Adult: "
const childrenNum = "Children: "


minusButtonA.addEventListener("click", function () {
    const count = Number(adultCount.value);
    adultCount.value = Math.max(count - 1, 1);
    adultValue.textContent = adultNum + adultCount.value
});

plusButtonA.addEventListener("click", function () {
    const count = Number(adultCount.value);
    adultCount.value = Math.min(count + 1, 9);
    adultValue.textContent = adultNum + adultCount.value
});

minusButtonC.addEventListener("click", function () {
    const count = Number(childrenCount.value);
    childrenCount.value = Math.max(count - 1, 0);
    adultValue2.textContent = childrenNum + childrenCount.value
});

plusButtonC.addEventListener("click", function () {
    const count = Number(childrenCount.value);
    childrenCount.value = Math.min(count + 1, 9);
    adultValue2.textContent = childrenNum + childrenCount.value
    console.log(adultValue.textContent)
});

// const target = document.querySelector('#dropdown-menu')
const target2 = document.querySelector('.guest-input-container')

document.addEventListener('click', (event) => {
    const withinBoundaries = event.composedPath().includes(target2)

    if (withinBoundaries) {
        document.querySelector(".guest-input-drop-down").classList.remove("close")
    } else {
        document.querySelector(".guest-input-drop-down").classList.add("close")
    }
})



// cal
let check = true;
// let checkIn = document.getElementById("check")
// let checkOut = document.getElementById("check-out")
let calendarEl = document.getElementById("calendar");
const checkIn = document.querySelector('#check')
const checkOut = document.querySelector('#check-out')


document.addEventListener("DOMContentLoaded", function () {
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        selectable: true,

        dateClick: function (info) {
            // if (check == true) {
            //     document.getElementById("check").value = info.dateStr;
            //     check = !true;
            // }
            // if (check == true) {
            //     let a = document.getElementById("check-out").value = info.dateStr;
            //     check = !true;
            // }
            if (check == true) {
                checkIn.value = info.dateStr;
                check = !true;
            } else
                checkOut.value = info.dateStr;
            if (
                checkIn > checkOut
            ) {

                alert("Wrong");
                // todo replace
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


document.addEventListener('click', (event) => {
    const withinBoundaries = event.composedPath().includes(checkIn)
    const withinBoundaries2 = event.composedPath().includes(checkOut)

    if (withinBoundaries || withinBoundaries2) {
        document.querySelector(".cal").classList.remove("vis")


    } else {
        document.querySelector(".cal").classList.add("vis")
    }
})

// submit
const submit = document.querySelector('.check-availability')

