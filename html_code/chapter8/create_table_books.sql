/*
Navicat MySQL Data Transfer

Source Server         : connect1
Source Server Version : 50091
Source Host           : localhost:3306
Source Database       : mysql

Target Server Type    : MYSQL
Target Server Version : 50091
File Encoding         : 65001

Date: 2012-04-25 13:52:41
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `books`
-- ----------------------------
DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
  `id` int(3) NOT NULL auto_increment,
  `image_url` varchar(200) NOT NULL,
  `book_name` varchar(200) character set gb2312 NOT NULL,
  `author` varchar(200) character set gb2312 NOT NULL,
  `description` varchar(200) character set gb2312 NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of books
-- ----------------------------
INSERT INTO books VALUES ('1', 'images/html51.jpg', 'HTML 5与CSS 3权威指南', '陆凌牛', '内容系统而全面，HTML 5与CSS 3的新功能和新特性尽揽无余。注重实战，包含200余设计精巧的实例，可操作性极强。资深专家亲自执笔，3大前端社区一致推荐，权威性毋庸置疑。');
INSERT INTO books VALUES ('2', 'images/html52.jpg', 'HTML5揭秘', '皮尔格林', '本书全面而深入地对HTML5相关的技术进行详细介绍和剖析。“从开始到现在”道出HTML5的坎坷发展史；“HTML5特性检测”介绍了多种针对不同特性的检测方法。');
INSERT INTO books VALUES ('3', 'images/html53.jpg', 'HTML5游戏开发', '（美）迈耶', '很多从事Web前端开发的人对HTML总有些不满，比如需要手动检查和设计很多格式代码，不仅容易出错，而且存在大量重复。好在HTML5让我们看到了曙光。');
INSERT INTO books VALUES ('4', 'images/html54.jpg', 'HTML5高级程序设计', '（荷）柳伯斯，（美）阿伯斯，（美）萨姆', '本书首先介绍了HTML5的历史背景、新的语义标签及与以往H了ML版本相比的根本变化，同时揭示了HTML5背后的设计原理。');
INSERT INTO books VALUES ('5', 'images/html55.jpg', 'HTML 5 & CSS完全手册（第5版）', '(美)鲍威尔', '为了介绍HTML 5，这本由Thomas A. Powell所著，刘博译的《HTML5 & CSS完全手册(第5版)》在结构和内容上进行了重大的调整。本版与上一版有大约三分之一的内容是相似的。');
INSERT INTO books VALUES ('6', 'images/html56.jpg', 'HTML5用户指南（美） ', '（美）罗森，夏普', '本书共分为10章，系统全面地介绍了HTML 5规范的核心内容，以及这些内容在当前浏览器中的支持情况，并告知开发者如何在当前的环境下应用这些功能，开发出漂亮的Web应用。本书短小精悍，但是信息量巨大。');
INSERT INTO books VALUES ('7', 'images/html57.jpg', 'HTML5+CSS3网页布局和样式精粹', '张亚飞', '对于初入门的网页设计者和开发者而言，学习网页设计和开发就应该从html5和css3开始，这是毋庸置疑的。对于有经验的工程师来说，如果想完整掌握html5和css3新技术，那么本书是最合适不过的。');
INSERT INTO books VALUES ('8', 'images/html58.jpg', 'HTML5和RIA网站设计', '张亚飞', '万难网权威大师新自撰写，全面引领下一代万维技术　　展HTWL5真正风采，释放HTML5真正潜能　　全面破除当前普遍存在的错误认识，让您不走弯路，HTML5全新标准大曝光，新功能、新特性一览无余。');
INSERT INTO books VALUES ('9', 'images/html59.jpg', 'HTML、XHTML和CSS宝典（第5版） ', '(美)谢弗', '谢弗编著的《HTML、XHTML和CSS宝典（第5版）》介绍HTML元素的基础知识、如何集成这些元素以及如何在它们上面叠加CSS。');
INSERT INTO books VALUES ('10', 'images/html60.jpg', 'HTML 5实战 ', '陶国荣', '依据HTML 5标准的最新草案编写，对HTML 5进行了系统、全面、透彻的讲解。106个精心设计的经典案例对各个知识点进行补充和阐释，理论与实践完美结合。');
INSERT INTO books VALUES ('11', 'images/html61.jpg', 'HTML5和CSS3实例教程', '[美] Brian P. Hogan', 'Web和移动开发必读。掌握技术走向，自信应对未来。轻松实用、细致入微。');
INSERT INTO books VALUES ('12', 'images/html62.jpg', '大巧不工 Web前端设计修炼之道 ', '赖定清，林坚', '前端开发工程师、前端设计师、前端架构师和用户体验设计师等新兴职业的出现，为前端设计和开发领域注入了新的生命和活力。');
