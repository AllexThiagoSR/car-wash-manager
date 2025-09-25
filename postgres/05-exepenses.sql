CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    description VARCHAR(1000) NOT NULL,
    value NUMERIC(10, 2) NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    expense_type_id UUID NOT NULL,
    CONSTRAINT fk_expense_type FOREIGN KEY (expense_type_id) REFERENCES expense_types(id)
);
