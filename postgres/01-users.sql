-- Active: 1742478710623@@127.0.0.1@5432@talentos_car_wash
ALTER DATABASE car_wash SET timezone TO 'Brazil/East';
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
