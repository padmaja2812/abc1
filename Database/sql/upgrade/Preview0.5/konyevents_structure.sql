-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: 10.11.12.137:3306
-- Generation Time: Mar 09, 2016 at 07:48 AM
-- Server version: 5.6.28
-- PHP Version: 5.6.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `konyevents`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
CREATE TABLE IF NOT EXISTS `address` (
  `address_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `line_one` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `line_two` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `city` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `zip` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `phone_one` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone_two` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `website` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `latitude` decimal(16,10) DEFAULT NULL,
  `longitude` decimal(16,10) DEFAULT NULL,
  PRIMARY KEY (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `comment_table`
--

DROP TABLE IF EXISTS `comment_table`;
CREATE TABLE IF NOT EXISTS `comment_table` (
  `comment_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `comment` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `user_id_comment_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
CREATE TABLE IF NOT EXISTS `contact` (
  `contact_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `designation` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `event_id` int(10) UNSIGNED NOT NULL,
  `image_id` int(10) UNSIGNED NOT NULL,
  `address_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`contact_id`),
  KEY `event_id_contact_idx` (`event_id`),
  KEY `contact_img_id_idx` (`image_id`),
  KEY `address_id_contact_idx` (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
CREATE TABLE IF NOT EXISTS `event` (
  `event_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(1024) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `logo_id` int(10) UNSIGNED DEFAULT NULL,
  `banner_id` int(10) UNSIGNED DEFAULT NULL,
  `short_desc` varchar(1024) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `long_desc` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `venue_id` int(11) NOT NULL,
  `added_time` time NOT NULL DEFAULT '00:00:00',
  `added_date` date NOT NULL DEFAULT '2016-01-01',
  `is_disabled` tinyint(1) NOT NULL DEFAULT '0',
  `rating_id` int(10) UNSIGNED NOT NULL,
  `twitter_hash_code` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `venue_id_idx` (`venue_id`),
  KEY `fk_logo_id_idx` (`logo_id`),
  KEY `fk_banner_id` (`banner_id`),
  KEY `fk_rating_id_idx` (`rating_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `event_meta`
--

DROP TABLE IF EXISTS `event_meta`;
CREATE TABLE IF NOT EXISTS `event_meta` (
  `emid` bigint(20) NOT NULL,
  `emkey` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `emvalue` varchar(1024) COLLATE utf8_unicode_ci NOT NULL,
  `emremarks` text COLLATE utf8_unicode_ci NOT NULL,
  `last_modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `event_id` int(10) UNSIGNED NOT NULL,
  KEY `event_id_idx` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `event_user_register`
--

DROP TABLE IF EXISTS `event_user_register`;
CREATE TABLE IF NOT EXISTS `event_user_register` (
  `event_user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `registered_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `is_cancelled` tinyint(1) NOT NULL DEFAULT '0',
  `is_rejected` tinyint(1) NOT NULL DEFAULT '0',
  `user_remark` text COLLATE utf8_unicode_ci,
  `admin_remark` text COLLATE utf8_unicode_ci,
  `admin_private_remark` text COLLATE utf8_unicode_ci,
  `event_id` int(10) UNSIGNED NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`event_user_id`),
  KEY `event_id_fk2_idx` (`event_id`),
  KEY `fk2_reg_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `footprint`
--

DROP TABLE IF EXISTS `footprint`;
CREATE TABLE IF NOT EXISTS `footprint` (
  `footprint_id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `footprint_key` varchar(127) NOT NULL,
  `footprint_value` varchar(255) NOT NULL,
  `comment` text NOT NULL,
  `analytics_id` varchar(64) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ipaddress` int(10) NOT NULL,
  `client_host_name` varchar(255) NOT NULL,
  `footprint_level` tinyint(4) NOT NULL,
  PRIMARY KEY (`footprint_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Stand-in structure for view `list_speakers_session`
--
DROP VIEW IF EXISTS `list_speakers_session`;
CREATE TABLE IF NOT EXISTS `list_speakers_session` (
`speaker_id` int(10) unsigned
,`session_id` int(10) unsigned
,`speaker_name` varchar(1024)
);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
CREATE TABLE IF NOT EXISTS `login` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `mail` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` varchar(16) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `is_disabled` tinyint(1) NOT NULL DEFAULT '0',
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `remark` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `photo_id` int(10) UNSIGNED DEFAULT NULL,
  `title` varchar(4) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `designation` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `organisation` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `photo_id_fkey_idx` (`photo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `login_meta`
--

DROP TABLE IF EXISTS `login_meta`;
CREATE TABLE IF NOT EXISTS `login_meta` (
  `lm_id` int(10) NOT NULL AUTO_INCREMENT,
  `lm_key` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `lm_value` varchar(1024) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `lm_remark` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `last_modified` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(10) NOT NULL,
  PRIMARY KEY (`lm_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `login_profile`
--

DROP TABLE IF EXISTS `login_profile`;
CREATE TABLE IF NOT EXISTS `login_profile` (
  `login_profile_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `address_id` int(10) UNSIGNED DEFAULT NULL,
  `facebook_url` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `twitter_uname` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `googleplus_url` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `linkedin_url` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`login_profile_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `product_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(64) CHARACTER SET utf8 NOT NULL,
  `short_desc` varchar(1024) CHARACTER SET utf8 NOT NULL,
  `long_desc` text CHARACTER SET utf8 NOT NULL,
  `image_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `icon_id_idx` (`image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_image`
--

DROP TABLE IF EXISTS `product_image`;
CREATE TABLE IF NOT EXISTS `product_image` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` int(10) UNSIGNED NOT NULL,
  `image_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id_product_image_idx` (`product_id`),
  KEY `image_id_upload_image_idx` (`image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `question_table`
--

DROP TABLE IF EXISTS `question_table`;
CREATE TABLE IF NOT EXISTS `question_table` (
  `question_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `question` varchar(2048) CHARACTER SET utf8 NOT NULL,
  `type` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `session_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`question_id`),
  KEY `survey_id_session_idx` (`session_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
CREATE TABLE IF NOT EXISTS `rating` (
  `rating_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `rating_average` decimal(16,2) NOT NULL DEFAULT '0.00',
  `no_of_votes` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`rating_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rating_votes`
--

DROP TABLE IF EXISTS `rating_votes`;
CREATE TABLE IF NOT EXISTS `rating_votes` (
  `rating_vote_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `rating_id` int(10) UNSIGNED NOT NULL,
  `rating_value` tinyint(4) DEFAULT NULL,
  `added_time` timestamp(6) NULL DEFAULT NULL,
  `is_disabled` tinyint(1) DEFAULT NULL,
  `uid` bigint(20) NOT NULL,
  `review` text COLLATE utf8_unicode_ci,
  `device_id` varchar(512) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ip_address` int(10) DEFAULT NULL,
  `review_title` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`rating_vote_id`),
  KEY `uid_idx` (`uid`),
  KEY `fk_rating_id_idx` (`rating_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
CREATE TABLE IF NOT EXISTS `session` (
  `session_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `date` date NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `rating_id` int(10) UNSIGNED DEFAULT NULL,
  `is_break_session` tinyint(1) DEFAULT '0',
  `event_id` int(10) UNSIGNED NOT NULL,
  `track_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `venue_hall_id` int(11) UNSIGNED NOT NULL,
  `twitter_hash_code` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`session_id`),
  KEY `event_id_idx` (`event_id`),
  KEY `venue_hall_id_fk1_idx` (`venue_hall_id`),
  KEY `fk_rating_id_idx` (`rating_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `session_resource`
--

DROP TABLE IF EXISTS `session_resource`;
CREATE TABLE IF NOT EXISTS `session_resource` (
  `session_resource_id` int(10) NOT NULL AUTO_INCREMENT,
  `resource_id` int(10) UNSIGNED NOT NULL,
  `session_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`session_resource_id`),
  KEY `resource_id_idx` (`resource_id`),
  KEY `fk1_session_id` (`session_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `session_speaker`
--

DROP TABLE IF EXISTS `session_speaker`;
CREATE TABLE IF NOT EXISTS `session_speaker` (
  `session_speaker_id` int(11) NOT NULL AUTO_INCREMENT,
  `speaker_id` int(10) UNSIGNED NOT NULL,
  `session_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`session_speaker_id`),
  KEY `speaker_id_fk1_idx` (`speaker_id`),
  KEY `fk_session_id` (`session_id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `session_user_register`
--

DROP TABLE IF EXISTS `session_user_register`;
CREATE TABLE IF NOT EXISTS `session_user_register` (
  `session_user_register_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `event_id` int(10) UNSIGNED NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `session_id` int(10) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`session_user_register_id`),
  KEY `sess_reg_fkey1_idx` (`event_id`),
  KEY `sess_reg_frkey2_idx` (`user_id`),
  KEY `sess_reg_frkey3_idx` (`session_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `speaker`
--

DROP TABLE IF EXISTS `speaker`;
CREATE TABLE IF NOT EXISTS `speaker` (
  `speaker_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `speaker_name` varchar(1024) CHARACTER SET latin1 NOT NULL,
  `speaker_details` text CHARACTER SET latin1 NOT NULL,
  `speaker_dept` varchar(256) CHARACTER SET latin1 NOT NULL,
  `speaker_job_title` varchar(512) CHARACTER SET latin1 NOT NULL,
  `speaker_fb_detail` varchar(1024) CHARACTER SET latin1 NOT NULL,
  `speaker_twitter_detail` varchar(1024) CHARACTER SET latin1 NOT NULL,
  `speaker_google+_detail` varchar(1024) CHARACTER SET latin1 NOT NULL,
  `speaker_linkedin_detail` varchar(1024) CHARACTER SET latin1 NOT NULL,
  `speaker_address_id` int(10) UNSIGNED NOT NULL,
  `upload_id` int(10) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`speaker_id`),
  KEY `idx_speaker_speaker_id` (`speaker_id`),
  KEY `speaker_address_id_idx` (`speaker_address_id`),
  KEY `upload_id_idx` (`upload_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `survey`
--

DROP TABLE IF EXISTS `survey`;
CREATE TABLE IF NOT EXISTS `survey` (
  `survey_id` int(10) UNSIGNED NOT NULL,
  `question_id` int(10) UNSIGNED NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `answer` int(10) UNSIGNED DEFAULT '0',
  `answer_text` varchar(2048) CHARACTER SET utf8 DEFAULT NULL,
  `session_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`survey_id`),
  KEY `user_id_survey_idx` (`user_id`),
  KEY `question_id_survey_idx` (`question_id`),
  KEY `session_id_user_survey_idx` (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `survey_option`
--

DROP TABLE IF EXISTS `survey_option`;
CREATE TABLE IF NOT EXISTS `survey_option` (
  `survey_option_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `question_id` int(10) UNSIGNED NOT NULL,
  `option_text` varchar(64) COLLATE utf8_unicode_ci DEFAULT '0',
  `option_value` int(10) UNSIGNED DEFAULT '0',
  PRIMARY KEY (`survey_option_id`),
  KEY `question_id_survey_idx` (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `upload`
--

DROP TABLE IF EXISTS `upload`;
CREATE TABLE IF NOT EXISTS `upload` (
  `upload_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `file_url` varchar(512) CHARACTER SET utf8 DEFAULT NULL,
  `file_type` varchar(8) CHARACTER SET utf8 NOT NULL,
  `is_disabled` tinyint(1) NOT NULL DEFAULT '0',
  `added_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `file_size` bigint(20) NOT NULL,
  `is_anonymous_read` tinyint(1) NOT NULL DEFAULT '0',
  `is_admin_only` tinyint(1) NOT NULL DEFAULT '0',
  `blob_obj` blob,
  `file_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`upload_id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `venue`
--

DROP TABLE IF EXISTS `venue`;
CREATE TABLE IF NOT EXISTS `venue` (
  `venue_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `venue_name` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address_id` int(11) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`venue_id`),
  KEY `address_id_idx` (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `venue_attractions`
--

DROP TABLE IF EXISTS `venue_attractions`;
CREATE TABLE IF NOT EXISTS `venue_attractions` (
  `attractions_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `detail` text COLLATE utf8_unicode_ci,
  `title` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `latitude` decimal(16,10) DEFAULT NULL,
  `longitude` decimal(16,10) DEFAULT NULL,
  `venue_id` int(11) UNSIGNED NOT NULL,
  `is_disabled` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`attractions_id`),
  KEY `is_disabled` (`is_disabled`),
  KEY `is_disabled_2` (`is_disabled`),
  KEY `venue_id_attaractions_idx` (`venue_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `venue_hall`
--

DROP TABLE IF EXISTS `venue_hall`;
CREATE TABLE IF NOT EXISTS `venue_hall` (
  `venue_hall_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `venue_hall_name` varchar(64) CHARACTER SET utf8mb4 DEFAULT NULL,
  `venue_id` int(10) UNSIGNED NOT NULL,
  `venue_hall_description` varchar(1024) CHARACTER SET utf8mb4 DEFAULT NULL,
  `venue_hall_image_id` int(10) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`venue_hall_id`),
  KEY `floor_map_image_id_idx` (`venue_hall_image_id`),
  KEY `fk_venue_id_idx` (`venue_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_attendee_details`
--
DROP VIEW IF EXISTS `vw_attendee_details`;
CREATE TABLE IF NOT EXISTS `vw_attendee_details` (
`user_id` bigint(20)
,`name` varchar(255)
,`phone` varchar(64)
,`designation` varchar(128)
,`organisation` varchar(128)
,`upload_id` int(10) unsigned
,`event_id` int(10) unsigned
,`facebook` varchar(1024)
,`twitter` varchar(128)
,`googleplus` varchar(1024)
,`linkedin` varchar(1024)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_attendee_detailstest2`
--
DROP VIEW IF EXISTS `vw_attendee_detailstest2`;
CREATE TABLE IF NOT EXISTS `vw_attendee_detailstest2` (
`user_id` bigint(20)
,`name` varchar(255)
,`phone` varchar(64)
,`designation` varchar(128)
,`organisation` varchar(128)
,`photo_id` int(10) unsigned
,`event_id` int(10) unsigned
,`facebook` varchar(1024)
,`twitter` varchar(128)
,`googleplus` varchar(1024)
,`linkedin` varchar(1024)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_cmp_session`
--
DROP VIEW IF EXISTS `vw_cmp_session`;
CREATE TABLE IF NOT EXISTS `vw_cmp_session` (
`session_id` int(10) unsigned
,`title` varchar(256)
,`start_time` time
,`end_time` time
,`date` date
,`description` text
,`rating_id` int(10) unsigned
,`is_break_session` tinyint(1)
,`event_id` int(10) unsigned
,`track_name` varchar(50)
,`venue_hall_id` int(11) unsigned
,`venue_hall_name` varchar(64)
,`speaker_count` bigint(21)
,`resource_count` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_contact_details`
--
DROP VIEW IF EXISTS `vw_contact_details`;
CREATE TABLE IF NOT EXISTS `vw_contact_details` (
`contact_id` int(10) unsigned
,`name` varchar(64)
,`desgnation` varchar(64)
,`event_name` varchar(1024)
,`mobile` varchar(128)
,`workphone` varchar(128)
,`email` varchar(256)
,`location` varchar(256)
,`image_id` int(10) unsigned
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_events_push`
--
DROP VIEW IF EXISTS `vw_events_push`;
CREATE TABLE IF NOT EXISTS `vw_events_push` (
`eventid` int(10) unsigned
,`title` varchar(1024)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_event_details`
--
DROP VIEW IF EXISTS `vw_event_details`;
CREATE TABLE IF NOT EXISTS `vw_event_details` (
`event_id` int(10) unsigned
,`title` varchar(1024)
,`logo_id` int(10) unsigned
,`banner_id` int(10) unsigned
,`short_desc` varchar(1024)
,`long_desc` text
,`start_date` date
,`start_time` time
,`end_time` time
,`end_date` date
,`venue_id` int(11)
,`rating_id` int(10) unsigned
,`added_time` time
,`added_date` date
,`is_disabled` tinyint(1)
,`venue_name` varchar(256)
,`average_rating` decimal(16,2)
,`session_count` bigint(21)
,`speaker_count` bigint(21)
,`registered_users_count` bigint(21)
,`attending_users_count` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_list_venue_for_event_contact`
--
DROP VIEW IF EXISTS `vw_list_venue_for_event_contact`;
CREATE TABLE IF NOT EXISTS `vw_list_venue_for_event_contact` (
`eventid` int(10) unsigned
,`title` varchar(1024)
,`venueid` int(11)
,`venue_name` varchar(256)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_product_images`
--
DROP VIEW IF EXISTS `vw_product_images`;
CREATE TABLE IF NOT EXISTS `vw_product_images` (
`product_id` int(10) unsigned
,`name` varchar(64)
,`short_desc` varchar(1024)
,`long_desc` text
,`upload_id` int(10) unsigned
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_rating_details`
--
DROP VIEW IF EXISTS `vw_rating_details`;
CREATE TABLE IF NOT EXISTS `vw_rating_details` (
`rating_average` decimal(16,2)
,`review` text
,`rating_value` tinyint(4)
,`speaker_name` varchar(1024)
,`image` blob
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_schedule_list`
--
DROP VIEW IF EXISTS `vw_schedule_list`;
CREATE TABLE IF NOT EXISTS `vw_schedule_list` (
`event_id` int(10) unsigned
,`session_id` int(10) unsigned
,`title` varchar(256)
,`start_time` time
,`end_time` time
,`session_date` date
,`description` text
,`break_session` tinyint(1)
,`track_name` varchar(50)
,`speaker_count` bigint(21)
,`speaker_id` int(10) unsigned
,`speaker_image_id` int(10) unsigned
,`rating_id` int(10) unsigned
,`rating_average` decimal(16,2)
,`no_of_votes` int(10)
,`venue_hall_id` int(11) unsigned
,`venue_hall_name` varchar(64)
,`address_id` int(10) unsigned
,`address_line_one` varchar(256)
,`address_line_two` varchar(256)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_sessions_push`
--
DROP VIEW IF EXISTS `vw_sessions_push`;
CREATE TABLE IF NOT EXISTS `vw_sessions_push` (
`eventid` int(10) unsigned
,`title` varchar(256)
,`sessionid` int(10) unsigned
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_session_detail`
--
DROP VIEW IF EXISTS `vw_session_detail`;
CREATE TABLE IF NOT EXISTS `vw_session_detail` (
`session_id` int(10) unsigned
,`title` varchar(256)
,`start_time` time
,`end_time` time
,`date` date
,`description` text
,`rating_id` int(10) unsigned
,`is_break_session` tinyint(1)
,`event_id` int(10) unsigned
,`track_name` varchar(50)
,`venue_hall_id` int(11) unsigned
,`venue_hall_name` varchar(64)
,`rating_average` decimal(16,2)
,`no_of_votes` int(10)
,`address_id` int(11) unsigned
,`venue_name` varchar(256)
,`line_two` varchar(256)
,`speaker_count` bigint(21)
,`attendee_count` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_session_event`
--
DROP VIEW IF EXISTS `vw_session_event`;
CREATE TABLE IF NOT EXISTS `vw_session_event` (
`session_id` int(10) unsigned
,`title` varchar(256)
,`start_time` time
,`end_time` time
,`date` date
,`description` text
,`rating_id` int(10) unsigned
,`is_break_session` tinyint(1)
,`event_id` int(10) unsigned
,`track_name` varchar(50)
,`event_title` varchar(1024)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_session_resource`
--
DROP VIEW IF EXISTS `vw_session_resource`;
CREATE TABLE IF NOT EXISTS `vw_session_resource` (
`session_id` int(10) unsigned
,`resource_id` int(10) unsigned
,`file_url` varchar(512)
,`file_type` varchar(8)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_session_speaker`
--
DROP VIEW IF EXISTS `vw_session_speaker`;
CREATE TABLE IF NOT EXISTS `vw_session_speaker` (
`ss_speaker_id` int(10) unsigned
,`ss_session_id` int(10) unsigned
,`session_id` int(10) unsigned
,`title` varchar(256)
,`start_time` time
,`end_time` time
,`date` date
,`description` text
,`rating_id` int(10) unsigned
,`is_break_session` tinyint(1)
,`event_id` int(10) unsigned
,`track_name` varchar(50)
,`sp_speaker_id` int(10) unsigned
,`sp_speaker_name` varchar(1024)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_session_speaker_detail`
--
DROP VIEW IF EXISTS `vw_session_speaker_detail`;
CREATE TABLE IF NOT EXISTS `vw_session_speaker_detail` (
`session_id` int(10) unsigned
,`speaker_id` int(10) unsigned
,`upload_id` int(10) unsigned
,`speaker_name` varchar(1024)
,`speaker_job_title` varchar(512)
,`speaker_dept` varchar(256)
,`speaker_details` text
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_speaker_address_details`
--
DROP VIEW IF EXISTS `vw_speaker_address_details`;
CREATE TABLE IF NOT EXISTS `vw_speaker_address_details` (
`speaker_id` int(10) unsigned
,`speaker_name` varchar(1024)
,`speaker_address_id` int(10) unsigned
,`speaker_dept` varchar(256)
,`speaker_job_title` varchar(512)
,`speaker_details` text
,`speaker_fb_detail` varchar(1024)
,`speaker_twitter_detail` varchar(1024)
,`speaker_google+_detail` varchar(1024)
,`speaker_linkedin_detail` varchar(1024)
,`ad_address_id` int(10) unsigned
,`ad_name` varchar(256)
,`ad_line_one` varchar(256)
,`ad_line_two` varchar(256)
,`ad_city` varchar(256)
,`ad_zip` varchar(128)
,`ad_phone_one` varchar(128)
,`ad_longitude` decimal(16,10)
,`ad_latitude` decimal(16,10)
,`ad_email` varchar(256)
,`ad_website` varchar(1024)
,`upload_id` int(10) unsigned
,`blob_obj` blob
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_survey_questions`
--
DROP VIEW IF EXISTS `vw_survey_questions`;
CREATE TABLE IF NOT EXISTS `vw_survey_questions` (
`question_id` int(10) unsigned
,`question` varchar(2048)
,`type` varchar(10)
,`session_id` int(10) unsigned
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_user_email`
--
DROP VIEW IF EXISTS `vw_user_email`;
CREATE TABLE IF NOT EXISTS `vw_user_email` (
`mail_id` varchar(128)
,`event_id` int(10) unsigned
,`session_id` int(10) unsigned
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_user_session_details`
--
DROP VIEW IF EXISTS `vw_user_session_details`;
CREATE TABLE IF NOT EXISTS `vw_user_session_details` (
`event_id` int(10) unsigned
,`user_id` bigint(20)
,`session_id` int(10) unsigned
,`start_time` time
,`title` varchar(256)
,`end_time` time
,`date` date
,`mail_id` varchar(128)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_user_session_register`
--
DROP VIEW IF EXISTS `vw_user_session_register`;
CREATE TABLE IF NOT EXISTS `vw_user_session_register` (
`user_id` bigint(20)
,`event_id` int(10) unsigned
,`session_id` int(10) unsigned
,`start_time` time
,`end_time` time
,`session_date` date
,`break_session` tinyint(1)
,`attendee_count` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_venue_attractions_details`
--
DROP VIEW IF EXISTS `vw_venue_attractions_details`;
CREATE TABLE IF NOT EXISTS `vw_venue_attractions_details` (
`venue_id` int(10) unsigned
,`venue_name` varchar(256)
,`venue_address_id` int(11) unsigned
,`attractions_id` int(10) unsigned
,`detail` text
,`title` varchar(256)
,`latitude` decimal(16,10)
,`longitude` decimal(16,10)
,`at_venue_id` int(11) unsigned
,`is_disabled` tinyint(1)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_venue_details`
--
DROP VIEW IF EXISTS `vw_venue_details`;
CREATE TABLE IF NOT EXISTS `vw_venue_details` (
`venue_id` int(10) unsigned
,`venue_name` varchar(256)
,`venue_address_id` int(11) unsigned
,`ad_address_id` int(10) unsigned
,`ad_name` varchar(256)
,`ad_line_one` varchar(256)
,`ad_line_two` varchar(256)
,`ad_city` varchar(256)
,`ad_zip` varchar(128)
,`ad_phone_one` varchar(128)
,`ad_longitude` decimal(16,10)
,`ad_latitude` decimal(16,10)
,`ad_email` varchar(256)
,`ad_website` varchar(1024)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_venue_hall_details`
--
DROP VIEW IF EXISTS `vw_venue_hall_details`;
CREATE TABLE IF NOT EXISTS `vw_venue_hall_details` (
`venue_id` int(10) unsigned
,`venue_name` varchar(256)
,`address_id` int(11) unsigned
,`venue_hall_id` int(11) unsigned
,`venue_hall_name` varchar(64)
,`hall_venue_id` int(10) unsigned
,`venue_hall_description` varchar(1024)
,`venue_hall_image_id` int(10) unsigned
,`upload_id` int(10) unsigned
,`is_disabled` tinyint(1)
,`file_url` varchar(512)
,`file_type` varchar(8)
,`added_time` timestamp
,`file_size` bigint(20)
,`is_anonymous_read` tinyint(1)
,`is_admin_only` tinyint(1)
,`blob_obj` blob
,`file_name` varchar(64)
);

-- --------------------------------------------------------

--
-- Structure for view `list_speakers_session`
--
DROP TABLE IF EXISTS `list_speakers_session`;

CREATE ALGORITHM=UNDEFINED DEFINER=`acedev`@`%` SQL SECURITY DEFINER VIEW `list_speakers_session`  AS  select `e`.`speaker_id` AS `speaker_id`,`e`.`session_id` AS `session_id`,`s`.`speaker_name` AS `speaker_name` from (`session_speaker` `e` join `speaker` `s`) where (`e`.`speaker_id` = `s`.`speaker_id`) ;

-- --------------------------------------------------------

--
-- Structure for view `vw_attendee_details`
--
DROP TABLE IF EXISTS `vw_attendee_details`;

CREATE ALGORITHM=UNDEFINED DEFINER=`acedev`@`%` SQL SECURITY DEFINER VIEW `vw_attendee_details`  AS  select `l`.`user_id` AS `user_id`,`l`.`name` AS `name`,`l`.`phone` AS `phone`,`l`.`designation` AS `designation`,`l`.`organisation` AS `organisation`,`u`.`upload_id` AS `upload_id`,`e`.`event_id` AS `event_id`,`l_p`.`facebook_url` AS `facebook`,`l_p`.`twitter_uname` AS `twitter`,`l_p`.`googleplus_url` AS `googleplus`,`l_p`.`linkedin_url` AS `linkedin` from (((`login` `l` join `event_user_register` `e` on((`l`.`user_id` = `e`.`user_id`))) join `upload` `u` on((`u`.`upload_id` = `l`.`photo_id`))) join `login_profile` `l_p` on((`l_p`.`user_id` = `e`.`user_id`))) ;

-- --------------------------------------------------------

--
-- Structure for view `vw_attendee_detailstest2`
--
DROP TABLE IF EXISTS `vw_attendee_detailstest2`;

CREATE ALGORITHM=UNDEFINED DEFINER=`acedev`@`%` SQL SECURITY DEFINER VIEW `vw_attendee_detailstest2`  AS  select `l`.`user_id` AS `user_id`,`l`.`name` AS `name`,`l`.`phone` AS `phone`,`l`.`designation` AS `designation`,`l`.`organisation` AS `organisation`,`u`.`upload_id` AS `photo_id`,`e`.`event_id` AS `event_id`,`l_p`.`facebook_url` AS `facebook`,`l_p`.`twitter_uname` AS `twitter`,`l_p`.`googleplus_url` AS `googleplus`,`l_p`.`linkedin_url` AS `linkedin` from (((`login` `l` join `event_user_register` `e` on((`l`.`user_id` = `e`.`user_id`))) join `upload` `u` on((`u`.`upload_id` = `l`.`photo_id`))) join `login_profile` `l_p` on((`l_p`.`user_id` = `e`.`user_id`))) ;

-- --------------------------------------------------------

--
-- Structure for view `vw_cmp_session`
--
DROP TABLE IF EXISTS `vw_cmp_session`;

CREATE ALGORITHM=UNDEFINED DEFINER=`acedev`@`%` SQL SECURITY DEFINER VIEW `vw_cmp_session`  AS  select `s`.`session_id` AS `session_id`,`s`.`title` AS `title`,`s`.`start_time` AS `start_time`,`s`.`end_time` AS `end_time`,`s`.`date` AS `date`,`s`.`description` AS `description`,`s`.`rating_id` AS `rating_id`,`s`.`is_break_session` AS `is_break_session`,`s`.`event_id` AS `event_id`,`s`.`track_name` AS `track_name`,`s`.`venue_hall_id` AS `venue_hall_id`,`vh`.`venue_hall_name` AS `venue_hall_name`,count(distinct `ss`.`speaker_id`) AS `speaker_count`,count(distinct `sr`.`session_resource_id`) AS `resource_count` from (((`session` `s` left join `venue_hall` `vh` on((`s`.`venue_hall_id` = `vh`.`venue_hall_id`))) left join `session_speaker` `ss` on((`ss`.`session_id` = `s`.`session_id`))) left join `session_resource` `sr` on((`s`.`session_id` = `sr`.`session_id`))) group by `s`.`session_id` ;

-- --------------------------------------------------------

--
-- Structure for view `vw_contact_details`
--
DROP TABLE IF EXISTS `vw_contact_details`;

CREATE ALGORITHM=UNDEFINED DEFINER=`acedev`@`%` SQL SECURITY DEFINER VIEW `vw_contact_details`  AS  select `c`.`contact_id` AS `contact_id`,`c`.`name` AS `name`,`c`.`designation` AS `desgnation`,`e`.`title` AS `event_name`,`a`.`phone_one` AS `mobile`,`a`.`phone_two` AS `workphone`,`a`.`email` AS `email`,`a`.`name` AS `location`,`c`.`image_id` AS `image_id` from (((`contact` `c` join `address` `a`) join `event` `e`) join `upload` `u`) where ((`c`.`address_id` = `a`.`address_id`) and (`c`.`event_id` = `e`.`event_id`) and (`c`.`image_id` = `u`.`upload_id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `vw_events_push`
--
DROP TABLE IF EXISTS `vw_events_push`;

CREATE ALGORITHM=UNDEFINED DEFINER=`acedev`@`%` SQL SECURITY DEFINER VIEW `vw_events_push`  AS  select `e`.`event_id` AS `eventid`,`e`.`title` AS `title` from `event` `e` ;

-- --------------------------------------------------------

--
-- Structure for view `vw_event_details`
--
DROP TABLE IF EXISTS `vw_event_details`;

CREATE ALGORITHM=UNDEFINED DEFINER=`acedev`@`%` SQL SECURITY DEFINER VIEW `vw_event_details`  AS  select `event`.`event_id` AS `event_id`,`event`.`title` AS `title`,`event`.`logo_id` AS `logo_id`,`event`.`banner_id` AS `banner_id`,`event`.`short_desc` AS `short_desc`,`event`.`long_desc` AS `long_desc`,`event`.`start_date` AS `start_date`,`event`.`start_time` AS `start_time`,`event`.`end_time` AS `end_time`,`event`.`end_date` AS `end_date`,`event`.`venue_id` AS `venue_id`,`event`.`rating_id` AS `rating_id`,`event`.`added_time` AS `added_time`,`event`.`added_date` AS `added_date`,`event`.`is_disabled` AS `is_disabled`,`address`.`name` AS `venue_name`,`rating`.`rating_average` AS `average_rating`,count(distinct `session`.`session_id`) AS `session_count`,count(distinct `session_speaker`.`speaker_id`) AS `speaker_count`,count(distinct `event_user_register`.`user_id`) AS `registered_users_count`,count(distinct `session_user_register`.`user_id`) AS `attending_users_count` from ((((((((`event` join `venue`) join `address`) join `rating`) join `upload`) left join `session` on((`event`.`event_id` = `session`.`event_id`))) left join `session_speaker` on((`session`.`session_id` = `session_speaker`.`session_id`))) left join `event_user_register` on((`event`.`event_id` = `event_user_register`.`event_id`))) left join `session_user_register` on((`event`.`event_id` = `session_user_register`.`event_id`))) group by `event`.`event_id` ;

-- --------------------------------------------------------

--
-- Structure for view `vw_list_venue_for_event_contact`
--
DROP TABLE IF EXISTS `vw_list_venue_for_event_contact`;

CREATE ALGORITHM=UNDEFINED DEFINER=`acedev`@`%` SQL SECURITY DEFINER VIEW `vw_list_venue_for_event_contact`  AS  select `e`.`event_id` AS `eventid`,`e`.`title` AS `title`,`e`.`venue_id` AS `venueid`,`s`.`venue_name` AS `venue_name` from (`event` `e` join `venue` `s`) where (`e`.`venue_id` = `s`.`venue_id`) ;

-- --------------------------------------------------------

--
-- Structure for view `vw_product_images`
--
DROP TABLE IF EXISTS `vw_product_images`;

CREATE ALGORITHM=UNDEFINED DEFINER=`acedev`@`%` SQL SECURITY DEFINER VIEW `vw_product_images`  AS  select `p`.`product_id` AS `product_id`,`p`.`name` AS `name`,`p`.`short_desc` AS `short_desc`,`p`.`long_desc` AS `long_desc`,`u`.`upload_id` AS `upload_id` from ((`product` `p` join `product_image` `i`) join `upload` `u`) where ((`p`.`product_id` = `i`.`product_id`) and (`i`.`image_id` = `u`.`upload_id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `vw_rating_details`
--
DROP TABLE IF EXISTS `vw_rating_details`;

CREATE ALGORITHM=UNDEFINED DEFINER=`acedev`@`%` SQL SECURITY DEFINER VIEW `vw_rating_details`  AS  select `r`.`rating_average` AS `rating_average`,`r_v`.`review` AS `review`,`r_v`.`rating_value` AS `rating_value`,`s`.`speaker_name` AS `speaker_name`,`u`.`blob_obj` AS `image` from (((`rating` `r` join `rating_votes` `r_v` on((`r`.`rating_id` = `r_v`.`rating_vote_id`))) join `upload` `u` on((`r`.`rating_id` = `u`.`upload_id`))) join `speaker` `s` on((`r`.`rating_id` = `s`.`speaker_id`))) ;

-- --------------------------------------------------------

--
-- Structure for view `vw_schedule_list`
--
DROP TABLE IF EXISTS `vw_schedule_list`;

CREATE ALGORITHM=UNDEFINED DEFINER=`acedev`@`%` SQL SECURITY DEFINER VIEW `vw_schedule_list`  AS  select `e`.`event_id` AS `event_id`,`s`.`session_id` AS `session_id`,`s`.`title` AS `title`,`s`.`start_time` AS `start_time`,`s`.`end_time` AS `end_time`,`s`.`date` AS `session_date`,`s`.`description` AS `description`,`s`.`is_break_session` AS `break_session`,`s`.`track_name` AS `track_name`,count(distinct `sp`.`speaker_id`) AS `speaker_count`,`ss`.`speaker_id` AS `speaker_id`,`sp`.`upload_id` AS `speaker_image_id`,`r`.`rating_id` AS `rating_id`,`r`.`rating_average` AS `rating_average`,`r`.`no_of_votes` AS `no_of_votes`,`vh`.`venue_hall_id` AS `venue_hall_id`,`vh`.`venue_hall_name` AS `venue_hall_name`,`ad`.`address_id` AS `address_id`,`ad`.`name` AS `address_line_one`,`ad`.`line_two` AS `address_line_two` from (((((((`event` `e` left join `session` `s` on((`e`.`event_id` = `s`.`event_id`))) left join `session_speaker` `ss` on((`s`.`session_id` = `ss`.`session_id`))) left join `speaker` `sp` on((`ss`.`speaker_id` = `sp`.`speaker_id`))) left join `rating` `r` on((`s`.`rating_id` = `r`.`rating_id`))) left join `venue_hall` `vh` on((`s`.`venue_hall_id` = `vh`.`venue_hall_id`))) left join `venue` `v` on((`vh`.`venue_id` = `v`.`venue_id`))) left join `address` `ad` on((`v`.`address_id` = `v`.`address_id`))) group by `s`.`session_id` ;

-- --------------------------------------------------------

--
-- Structure for view `vw_sessions_push`
--
DROP TABLE IF EXISTS `vw_sessions_push`;

CREATE ALGORITHM=UNDEFINED DEFINER=`acedev`@`%` SQL SECURITY DEFINER VIEW `vw_sessions_push`  AS  select `s`.`event_id` AS `eventid`,`s`.`title` AS `title`,`s`.`session_id` AS `sessionid` from `session` `s` ;

-- --------------------------------------------------------

--
-- Structure for view `vw_session_detail`
--
DROP TABLE IF EXISTS `vw_session_detail`;

CREATE ALGORITHM=UNDEFINED DEFINER=`acedev`@`%` SQL SECURITY DEFINER VIEW `vw_session_detail`  AS  select `s`.`session_id` AS `session_id`,`s`.`title` AS `title`,`s`.`start_time` AS `start_time`,`s`.`end_time` AS `end_time`,`s`.`date` AS `date`,`s`.`description` AS `description`,`s`.`rating_id` AS `rating_id`,`s`.`is_break_session` AS `is_break_session`,`s`.`event_id` AS `event_id`,`s`.`track_name` AS `track_name`,`s`.`venue_hall_id` AS `venue_hall_id`,`vh`.`venue_hall_name` AS `venue_hall_name`,`ra`.`rating_average` AS `rating_average`,`ra`.`no_of_votes` AS `no_of_votes`,`v`.`address_id` AS `address_id`,`ad`.`name` AS `venue_name`,`ad`.`line_two` AS `line_two`,count(distinct `ss`.`speaker_id`) AS `speaker_count`,count(distinct `sus`.`user_id`) AS `attendee_count` from ((((((`session` `s` left join `venue_hall` `vh` on((`s`.`venue_hall_id` = `vh`.`venue_hall_id`))) left join `rating` `ra` on((`s`.`rating_id` = `ra`.`rating_id`))) left join `venue` `v` on((`vh`.`venue_id` = `v`.`venue_id`))) left join `address` `ad` on((`v`.`address_id` = `ad`.`address_id`))) left join `session_speaker` `ss` on((`ss`.`session_id` = `s`.`session_id`))) left join `session_user_register` `sus` on((`s`.`session_id` = `sus`.`session_id`))) group by `s`.`session_id` ;

-- --------------------------------------------------------

--
-- Structure for view `vw_session_event`
--
DROP TABLE IF EXISTS `vw_session_event`;

CREATE ALGORITHM=UNDEFINED DEFINER=`acedev`@`%` SQL SECURITY DEFINER VIEW `vw_session_event`  AS  select `s`.`session_id` AS `session_id`,`s`.`title` AS `title`,`e`.`start_time` AS `start_time`,`s`.`end_time` AS `end_time`,`s`.`date` AS `date`,`s`.`description` AS `description`,`s`.`rating_id` AS `rating_id`,`s`.`is_break_session` AS `is_break_session`,`s`.`event_id` AS `event_id`,`s`.`track_name` AS `track_name`,`e`.`title` AS `event_title` from (`session` `s` join `event` `e`) where (`s`.`event_id` = `e`.`event_id`) ;

-- --------------------------------------------------------

--
-- Structure for view `vw_session_resource`
--
DROP TABLE IF EXISTS `vw_session_resource`;

CREATE ALGORITHM=UNDEFINED DEFINER=`acedev`@`%` SQL SECURITY DEFINER VIEW `vw_session_resource`  AS  select `s`.`session_id` AS `session_id`,`sr`.`resource_id` AS `resource_id`,`u`.`file_url` AS `file_url`,`u`.`file_type` AS `file_type` from ((`session` `s` left join `session_resource` `sr` on((`s`.`session_id` = `sr`.`session_id`))) left join `upload` `u` on((`sr`.`resource_id` = `u`.`upload_id`))) ;

-- --------------------------------------------------------

--
-- Structure for view `vw_session_speaker`
--
DROP TABLE IF EXISTS `vw_session_speaker`;

CREATE ALGORITHM=UNDEFINED DEFINER=`acedev`@`%` SQL SECURITY DEFINER VIEW `vw_session_speaker`  AS  select `ss`.`speaker_id` AS `ss_speaker_id`,`ss`.`session_id` AS `ss_session_id`,`s`.`session_id` AS `session_id`,`s`.`title` AS `title`,`s`.`start_time` AS `start_time`,`s`.`end_time` AS `end_time`,`s`.`date` AS `date`,`s`.`description` AS `description`,`s`.`rating_id` AS `rating_id`,`s`.`is_break_session` AS `is_break_session`,`s`.`event_id` AS `event_id`,`s`.`track_name` AS `track_name`,`sp`.`speaker_id` AS `sp_speaker_id`,`sp`.`speaker_name` AS `sp_speaker_name` from ((`session` `s` join `speaker` `sp`) join `session_speaker` `ss`) where ((`s`.`session_id` = `ss`.`session_id`) and (`sp`.`speaker_id` = `ss`.`speaker_id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `vw_session_speaker_detail`
--
DROP TABLE IF EXISTS `vw_session_speaker_detail`;

CREATE ALGORITHM=UNDEFINED DEFINER=`acedev`@`%` SQL SECURITY DEFINER VIEW `vw_session_speaker_detail`  AS  select `s`.`session_id` AS `session_id`,`ss`.`speaker_id` AS `speaker_id`,`sp`.`upload_id` AS `upload_id`,`sp`.`speaker_name` AS `speaker_name`,`sp`.`speaker_job_title` AS `speaker_job_title`,`sp`.`speaker_dept` AS `speaker_dept`,`sp`.`speaker_details` AS `speaker_details` from ((`session` `s` left join `session_speaker` `ss` on((`s`.`session_id` = `ss`.`session_id`))) left join `speaker` `sp` on((`ss`.`speaker_id` = `sp`.`speaker_id`))) ;

-- --------------------------------------------------------

--
-- Structure for view `vw_speaker_address_details`
--
DROP TABLE IF EXISTS `vw_speaker_address_details`;

CREATE ALGORITHM=UNDEFINED DEFINER=`acedev`@`%` SQL SECURITY DEFINER VIEW `vw_speaker_address_details`  AS  select `s`.`speaker_id` AS `speaker_id`,`s`.`speaker_name` AS `speaker_name`,`s`.`speaker_address_id` AS `speaker_address_id`,`s`.`speaker_dept` AS `speaker_dept`,`s`.`speaker_job_title` AS `speaker_job_title`,`s`.`speaker_details` AS `speaker_details`,`s`.`speaker_fb_detail` AS `speaker_fb_detail`,`s`.`speaker_twitter_detail` AS `speaker_twitter_detail`,`s`.`speaker_google+_detail` AS `speaker_google+_detail`,`s`.`speaker_linkedin_detail` AS `speaker_linkedin_detail`,`ad`.`address_id` AS `ad_address_id`,`ad`.`name` AS `ad_name`,`ad`.`line_one` AS `ad_line_one`,`ad`.`line_two` AS `ad_line_two`,`ad`.`city` AS `ad_city`,`ad`.`zip` AS `ad_zip`,`ad`.`phone_one` AS `ad_phone_one`,`ad`.`longitude` AS `ad_longitude`,`ad`.`latitude` AS `ad_latitude`,`ad`.`email` AS `ad_email`,`ad`.`website` AS `ad_website`,`u`.`upload_id` AS `upload_id`,`u`.`blob_obj` AS `blob_obj` from ((`speaker` `s` join `address` `ad`) join `upload` `u`) where ((`s`.`speaker_address_id` = `ad`.`address_id`) and (`s`.`upload_id` = `u`.`upload_id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `vw_survey_questions`
--
DROP TABLE IF EXISTS `vw_survey_questions`;

CREATE ALGORITHM=UNDEFINED DEFINER=`acedev`@`%` SQL SECURITY DEFINER VIEW `vw_survey_questions`  AS  select `q`.`question_id` AS `question_id`,`q`.`question` AS `question`,`q`.`type` AS `type`,`q`.`session_id` AS `session_id` from (`question_table` `q` join `session` `s`) where (`q`.`session_id` = `s`.`session_id`) ;

-- --------------------------------------------------------

--
-- Structure for view `vw_user_email`
--
DROP TABLE IF EXISTS `vw_user_email`;

CREATE ALGORITHM=UNDEFINED DEFINER=`acedev`@`%` SQL SECURITY DEFINER VIEW `vw_user_email`  AS  select `l`.`mail` AS `mail_id`,`sur`.`event_id` AS `event_id`,`sur`.`session_id` AS `session_id` from (`session_user_register` `sur` join `login` `l`) where (`l`.`user_id` = `sur`.`user_id`) ;

-- --------------------------------------------------------

--
-- Structure for view `vw_user_session_details`
--
DROP TABLE IF EXISTS `vw_user_session_details`;

CREATE ALGORITHM=UNDEFINED DEFINER=`acedev`@`%` SQL SECURITY DEFINER VIEW `vw_user_session_details`  AS  select `l`.`event_id` AS `event_id`,`l`.`user_id` AS `user_id`,`l`.`session_id` AS `session_id`,`sur`.`start_time` AS `start_time`,`sur`.`title` AS `title`,`sur`.`end_time` AS `end_time`,`sur`.`date` AS `date`,`lo`.`mail` AS `mail_id` from ((`session_user_register` `l` join `session` `sur`) join `login` `lo`) where ((`l`.`session_id` = `sur`.`session_id`) and (`l`.`event_id` = `sur`.`event_id`) and (`l`.`user_id` = `lo`.`user_id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `vw_user_session_register`
--
DROP TABLE IF EXISTS `vw_user_session_register`;

CREATE ALGORITHM=UNDEFINED DEFINER=`acedev`@`%` SQL SECURITY DEFINER VIEW `vw_user_session_register`  AS  select `u`.`user_id` AS `user_id`,`s`.`event_id` AS `event_id`,`s`.`session_id` AS `session_id`,`s`.`start_time` AS `start_time`,`s`.`end_time` AS `end_time`,`s`.`date` AS `session_date`,`s`.`is_break_session` AS `break_session`,count(distinct `u`.`session_user_register_id`) AS `attendee_count` from (`session` `s` left join `session_user_register` `u` on((`s`.`session_id` = `u`.`session_id`))) group by `s`.`session_id` ;

-- --------------------------------------------------------

--
-- Structure for view `vw_venue_attractions_details`
--
DROP TABLE IF EXISTS `vw_venue_attractions_details`;

CREATE ALGORITHM=UNDEFINED DEFINER=`acedev`@`%` SQL SECURITY DEFINER VIEW `vw_venue_attractions_details`  AS  select `v`.`venue_id` AS `venue_id`,`v`.`venue_name` AS `venue_name`,`v`.`address_id` AS `venue_address_id`,`at`.`attractions_id` AS `attractions_id`,`at`.`detail` AS `detail`,`at`.`title` AS `title`,`at`.`latitude` AS `latitude`,`at`.`longitude` AS `longitude`,`at`.`venue_id` AS `at_venue_id`,`at`.`is_disabled` AS `is_disabled` from (`venue` `v` join `venue_attractions` `at`) where (`v`.`venue_id` = `at`.`venue_id`) ;

-- --------------------------------------------------------

--
-- Structure for view `vw_venue_details`
--
DROP TABLE IF EXISTS `vw_venue_details`;

CREATE ALGORITHM=UNDEFINED DEFINER=`acedev`@`%` SQL SECURITY DEFINER VIEW `vw_venue_details`  AS  select `v`.`venue_id` AS `venue_id`,`v`.`venue_name` AS `venue_name`,`v`.`address_id` AS `venue_address_id`,`ad`.`address_id` AS `ad_address_id`,`ad`.`name` AS `ad_name`,`ad`.`line_one` AS `ad_line_one`,`ad`.`line_two` AS `ad_line_two`,`ad`.`city` AS `ad_city`,`ad`.`zip` AS `ad_zip`,`ad`.`phone_one` AS `ad_phone_one`,`ad`.`longitude` AS `ad_longitude`,`ad`.`latitude` AS `ad_latitude`,`ad`.`email` AS `ad_email`,`ad`.`website` AS `ad_website` from (`venue` `v` join `address` `ad`) where (`v`.`address_id` = `ad`.`address_id`) ;

-- --------------------------------------------------------

--
-- Structure for view `vw_venue_hall_details`
--
DROP TABLE IF EXISTS `vw_venue_hall_details`;

CREATE ALGORITHM=UNDEFINED DEFINER=`acedev`@`%` SQL SECURITY DEFINER VIEW `vw_venue_hall_details`  AS  select `v`.`venue_id` AS `venue_id`,`v`.`venue_name` AS `venue_name`,`v`.`address_id` AS `address_id`,`h`.`venue_hall_id` AS `venue_hall_id`,`h`.`venue_hall_name` AS `venue_hall_name`,`h`.`venue_id` AS `hall_venue_id`,`h`.`venue_hall_description` AS `venue_hall_description`,`h`.`venue_hall_image_id` AS `venue_hall_image_id`,`u`.`upload_id` AS `upload_id`,`u`.`is_disabled` AS `is_disabled`,`u`.`file_url` AS `file_url`,`u`.`file_type` AS `file_type`,`u`.`added_time` AS `added_time`,`u`.`file_size` AS `file_size`,`u`.`is_anonymous_read` AS `is_anonymous_read`,`u`.`is_admin_only` AS `is_admin_only`,`u`.`blob_obj` AS `blob_obj`,`u`.`file_name` AS `file_name` from ((`venue` `v` join `upload` `u`) join `venue_hall` `h`) where ((`v`.`venue_id` = `h`.`venue_id`) and (`u`.`upload_id` = `h`.`venue_hall_image_id`)) ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment_table`
--
ALTER TABLE `comment_table`
  ADD CONSTRAINT `user_id_comment` FOREIGN KEY (`user_id`) REFERENCES `login` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `contact`
--
ALTER TABLE `contact`
  ADD CONSTRAINT `address_id_contact` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `contact_img_id` FOREIGN KEY (`image_id`) REFERENCES `upload` (`upload_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `event_id_contact` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `fk_banner_id` FOREIGN KEY (`banner_id`) REFERENCES `upload` (`upload_id`),
  ADD CONSTRAINT `fk_logo_id` FOREIGN KEY (`logo_id`) REFERENCES `upload` (`upload_id`);

--
-- Constraints for table `event_meta`
--
ALTER TABLE `event_meta`
  ADD CONSTRAINT `event_id_meta` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `event_user_register`
--
ALTER TABLE `event_user_register`
  ADD CONSTRAINT `event_id_fk2` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk2_reg_user` FOREIGN KEY (`user_id`) REFERENCES `login` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `photo_id_fkey` FOREIGN KEY (`photo_id`) REFERENCES `upload` (`upload_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `login_profile`
--
ALTER TABLE `login_profile`
  ADD CONSTRAINT `fr_login_prof_id` FOREIGN KEY (`user_id`) REFERENCES `login` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `icon_id` FOREIGN KEY (`image_id`) REFERENCES `upload` (`upload_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `product_image`
--
ALTER TABLE `product_image`
  ADD CONSTRAINT `image_id_upload_image` FOREIGN KEY (`image_id`) REFERENCES `upload` (`upload_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `product_id_product_image` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `question_table`
--
ALTER TABLE `question_table`
  ADD CONSTRAINT `survey_id_session` FOREIGN KEY (`session_id`) REFERENCES `session` (`session_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `rating_votes`
--
ALTER TABLE `rating_votes`
  ADD CONSTRAINT `fk_rating_id` FOREIGN KEY (`rating_id`) REFERENCES `rating` (`rating_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `uid` FOREIGN KEY (`uid`) REFERENCES `login` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `fk1_rating_id` FOREIGN KEY (`rating_id`) REFERENCES `rating` (`rating_id`),
  ADD CONSTRAINT `fk_event_id` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`);

--
-- Constraints for table `session_resource`
--
ALTER TABLE `session_resource`
  ADD CONSTRAINT `fk1_session_id` FOREIGN KEY (`session_id`) REFERENCES `session` (`session_id`),
  ADD CONSTRAINT `resource_id` FOREIGN KEY (`resource_id`) REFERENCES `upload` (`upload_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `session_speaker`
--
ALTER TABLE `session_speaker`
  ADD CONSTRAINT `fk_session_id` FOREIGN KEY (`session_id`) REFERENCES `session` (`session_id`),
  ADD CONSTRAINT `speaker_id_fk1` FOREIGN KEY (`speaker_id`) REFERENCES `speaker` (`speaker_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `session_user_register`
--
ALTER TABLE `session_user_register`
  ADD CONSTRAINT `sess_reg_fkey1` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sess_reg_frkey2` FOREIGN KEY (`user_id`) REFERENCES `login` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sess_reg_frkey3` FOREIGN KEY (`session_id`) REFERENCES `session` (`session_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `speaker`
--
ALTER TABLE `speaker`
  ADD CONSTRAINT `speaker_address_id` FOREIGN KEY (`speaker_address_id`) REFERENCES `address` (`address_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `upload_id` FOREIGN KEY (`upload_id`) REFERENCES `upload` (`upload_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `survey`
--
ALTER TABLE `survey`
  ADD CONSTRAINT `question_id_survey_table` FOREIGN KEY (`question_id`) REFERENCES `question_table` (`question_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `session_id_user_survey` FOREIGN KEY (`session_id`) REFERENCES `session` (`session_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `user_id_survey` FOREIGN KEY (`user_id`) REFERENCES `login` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `survey_option`
--
ALTER TABLE `survey_option`
  ADD CONSTRAINT `question_id_survey` FOREIGN KEY (`question_id`) REFERENCES `question_table` (`question_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `venue`
--
ALTER TABLE `venue`
  ADD CONSTRAINT `address_id` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `venue_attractions`
--
ALTER TABLE `venue_attractions`
  ADD CONSTRAINT `venue_id_attaractions` FOREIGN KEY (`venue_id`) REFERENCES `venue` (`venue_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `venue_hall`
--
ALTER TABLE `venue_hall`
  ADD CONSTRAINT `fk_venue_id` FOREIGN KEY (`venue_id`) REFERENCES `venue` (`venue_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `floor_map_image_id` FOREIGN KEY (`venue_hall_image_id`) REFERENCES `upload` (`upload_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
