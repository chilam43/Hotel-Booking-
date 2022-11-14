window.onload = async () => {
  const userobj = await fetch("/currentUser");
  const res = await userobj.json();
  if (res) {
    document.querySelector("#loginLogout").textContent = "logout";
    document.querySelector("#loginLogoutLink").href = "/index.html";
  } else {
    document.querySelector("#loginLogout").textContent = "Login";
  }
};

//hi
