/*
  Warnings:

  - You are about to drop the column `weatherAlerts` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `weatherConditions` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `weatherForecast` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `weatherAlerts`,
    DROP COLUMN `weatherConditions`,
    DROP COLUMN `weatherForecast`;
