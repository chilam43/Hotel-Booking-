window.onload = {};

async function loadTable() {
  const userObj = await fetch("/userBookingRecord");

  const userRecords = await userObj.json();
  console.log(userRecords);

  // document.querySelector("#booking-record").innerHTML = ``;
  for (let userRecord of userRecords) {
    document.querySelector("#booking-record").innerHTML += `  
  <tr>
    <form id="record">
    <td>${userRecord.room_number}</td>
    <td>${userRecord.type_name}</td>
    <td>${new Date(userRecord.check_in_date).toDateString()}</td>
    <td>${new Date(userRecord.check_out_date).toDateString()}</td>
    <td id="td@${userRecord.id}"><button id="cancelBtn@${
      userRecord.id
    }" class ="cancelBtn" type="submit">cancel</button></td>
    </form>
  </tr>`;

    if (userRecord.cancel_time) {
      document
        .getElementById(`cancelBtn@${userRecord.id}`)
        .classList.add("vis");
      // document.querySelector("#cancelBtn").textContent = "cancel"
    }
  }

  for (let userRecord of userRecords) {
    const ele = document.getElementById(`cancelBtn@${userRecord.id}`);
    ele.addEventListener("click", async () => {
      await fetch(`/cancelBooking/${userRecord.id}`);
      document.getElementById(`cancelBtn@${userRecord.id}`).remove();
      document.getElementById(`td@${userRecord.id}`).textContent = "canceled";

      // document.querySelector("#cancelBtn").textContent = "cancelled";
      // loadTable();
    });
  }
}

loadTable();

// document.querySelector("cancel").onclick = async function () {
//
// };
