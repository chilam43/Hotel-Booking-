SELECT room.*
FROM room
WHERE id NOT IN (
        SELECT room.id
        FROM booking_record
            JOIN room on booking_record.room_id = room.id
        WHERE NOT (
                check_in_date::date >= '2022-11-03'::date
                OR check_out_date::date <= '2022-11-19'::date
            )
            AND payment_time is NULL
            AND (
                now()::timestamp < lock_time::timestamp
                AND payment_time is NULL
                AND cancel_time is NULL
            )
        UNION
        SELECT room.id
        FROM booking_record
            JOIN room on booking_record.room_id = room.id
        WHERE payment_time is NOT NULL
            AND cancel_time is NULL
            AND NOT(
                check_in_date::date >= '2022-11-03'::date
                OR check_out_date::date <= '2022-11-19'::date
            )
        UNION
        SELECT room.id
        FROM booking_record
            JOIN room on booking_record.room_id = room.id
            AND cancel_time is NOT NULL
            AND (
                check_in_date::date >= '2022-11-03'::date
                OR check_out_date::date <= '2022-11-19'::date
            )
    )