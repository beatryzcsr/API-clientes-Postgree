create table clientes (
id serial primary key,
nome varchar (50) not null,
cpf varchar (30) not null,
telefone varchar(14) not null,
email varchar (30) not null,
datanasc  TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
rua varchar (40) not null,
numeroCasa integer not null,
bairro varchar (40) not null
)

