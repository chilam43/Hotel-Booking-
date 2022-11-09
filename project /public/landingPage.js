let a = true;

let b = document.querySelector("#down")
b.addEventListener("click", function () {
    if (a == true) {


    }
})

// drop down box
let adultCount = document.getElementById("adult-count");
let childrenCount = document.getElementById("children-count");
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
        console.log("click")
        document.querySelector(".guest-input-drop-down").classList.remove("close")
    } else {
        console.log("remove")
        document.querySelector(".guest-input-drop-down").classList.add("close")
    }
})

// cal
