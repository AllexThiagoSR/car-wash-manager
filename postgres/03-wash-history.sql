CREATE TABLE wash_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_model VARCHAR(255) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    value NUMERIC(10, 2) NOT NULL,
    paid BOOLEAN DEFAULT FALSE,
    wash_date DATE DEFAULT CURRENT_DATE,
    payment_type_id UUID,
    CONSTRAINT fk_payment_type FOREIGN KEY (payment_type_id) REFERENCES payment_methods(id)
);
