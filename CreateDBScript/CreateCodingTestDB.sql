CREATE DATABASE IF NOT EXISTS CodingTest;
USE CodingTest;
CREATE TABLE IF NOT EXISTS  TblLeft (Id int(11) auto_increment primary key, ReposName longtext, CloneUrl longtext, Language longtext, Description longtext, CreatedOn DateTime(6), CreatedBy longtext, ModifiedOn datetime(6), ModifiedBy longtext);
CREATE TABLE IF NOT EXISTS  TblRight (Id int(11) auto_increment primary key, TblLeftId int(11), ReposName longtext, CloneUrl longtext, Language longtext, Description longtext, IsDeleted boolean, DeletedDescription longtext, CreatedOn DateTime(6), CreatedBy longtext, ModifiedOn datetime(6), ModifiedBy longtext);