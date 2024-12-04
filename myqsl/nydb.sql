/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80040
 Source Host           : localhost:3306
 Source Schema         : nydb

 Target Server Type    : MySQL
 Target Server Version : 80040
 File Encoding         : 65001

 Date: 04/12/2024 00:41:51
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article_images
-- ----------------------------
DROP TABLE IF EXISTS `article_images`;
CREATE TABLE `article_images`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `article_id` int NULL DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `filename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `mimetype` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `size` double NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `article_id`(`article_id` ASC) USING BTREE,
  CONSTRAINT `article_images_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 553 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of article_images
-- ----------------------------
INSERT INTO `article_images` VALUES (526, 206, 'https://img.xbin.cn/school-wall/article_images/2023/11/18/618ea348a479959966d07440a', '618ea348a479959966d07440a', 'image/jpeg', 577493, '2023-11-18 15:54:10');
INSERT INTO `article_images` VALUES (527, 206, 'https://img.xbin.cn/school-wall/article_images/2023/11/18/618ea348a479959966d07440b', '618ea348a479959966d07440b', 'image/jpeg', 564988, '2023-11-18 15:54:10');
INSERT INTO `article_images` VALUES (528, 206, 'https://img.xbin.cn/school-wall/article_images/2023/11/18/618ea348a479959966d07440c', '618ea348a479959966d07440c', 'image/jpeg', 144130, '2023-11-18 15:54:10');
INSERT INTO `article_images` VALUES (529, 206, 'https://img.xbin.cn/school-wall/article_images/2023/11/18/618ea348a479959966d07440d', '618ea348a479959966d07440d', 'image/jpeg', 154928, '2023-11-18 15:54:10');
INSERT INTO `article_images` VALUES (530, 206, 'https://img.xbin.cn/school-wall/article_images/2023/11/18/618ea348a479959966d07440e', '618ea348a479959966d07440e', 'image/jpeg', 302006, '2023-11-18 15:54:10');
INSERT INTO `article_images` VALUES (531, 207, 'https://img.xbin.cn/school-wall/article_images/2023/11/18/618ea348a479959966d07440f', '618ea348a479959966d07440f', 'image/jpeg', 203524, '2023-11-18 15:54:31');
INSERT INTO `article_images` VALUES (532, 207, 'https://img.xbin.cn/school-wall/article_images/2023/11/18/618ea348a479959966d074410', '618ea348a479959966d074410', 'image/jpeg', 237381, '2023-11-18 15:54:31');
INSERT INTO `article_images` VALUES (534, 211, 'https://img.xbin.cn/school-wall/article_images/2023/11/18/618ea348a479959966d074412', '618ea348a479959966d074412', 'image/png', 81638, '2023-11-18 15:57:55');
INSERT INTO `article_images` VALUES (535, 212, 'https://img.xbin.cn/school-wall/article_images/2023/11/18/618ea348a479959966d074413', '618ea348a479959966d074413', 'image/png', 532460, '2023-11-18 15:58:14');
INSERT INTO `article_images` VALUES (536, 212, 'https://img.xbin.cn/school-wall/article_images/2023/11/18/618ea348a479959966d074414', '618ea348a479959966d074414', 'image/png', 699602, '2023-11-18 15:58:14');
INSERT INTO `article_images` VALUES (537, 213, 'https://img.xbin.cn/school-wall/article_images/2023/11/18/618ea348a479959966d074415', '618ea348a479959966d074415', 'image/jpeg', 643292, '2023-11-18 15:59:02');
INSERT INTO `article_images` VALUES (538, 214, 'https://img.xbin.cn/school-wall/article_images/2023/11/18/618ea348a479959966d074416', '618ea348a479959966d074416', 'image/jpeg', 203524, '2023-11-18 15:59:17');
INSERT INTO `article_images` VALUES (539, 214, 'https://img.xbin.cn/school-wall/article_images/2023/11/18/618ea348a479959966d074417', '618ea348a479959966d074417', 'image/jpeg', 237381, '2023-11-18 15:59:17');
INSERT INTO `article_images` VALUES (542, 216, 'https://img.xbin.cn/school-wall/article_images/2023/11/21/618ea348a479959966d07441a', '618ea348a479959966d07441a', 'image/jpeg', 224482, '2023-11-21 17:47:17');
INSERT INTO `article_images` VALUES (543, 216, 'https://img.xbin.cn/school-wall/article_images/2023/11/21/618ea348a479959966d07441b', '618ea348a479959966d07441b', 'image/jpeg', 237211, '2023-11-21 17:47:17');
INSERT INTO `article_images` VALUES (549, 218, 'https://img.xbin.cn/school-wall/article_images/2023/11/27/ae89ac9628142963f61956d01', 'ae89ac9628142963f61956d01', 'image/jpeg', 461793, '2023-11-27 10:44:01');
INSERT INTO `article_images` VALUES (550, 218, 'https://img.xbin.cn/school-wall/article_images/2023/11/27/ae89ac9628142963f61956d02', 'ae89ac9628142963f61956d02', 'image/jpeg', 449714, '2023-11-27 10:44:01');
INSERT INTO `article_images` VALUES (551, 219, 'https://img.xbin.cn/school-wall/article_images/2023/11/27/ae89ac9628142963f61956d03', 'ae89ac9628142963f61956d03', 'image/jpeg', 461793, '2023-11-27 10:44:47');
INSERT INTO `article_images` VALUES (552, 219, 'https://img.xbin.cn/school-wall/article_images/2023/11/27/ae89ac9628142963f61956d04', 'ae89ac9628142963f61956d04', 'image/jpeg', 449714, '2023-11-27 10:44:47');

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `publication_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `author_id` int NULL DEFAULT NULL,
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'admin',
  `assort` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `articles_ibfk_1`(`author_id` ASC) USING BTREE,
  CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 220 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES (206, '测试', '2023-11-18 15:54:10', 52, 'admin', 1);
INSERT INTO `articles` VALUES (207, '测试', '2023-11-18 15:54:31', 52, 'admin', 1);
INSERT INTO `articles` VALUES (208, '测试', '2023-11-18 15:54:36', 52, 'admin', 1);
INSERT INTO `articles` VALUES (211, '测试', '2023-11-18 15:57:55', 52, 'admin', 2);
INSERT INTO `articles` VALUES (212, '测试', '2023-11-18 15:58:14', 52, 'admin', 2);
INSERT INTO `articles` VALUES (213, '测试', '2023-11-18 15:59:02', 52, 'admin', 2);
INSERT INTO `articles` VALUES (214, '测试', '2023-11-18 15:59:17', 52, 'admin', 2);
INSERT INTO `articles` VALUES (216, '测试', '2023-11-21 17:47:17', 52, 'admin', 1);
INSERT INTO `articles` VALUES (218, '测试', '2023-11-27 10:44:01', 53, 'admin', 1);
INSERT INTO `articles` VALUES (219, '测试', '2023-11-27 10:44:47', 53, 'admin', 2);

-- ----------------------------
-- Table structure for avatars
-- ----------------------------
DROP TABLE IF EXISTS `avatars`;
CREATE TABLE `avatars`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `mimetype` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `size` double NULL DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `user_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `avatars_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 40 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of avatars
-- ----------------------------
INSERT INTO `avatars` VALUES (37, '618ea348a479959966d074408', 'image/jpeg', 256491, 'https://img.xbin.cn/school-wall/avatar/2023/11/18/618ea348a479959966d074408', 52);
INSERT INTO `avatars` VALUES (38, 'c9783e72f2925b4526b81fb05', 'image/jpeg', 144130, 'https://img.xbin.cn/school-wall/avatar/2023/11/21/c9783e72f2925b4526b81fb05', 51);
INSERT INTO `avatars` VALUES (39, 'ae89ac9628142963f61956d00', 'image/jpeg', 333027, 'https://img.xbin.cn/school-wall/avatar/2023/11/27/ae89ac9628142963f61956d00', 53);

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `article_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` varchar(140) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  INDEX `article_id`(`article_id` ASC) USING BTREE,
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES (10, 206, 52, '测试', '2023-11-18 15:54:18');
INSERT INTO `comments` VALUES (11, 216, 52, '测试', '2023-11-21 17:47:28');
INSERT INTO `comments` VALUES (13, 206, 51, '休息休息休息休息', '2023-11-21 21:33:22');
INSERT INTO `comments` VALUES (15, 206, 51, '休息休息休息休息', '2023-11-21 21:33:33');
INSERT INTO `comments` VALUES (16, 216, 52, '', '2023-11-21 22:02:13');
INSERT INTO `comments` VALUES (17, 216, 52, '', '2023-11-21 22:02:15');
INSERT INTO `comments` VALUES (18, 216, 52, '测试', '2023-11-21 22:04:34');
INSERT INTO `comments` VALUES (19, 216, 52, '测试', '2023-11-21 22:40:02');
INSERT INTO `comments` VALUES (20, 216, 52, '测试', '2023-11-21 22:42:04');
INSERT INTO `comments` VALUES (21, 206, 52, '测试', '2023-11-21 22:42:18');
INSERT INTO `comments` VALUES (22, 216, 52, '测试', '2023-11-21 22:42:46');
INSERT INTO `comments` VALUES (23, 216, 52, '测试', '2023-11-21 22:45:43');
INSERT INTO `comments` VALUES (24, 216, 51, '测试', '2023-11-21 23:00:28');
INSERT INTO `comments` VALUES (25, 216, 51, '测试', '2023-11-21 23:01:03');
INSERT INTO `comments` VALUES (26, 216, 51, '测试', '2023-11-21 23:01:17');
INSERT INTO `comments` VALUES (27, 216, 51, '测试', '2023-11-21 23:05:10');
INSERT INTO `comments` VALUES (28, 208, 51, '测试', '2023-11-21 23:05:22');
INSERT INTO `comments` VALUES (29, 216, 52, '测试', '2023-11-21 23:07:41');
INSERT INTO `comments` VALUES (30, 216, 53, '测试', '2023-11-27 10:42:40');
INSERT INTO `comments` VALUES (31, 208, 52, '测试', '2023-11-28 12:52:31');
INSERT INTO `comments` VALUES (32, 218, 52, '测试', '2023-11-28 13:26:41');

-- ----------------------------
-- Table structure for likes
-- ----------------------------
DROP TABLE IF EXISTS `likes`;
CREATE TABLE `likes`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `article_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  INDEX `article_id`(`article_id` ASC) USING BTREE,
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 325 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of likes
-- ----------------------------
INSERT INTO `likes` VALUES (175, 51, 218);
INSERT INTO `likes` VALUES (324, 52, 218);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `avatar_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像',
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '开朗的网友' COMMENT '昵称',
  `age` int NULL DEFAULT 0 COMMENT '年龄',
  `role` enum('user','admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'user' COMMENT '用户角色',
  `is_muted` tinyint(1) UNSIGNED ZEROFILL NULL DEFAULT 0 COMMENT '是否禁言',
  `wechat_or_qq` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '18213331550' COMMENT '微信/QQ',
  `gender` enum('男','女') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '男' COMMENT '性别',
  `major` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'xx专业' COMMENT '专业',
  `school_class` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'xx班级' COMMENT '班级',
  `say` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '不忘初心,方得始终!',
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `openid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE,
  UNIQUE INDEX `openid`(`openid` ASC) USING BTREE,
  CONSTRAINT `users_chk_1` CHECK (`age` >= 0),
  CONSTRAINT `users_chk_2` CHECK (`gender` in (_utf8mb4'男',_utf8mb4'女'))
) ENGINE = InnoDB AUTO_INCREMENT = 57 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (51, 'admin', 'e10adc3949ba59abbe56e057f20f883e', 'http://api.xbin.cn/upload/avatar/51', '开朗的网友', 0, 'user', 0, '18213331550', '男', 'xx专业', 'xx班级', '不忘初心,方得始终!', '2023-11-21 23:52:06', NULL);
INSERT INTO `users` VALUES (52, NULL, NULL, 'http://api.xbin.cn/upload/avatar/52', '取啥名字好呢？', 0, 'admin', 0, '18213331550', '男', 'xx专业', 'xx班级', '不忘初心,方得始终!', '2023-11-21 23:52:32', 'oYKCg62jFAM79yxocArIGHXfvvZM');
INSERT INTO `users` VALUES (53, NULL, NULL, 'http://api.xbin.cn/upload/avatar/53', '开朗的网友', 0, 'user', 0, '18213331550', '男', 'xx专业', 'xx班级', '不忘初心,方得始终!', '2023-11-27 10:43:25', 'oYKCg614mPl_kfu3J8iFJ_cC-9WQ');
INSERT INTO `users` VALUES (54, NULL, NULL, NULL, '开朗的网友', 0, 'user', 0, '18213331550', '男', 'xx专业', 'xx班级', '不忘初心,方得始终!', '2023-12-09 12:21:11', 'oYKCg61lXrTIpqBTp_dMllfdfHDg');
INSERT INTO `users` VALUES (55, NULL, NULL, NULL, '开朗的网友', 0, 'user', 0, '18213331550', '男', 'xx专业', 'xx班级', '不忘初心,方得始终!', '2023-12-09 12:21:20', 'oYKCg629CgIG77aFm_RIoqA2jcvE');
INSERT INTO `users` VALUES (56, NULL, NULL, NULL, '开朗的网友', 0, 'user', 0, '18213331550', '男', 'xx专业', 'xx班级', '不忘初心,方得始终!', '2023-12-09 12:21:21', 'oYKCg66mbd_7Me524cYr0mCDj7w0');

SET FOREIGN_KEY_CHECKS = 1;
