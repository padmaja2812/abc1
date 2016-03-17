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
