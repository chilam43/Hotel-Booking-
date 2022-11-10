app.post("/checkava", function (req, res) {
  await client.query(
    `SELECT check_in_data,
    check_out_data,room_id 
    FROM booking_record
    WHERE check_in_date <= $1
    OR check_out_date >= $2
    `, [req.body.checkindate, req.body.checkoutdate]
  );
  await res.json()
  }
