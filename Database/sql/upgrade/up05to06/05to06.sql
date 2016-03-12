-- --------------------------------------------------------
--
-- Add a new field is_office365 to login table. Default is false.
--
ALTER TABLE `login`  ADD `is_office365` BOOLEAN NOT NULL DEFAULT FALSE COMMENT '1 for enabling office 365 login for current user'  AFTER `organisation`;

