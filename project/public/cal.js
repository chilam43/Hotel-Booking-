

let a = document.querySelector("#check")
a.addEventListener("submit", async function (event) {
    event.preventDefault()


    let form = {}

    form["checkin"] = a.a.value
    form["checkout"] = a.b.value
    form["bookedDay"] = a.total.value


    let req = {
        method: "post",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
    }

    let res = await fetch("/handin", req)
    console.log(await res.json())
})