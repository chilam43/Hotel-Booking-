document
  .querySelector("#login")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const form = event.target;
    const formObject = {};
    formObject["username"] = form.username.value;
    formObject["password"] = form.password.value;
    console.log(form.username.value);
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    });

    const result = await res.json();
    // console.log(result);
    // if (result.status) {
    //   alert(result.msg);
    //   location.href = "/index.html";
    // } else {
    //   alert(result.msg);
    // }
    if (res.status == 200) {
      location.href = "index.html";
    } else {
      alert(result.msg);
    }
  });
