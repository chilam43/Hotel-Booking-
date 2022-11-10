CREATE USER admin WITH PASSWORD 'admin' SUPERUSER;
-- use the code below 
create database hotel_booking;
--開DB
\ c hotel_booking -- 入DB
CREATE TABLE room(
    id SERIAL PRIMARY KEY,
    room_number integer not null,
    type_id INTEGER not null,
    FOREIGN KEY (type_id) REFERENCES type(id),
    floor INTEGER not null
);
CREATE TABLE booking_record(
    id SERIAL PRIMARY KEY,
    room_id INTEGER not null,
    FOREIGN KEY (room_id) REFERENCES room(id),
    check_in_date DATE not null,
    check_out_date DATE not null,
    user_id INTEGER not null,
    FOREIGN KEY (user_id) REFERENCES users(id),
    payment_time TIMESTAMP,
    lock_time TIMESTAMP,
    confirm_time TIMESTAMP,
    cancel_time TIMESTAMP,
    ref_number char(8) not null,
    UNIQUE(ref_number),
    final_price INTEGER not null
);
CREATE TABLE type(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) not null,
    price INTEGER not null
);
CREATE TYPE title AS ENUM('MR', 'MS', 'MRS', 'Sir', 'Dr', 'Mx');
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    title title,
    name VARCHAR(20),
    email VARCHAR(255),
    password CHAR(60)
);
-- CREATE TABLE room(
--     id SERIAL PRIMARY KEY,
--     Room_number TEXT,
--     type_id VARCHAR(255) not null,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP
-- );
ALTER SEQUENCE type_id_seq RESTART 1;
--reset table
FROM room
    JOIN type on room.type_id = type.id;
TRUNCATE TABLE type RESTART IDENTITY;
--例子
--type 例子
INSERT INTO type (name, price)
VALUES ('A', 500),
    ('B', 400),
    ('C', 300),
    ('D', 200);
--room例子
INSERT INTO room (room_number, type_id, floor)
VALUES (101, 4, 1),
    (102, 4, 1),
    (103, 4, 1),
    (104, 4, 1),
    (201, 3, 2),
    (202, 3, 2),
    (203, 3, 2),
    (301, 2, 3),
    (302, 2, 3),
    (401, 1, 4);
--users例子
INSERT into users(title, name, email, password)
VALUES ('MS', 'Alice', 'alice@gmail.com', 'alice'),
    ('MR', 'Bob', 'bob@gmail.com', 'bob'),
    ('MR', 'Cat', 'cat@gmail.com', 'cat'),
    ('MR', 'David', 'david@gmail.com', 'david'),
    ('MS', 'Eve', 'eve@gmail.com', '');
--book_record例子
INSERT INTO booking_record (
        room_id,
        check_in_data,
        check_out_data,
        user_id,
        payment_time,
        lock_time,
        confirm_time,
        cancel_time,
        ref_number,
        final_price
    )
VALUES (
        1,
        '2022-11-09',
        '2022-11-10',
        1,
        '2022-11-01 10:23:54',
        '2022-11-01 10:30:54',
        '2022-11-01 10:31:54',
        null,
        '11111111',
        500
    ),
    (
        2,
        '2022-11-08',
        '2022-11-11',
        2,
        '2022-11-01 10:23:54',
        '2022-11-01 10:30:54',
        '2022-11-01 10:31:54',
        null,
        '22222222',
        500
    ),
    (
        10,
        '2022-11-10',
        '2022-11-15',
        3,
        '2022-11-01 10:23:54',
        '2022-11-01 10:30:54',
        '2022-11-01 10:31:54',
        null,
        '33333333',
        500
    ),
    (
        10,
        '2022-11-10',
        '2022-11-15',
        3,
        '2022-11-01 10:23:54',
        '2022-11-01 10:30:54',
        '2022-11-01 10:31:54',
        '2022-11-02 10:31:54',
        '44444444',
        500
    ),
    (
        10,
        '2022-11-10',
        '2022-11-15',
        3,
        null,
        '2022-11-01 10:30:54',
        null,
        null,
        '55555555',
        500
    ),
    (
        10,
        '2022-11-10',
        '2022-11-15',
        3,
        '2022-11-01 10:23:54',
        '2022-11-01 10:30:54',
        null,
        null,
        '66666666',
        500
    );