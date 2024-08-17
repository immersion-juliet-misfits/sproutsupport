-- AlterTable
ALTER TABLE `User` ADD COLUMN `weatherAlerts` JSON NULL,
    ADD COLUMN `weatherConditions` JSON NULL,
    ADD COLUMN `weatherForecast` JSON NULL;
