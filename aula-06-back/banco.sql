CREATE TABLE servicos(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    descricao TEXT,
    preco NUMERIC(7,2) NOT NULL
);

CREATE TABLE contatos(
  id SERIAL PRIMARY KEY,
  nome VARCHAR(80) NOT NULL,
  email VARCHAR(60) NOT NULL UNIQUE,
  cpf CHAR(11) UNIQUE
);


INSERT INTO servicos (nome, descricao, preco) VALUES 
  ('Desenvolvimento de Site', 'Criação de Landing Page Institucional', 1000),
  ('Manutenção', 'Manutenção mensal de Sites', 400);

INSERT INTO contatos (nome, email, cpf) VALUES 
  ('Pedro Lindão', 'pedrim22cm@gmail.com', '69696969690');