/*
Navicat MySQL Data Transfer

Source Server         : connect1
Source Server Version : 50091
Source Host           : localhost:3306
Source Database       : mysql

Target Server Type    : MYSQL
Target Server Version : 50091
File Encoding         : 65001

Date: 2012-04-27 09:24:43
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `student`
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `id` int(4) NOT NULL auto_increment,
  `classID` int(4) NOT NULL,
  `number` varchar(20) NOT NULL,
  `studentName` varchar(20) character set gb2312 NOT NULL,
  `age` int(4) default NULL,
  `phone` varchar(50) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO student VALUES ('1', '1', '320101', '张三', '33', '86-0519-86660221');
INSERT INTO student VALUES ('2', '1', '320102', '李四', '11', '86-0519-86660222');
INSERT INTO student VALUES ('3', '1', '320103', '王五', '22', '86-0519-86660223');
INSERT INTO student VALUES ('4', '2', '320111', '赵六', '33', '86-0519-86660224');
INSERT INTO student VALUES ('5', '2', '320112', '武大', '33', '86-0519-86660225');
