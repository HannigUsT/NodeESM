-- TABLE

CREATE TABLE client_type (
    id INTEGER PRIMARY KEY,
    type TEXT NOT NULL
);

CREATE TABLE client (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    cpf_cnpj INTEGER UNIQUE NOT NULL,
    address INTEGER NOT NULL,
    client_type_id INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'i',
    FOREIGN KEY (client_type_id) REFERENCES client_type(id)
);

CREATE TABLE payment_type (
    id INTEGER PRIMARY KEY,
    type TEXT UNIQUE NOT NULL
);

CREATE TABLE contract_type (
    id INTEGER PRIMARY KEY,  
    type TEXT NOT NULL
);

CREATE TABLE contract (
    id INTEGER PRIMARY KEY,
    description TEXT NOT NULL,
    start_date DATE NOT NULL,
    payday INTEGER,
    end_date DATE,
    client_id INTEGER NOT NULL,
    type_contract_id INTEGER NOT NULL,
    value REAL,
    payment_type INTEGER NOT NULL,
    FOREIGN KEY (payment_type) REFERENCES payment_type(id),
    FOREIGN KEY (client_id) REFERENCES client(id),
    FOREIGN KEY (type_contract_id) REFERENCES type_contract(id)
);

CREATE TABLE profile_type (
    id INTEGER PRIMARY KEY,
    client_type TEXT UNIQUE NOT NULL
);

CREATE TABLE user (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    profile INTEGER NOT NULL,
    status TEXT DEFAULT 'i',
    FOREIGN KEY (profile) REFERENCES profile_type(id)
);

INSERT INTO payment_type (id, type) VALUES (1, 'Cartão de Crédito');
INSERT INTO payment_type (id, type) VALUES (2, 'Cartão de Débito');
INSERT INTO payment_type (id, type) VALUES (3, 'Boleto');
INSERT INTO payment_type (id, type) VALUES (4, 'Pix');

INSERT INTO client_type (id, type) VALUES (1, 'Pessoa Física');
INSERT INTO client_type (id, type) VALUES (2, 'Pessoa Jurídica');

INSERT INTO contract_type (id, type) VALUES (1, 'Mensal');
INSERT INTO contract_type (id, type) VALUES (2, 'Trimestral');
INSERT INTO contract_type (id, type) VALUES (3, 'Semestral');
INSERT INTO contract_type (id, type) VALUES (4, 'Anual');
INSERT INTO contract_type (id, type) VALUES (5, 'Eventual');


-- INDEX
 
-- TRIGGER
 
-- VIEW
 
