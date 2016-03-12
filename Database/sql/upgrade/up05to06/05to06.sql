-- --------------------------------------------------------
--
-- Add a new field is_office365 to login table. Default is false.
--
ALTER TABLE `login`  ADD `is_office365` BOOLEAN NOT NULL DEFAULT FALSE COMMENT '1 for enabling office 365 login for current user'  AFTER `organisation`;

--
ALTER TABLE `login` ADD UNIQUE(`name`);
ALTER TABLE `login` ADD UNIQUE(`mail`);
ALTER TABLE `login` CHANGE `type` `type` VARCHAR(16) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'USER';
