

let checkDom = document.querySelector("#check");

checkDom.addEventListener("submit", async function (event) {
    event.preventDefault()


    let form = {}

    form["checkin"] = checkDom.a.value
    form["checkout"] = checkDom.b.value
    form["bookedDay"] = checkDom.total.value


    let req = {
        method: "post",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
    }

    let res = await fetch("/handin", req)
    console.log(await res.json())
})