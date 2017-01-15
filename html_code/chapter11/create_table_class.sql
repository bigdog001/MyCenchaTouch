/*
Navicat MySQL Data Transfer

Source Server         : connect1
Source Server Version : 50091
Source Host           : localhost:3306
Source Database       : mysql

Target Server Type    : MYSQL
Target Server Version : 50091
File Encoding         : 65001

Date: 2012-04-27 09:24:23
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `class`
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class` (
  `id` int(4) NOT NULL auto_increment,
  `className` varchar(20) character set gb2312 NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO class VALUES ('1', '一年级一班');
INSERT INTO class VALUES ('2', '一年级二班');
