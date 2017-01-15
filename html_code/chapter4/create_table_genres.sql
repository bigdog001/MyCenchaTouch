/*
Navicat MySQL Data Transfer

Source Server         : connect1
Source Server Version : 50091
Source Host           : localhost:3306
Source Database       : mysql

Target Server Type    : MYSQL
Target Server Version : 50091
File Encoding         : 65001

Date: 2012-04-25 11:34:11
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `genres`
-- ----------------------------
DROP TABLE IF EXISTS `genres`;
CREATE TABLE `genres` (
  `id` int(4) NOT NULL auto_increment,
  `genre` varchar(200) character set gb2312 NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of genres
-- ----------------------------
INSERT INTO genres VALUES ('1', '喜剧');
INSERT INTO genres VALUES ('2', '文艺');
INSERT INTO genres VALUES ('3', '动作');
