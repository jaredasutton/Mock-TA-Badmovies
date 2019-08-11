-- SET UP SCHEMA HERE
DROP DATABASE IF EXISTS badmovies;
CREATE DATABASE IF NOT EXISTS badmovies;

USE badmovies;

CREATE TABLE favorites (
    entryId int not null auto_increment primary key,
    movieDBid int not null
);

GRANT SELECT,INSERT,DROP,CREATE,UPDATE,DELETE ON badmovies.* TO 'student'@'localhost';
FLUSH PRIVILEGES;