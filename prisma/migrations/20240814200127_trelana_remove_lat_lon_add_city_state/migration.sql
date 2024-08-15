/*
  Warnings:

  - You are about to drop the column `latitude` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `location_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `latitude`,
    DROP COLUMN `location_id`,
    DROP COLUMN `longitude`,
    ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `state` VARCHAR(191) NULL;
