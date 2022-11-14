document
  .querySelector("#form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const form = event.target;
    const formObject = {};
    formObject["title"] = form.title.value;
    formObject["username"] = form.username.value;
    formObject["email"] = form.email.value;
    formObject["password"] = form.password.value;
    formObject["confirmPassword"] = form.confirmPassword.value;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    });

    const result = await res.json();
    location.href = "index.html";
  });
