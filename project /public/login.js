console.log("hi");
document
  .querySelector("#login")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const form = event.target;
    const formObject = {};
    formObject["username"] = form.username.value;
    formObject["password"] = form.password.value;
    console.log("done");
    const res = await fetch("/register", {
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
