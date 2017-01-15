/*
Navicat MySQL Data Transfer

Source Server         : connect1
Source Server Version : 50091
Source Host           : localhost:3306
Source Database       : mysql

Target Server Type    : MYSQL
Target Server Version : 50091
File Encoding         : 65001

Date: 2012-04-26 16:08:14
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `genres`
-- ----------------------------
DROP TABLE IF EXISTS `genres`;
CREATE TABLE `genres` (
  `id` int(4) NOT NULL auto_increment,
  `parentId` int(4) NOT NULL,
  `name` varchar(200) character set gb2312 NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of genres
-- ----------------------------
INSERT INTO genres VALUES ('1', '0', '小说');
INSERT INTO genres VALUES ('2', '0', '艺术');
INSERT INTO genres VALUES ('3', '0', '生活');
INSERT INTO genres VALUES ('4', '0', '科学');
INSERT INTO genres VALUES ('5', '1', '魔幻');
INSERT INTO genres VALUES ('6', '1', '社会');
INSERT INTO genres VALUES ('7', '1', '武侠');
INSERT INTO genres VALUES ('8', '1', '言情');
INSERT INTO genres VALUES ('9', '4', '计算机');
INSERT INTO genres VALUES ('10', '4', '医学');
INSERT INTO genres VALUES ('11', '9', '数据库');
INSERT INTO genres VALUES ('12', '9', '程序设计');
INSERT INTO genres VALUES ('13', '9', '网络与数据通信');
INSERT INTO genres VALUES ('14', '9', '软件工程');
