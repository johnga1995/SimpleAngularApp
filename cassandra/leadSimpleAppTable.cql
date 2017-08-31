create keyspace simpleapp with replication={'class':'SimpleStrategy', 'replication_factor':1};
use simpleapp;

create table user(
    email text,
    full_name text,
    age int,
    PRIMARY KEY(email)
);