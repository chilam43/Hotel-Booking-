window.onload = async () => {
  const userobj = await fetch("/currentUser");
  const res = await userobj.json();
  if (res.user) {
    document.querySelector("#loginLogout").textContent = "logout";
    document.querySelector("#register").textContent =
      res.user.title + "." + res.user.name;
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
    document.querySelector("#loginLogout").textContent = "Login";
    document.querySelector("#register").textContent = "Sign-up";
  }
};

//yo
