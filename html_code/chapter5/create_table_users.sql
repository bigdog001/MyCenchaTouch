/*
Navicat MySQL Data Transfer

Source Server         : connect1
Source Server Version : 50091
Source Host           : localhost:3306
Source Database       : mysql

Target Server Type    : MYSQL
Target Server Version : 50091
File Encoding         : 65001

Date: 2012-04-25 12:38:05
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(50) character set gb2312 NOT NULL,
  `password` varchar(50) character set gb2312 NOT NULL,
  `sex` varchar(50) default NULL,
  `age` int(11) default NULL,
  `email` varchar(50) default NULL,
  `url` varchar(50) default NULL,
  `memo` varchar(50) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO users VALUES ('1', '陆凌牛', 'password', 'male', '38', '240824399@qq.com', '', '');
