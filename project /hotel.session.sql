SELECT check_in_data,
    check_out_data,
    room_id
FROM booking_record
WHERE NOT (
        check_in_data >= '2022-11-12'::date
        OR check_out_data <= '2022-11-08'::date
    );
-- out, 
-- this
SELECT room.*
FROM room
WHERE id NOT IN (
        SELECT room_id
        FROM booking_record
        WHERE cancel_time is NOT NULL
            AND NOT (
                check_in_data >= '2022-11-15'::date
                OR check_out_data <= '2022-11-10'::date
            )
            AND CURRENT_TIMESTAMP > lock_time
    )
SELECT check_in_data,
    check_out_data,
    room_id
FROM booking_record
WHERE check_in_data <= '2022-11-01'
    OR check_out_data >= '2022-11-04';
SELECT check_in_data,
    check_out_data,
    room_id
FROM booking_record
WHERE check_in_data >=
UPDATE booking_record
SET check_in_data = '2022-11-14'
where id = 3;
UPDATE booking_record
SET check_out_data = '2022-11-16'
where id = 3;
ALTER TABLE booking_record
    RENAME COLUMN check_in_data TO check_in_date;
ALTER TABLE booking_record
    RENAME COLUMN check_out_data TO check_out_date;