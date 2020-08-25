CREATE DATABASE IF NOT EXISTS CodingTest;
USE CodingTest;
CREATE TABLE IF NOT EXISTS  TblLeft (
Id int(11) auto_increment primary key, 
TblReposDetailId int(11),
IsDeleted boolean, 
DeletedDescription longtext, 
CreatedOn DateTime(6));

CREATE TABLE IF NOT EXISTS  TblRight (
Id int(11) auto_increment primary key, 
TblReposDetailId int(11), 
IsDeleted boolean, 
DeletedDescription longtext, 
CreatedOn DateTime(6));

CREATE TABLE IF NOT EXISTS  TblReposDetail (
Id int(11) auto_increment primary key, 
ReposId longtext,
ReposName longtext,
CloneUrl longtext, 
Language longtext, 
Description longtext,
CreatedOn DateTime(6),
ModifiedOn DateTime(6));