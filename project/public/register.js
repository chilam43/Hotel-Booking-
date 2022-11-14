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
    formObject["checkBox1"] = document.querySelector("#checkBox1").checked;
    formObject["checkBox2"] = document.querySelector("#checkBox2").checked;
    console.log(formObject);
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    });

    const result = await res.json();
    // location.href = "index.html";
    if (res.status !== 400) {
      location.href = "index.html";
    } else {
      alert(result.msg);
    }
  });
// } else {
//   alert("Please check the ACKNOWLEDGMENT ");
// }
//donny
