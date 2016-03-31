-- --------------------------------------------------------
--
-- Add a new field is_office365 to login table. Default is false.
--
ALTER TABLE `login`  ADD `is_office365` BOOLEAN NOT NULL DEFAULT FALSE COMMENT '1 for enabling office 365 login for current user'  AFTER `organisation`;

--
ALTER TABLE `login` ADD UNIQUE(`name`);
ALTER TABLE `login` ADD UNIQUE(`mail`);
ALTER TABLE `login` CHANGE `type` `type` VARCHAR(16) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'USER';

--------- 
-- REMOVED UNUSED TABLE (ADDRESS) JOINS AND ADDED CONDITIONS TO EXISTING JOINS (VENUE, RATING, UPLOAD)--
---------
CREATE OR REPLACE 
VIEW `vw_event_details` AS
    SELECT 
        `event`.`event_id` AS `event_id`,
        `event`.`title` AS `title`,
        `event`.`logo_id` AS `logo_id`,
        `event`.`banner_id` AS `banner_id`,
        `event`.`short_desc` AS `short_desc`,
        `event`.`long_desc` AS `long_desc`,
        `event`.`start_date` AS `start_date`,
        `event`.`start_time` AS `start_time`,
        `event`.`end_time` AS `end_time`,
        `event`.`end_date` AS `end_date`,
        `event`.`venue_id` AS `venue_id`,
        `event`.`rating_id` AS `rating_id`,
        `event`.`added_time` AS `added_time`,
        `event`.`added_date` AS `added_date`,
        `event`.`is_disabled` AS `is_disabled`,
        `venue`.`venue_name` AS `venue_name`,
        `rating`.`rating_average` AS `average_rating`,
        COUNT(DISTINCT `session`.`session_id`) AS `session_count`,
        COUNT(DISTINCT `session_speaker`.`speaker_id`) AS `speaker_count`,
        COUNT(DISTINCT `event_user_register`.`user_id`) AS `registered_users_count`,
        COUNT(DISTINCT `session_user_register`.`user_id`) AS `attending_users_count`
    FROM
        (((((((`event`
        LEFT JOIN `rating` ON ((`event`.`rating_id` = `rating`.`rating_id`)))
        LEFT JOIN `upload` ON (((`event`.`logo_id` = `upload`.`upload_id`)
            AND (`event`.`banner_id` = `upload`.`upload_id`))))
        LEFT JOIN `session` ON ((`event`.`event_id` = `session`.`event_id`)))
        LEFT JOIN `venue` ON ((`event`.`venue_id` = `venue`.`venue_id`)))
        LEFT JOIN `session_speaker` ON ((`session`.`session_id` = `session_speaker`.`session_id`)))
        LEFT JOIN `event_user_register` ON ((`event`.`event_id` = `event_user_register`.`event_id`)))
        LEFT JOIN `session_user_register` ON ((`event`.`event_id` = `session_user_register`.`event_id`)))
    GROUP BY `event`.`event_id`
	
	
--------------
--Added rating_id column from speaker table to the view
--------------	
CREATE 
     OR REPLACE 
VIEW `vw_speaker_address_details` AS
    SELECT 
        `s`.`speaker_id` AS `speaker_id`,
        `s`.`speaker_name` AS `speaker_name`,
        `s`.`speaker_address_id` AS `speaker_address_id`,
        `s`.`speaker_dept` AS `speaker_dept`,
        `s`.`speaker_job_title` AS `speaker_job_title`,
        `s`.`speaker_details` AS `speaker_details`,
        `s`.`speaker_fb_detail` AS `speaker_fb_detail`,
        `s`.`speaker_twitter_detail` AS `speaker_twitter_detail`,
        `s`.`speaker_google_plus_detail` AS `speaker_google_plus_detail`,
        `s`.`speaker_linkedin_detail` AS `speaker_linkedin_detail`,
        `s`.`rating_id` AS `speaker_rating_id`,
        `ad`.`address_id` AS `ad_address_id`,
        `ad`.`name` AS `ad_name`,
        `ad`.`line_one` AS `ad_line_one`,
        `ad`.`line_two` AS `ad_line_two`,
        `ad`.`city` AS `ad_city`,
        `ad`.`zip` AS `ad_zip`,
        `ad`.`phone_one` AS `ad_phone_one`,
        `ad`.`longitude` AS `ad_longitude`,
        `ad`.`latitude` AS `ad_latitude`,
        `ad`.`email` AS `ad_email`,
        `ad`.`website` AS `ad_website`,
        `u`.`upload_id` AS `upload_id`,
        `u`.`blob_obj` AS `blob_obj`
    FROM
        ((`speaker` `s`
        JOIN `address` `ad`)
        JOIN `upload` `u`)
    WHERE
        ((`s`.`speaker_address_id` = `ad`.`address_id`)
            AND (`s`.`upload_id` = `u`.`upload_id`));


--------------
--Default value of added_time is changed from null to current system timestamp
--------------			
ALTER TABLE `konyevents`.`rating_votes` 
CHANGE COLUMN `added_time` `added_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ;


ALTER TABLE `speaker` CHANGE `speaker_google+_detail` `speaker_google_plus_detail` VARCHAR(1024) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL;

ALTER TABLE `speaker`  ADD `rating_id` INT UNSIGNED NULL DEFAULT NULL,  ADD INDEX (`rating_id`) ;
