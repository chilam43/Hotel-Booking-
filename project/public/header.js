window.onload = async () => {
  const userobj = await fetch("/currentUser");
  const res = await userobj.json();
  if (res.user) {
    document.querySelector("#register").textContent =
      res.user.title + "." + res.user.name;
    document
      .querySelector("#userBookingRecordLink")
      .addEventListener("click", function () {
        location.href = "/userBookingRecord.html";
      });
    document.querySelector("#loginLogout").textContent = "logout";
    document
      .querySelector("#loginLogoutLink")
      .addEventListener("click", async (e) => {
        e.preventDefault();
        // 唔比佢load
        await fetch("/logout");
        // 等佢Del完
        location.reload();
        // F5
      });
  } else {
    // document.querySelector("#loginLogout").textContent = "Login";
    // document.querySelector("#register").textContent = "Sign-up";

    document.querySelector("#loginLogout").textContent = "Login";
    document
      .querySelector("#loginLogout")
      .addEventListener("click", async (e) => {
        callAlert();
      });
    document.querySelector("#register").textContent = "Sign-up";
    document
      .querySelector("#userBookingRecordLink")
      .addEventListener("click", function () {
        location.href = "/register.html";
      });
  }
};

async function callAlert() {
  Swal.fire({
    title: "Login Form",
    html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
  <input type="password" id="password" class="swal2-input" placeholder="Password">`,
    confirmButtonText: "Sign in",
    focusConfirm: false,
    preConfirm: () => {
      const login = Swal.getPopup().querySelector("#login").value;
      const password = Swal.getPopup().querySelector("#password").value;
      if (!login || !password) {
        Swal.showValidationMessage(`Please enter login and password`);
      }
      return { login: login, password: password };
    },
  }).then(async (result) => {
    console.log(result);
    const formObject = {};
    formObject["username"] = result.value.login;
    formObject["password"] = result.value.password;

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    });

    const serverResult = await res.json();
    console.log(serverResult);
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
      alert(serverResult.msg);
    }
  });
}

//yo yo
