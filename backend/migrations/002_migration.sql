-- +goose Up
drop table Users;
create table Users (
    id serial primary key,
    name varchar(255) not null,
    password_hash varchar(255) not null,
    access int constraint available_level check (access >= 0 and access <= 5) default 1
);
-- +goose Down
