SET NAMES 'utf8';


-- 课程表
DROP TABLE IF EXISTS `course`;
CREATE TABLE IF NOT EXISTS `course`(
    `id` int NOT NULL AUTO_INCREMENT,
    `course_name` varchar(30) NOT NULL,
    `teacher` varchar(30) NOT NULL,
    `join_num` int NOT NULL,
    `addtime` int NOT NULL,
    `course_type` int NOT NULL,
    `course_brief` varchar(150) NOT NULL,
    `course_pic` varchar(150) NOT NULL,
    `type` varchar(30),
    `sort` varchar(30),
    PRIMARY KEY(`id`)	
)DEFAULT CHARSET=utf8;


-- 用户课程表
DROP TABLE IF EXISTS `usercourse`;
CREATE TABLE IF NOT EXISTS `usercourse`(
    `id` int NOT NULL AUTO_INCREMENT,
    `uid` int NOT NULL,
    `cid` int NOT NULL,
    PRIMARY KEY(`id`)
)DEFAULT CHARSET=utf8;

-- 用户表
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user`(
    `id` int NOT NULL AUTO_INCREMENT,
    `user` varchar(30) NOT NULL,
    `pwd` varchar(50) NOT NULL,
    `avatar` varchar(60),
    `regtime` int,
    `lasttime` int,
    `isteach`int NOT NULL,
    PRIMARY KEY(`id`)
)DEFAULT CHARSET=utf8;

INSERT INTO `user` (`user`,`pwd`,`isteach`) VALUES ('admin','21232f297a57a5a743894a0e4a801fc3','2');

-- 课程类型表
DROP TABLE IF EXISTS `coursetype`;
CREATE TABLE IF NOT EXISTS `coursetype`(
    `id` int NOT NULL AUTO_INCREMENT,
    `class_type` varchar(30) NOT NULL,
    `ord` varchar(30) NOT NULL,
    `code` varchar(30) NOT NULL,
    PRIMARY KEY(`id`)
)DEFAULT CHARSET=utf8;

-- 课时表
DROP TABLE IF EXISTS `lesson`;
CREATE TABLE IF NOT EXISTS `lesson`(
    `id` int NOT NULL AUTO_INCREMENT,
    `cid` int NOT NULL,
    `path` varchar(50),
    `name` varchar(50),
    `brief` varchar(150),
    `title` varchar(150),
    `type` varchar(30),
    `order` int,
    PRIMARY KEY(`id`)
)DEFAULT CHARSET=utf8;

-- 浏览人数表
DROP TABLE IF EXISTS `browse`;
CREATE TABLE IF NOT EXISTS `browse`(
    `id` int NOT NULL AUTO_INCREMENT,
    `cid` int NOT NULL,
    `ip` varchar(30),
    PRIMARY KEY(`id`)
)DEFAULT CHARSET=utf8;

-- 用户课时表
DROP TABLE IF EXISTS `userlesson`;
CREATE TABLE IF NOT EXISTS `userlesson`(
    `id` int NOT NULL AUTO_INCREMENT,
    `uid` int NOT NULL,
    `ucid` int NOT NULL,
    `lastlearn` int NOT NULL,
    `lord` int NOT NULL,
    PRIMARY KEY(`id`)
)DEFAULT CHARSET=utf8;

-- 测试题表
DROP TABLE IF EXISTS `checkout`;
CREATE TABLE IF NOT EXISTS `checkout`(
    `id` int NOT NULL AUTO_INCREMENT,
    `cid` int NOT NULL,
    `subject` varchar(30),
    `option_A` varchar(30),
    `option_B` varchar(30),
    `option_C` varchar(30),
    `option_D` varchar(30),
    `answer` varchar(30),
    PRIMARY KEY(`id`)
)DEFAULT CHARSET=utf8;



