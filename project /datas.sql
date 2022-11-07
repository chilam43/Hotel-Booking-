CREATE USER admin WITH PASSWORD 'admin' SUPERUSER;
-- use the code below 
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
    check_in_data DATE not null,
    check_out_data DATE not null,
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
    name VARCHAR(20) not null,
    email VARCHAR(255) not null,
    password CHAR(60)
);
-- CREATE TABLE room(
--     id SERIAL PRIMARY KEY,
--     Room_number TEXT,
--     type_id VARCHAR(255) not null,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP
-- );