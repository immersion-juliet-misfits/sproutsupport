/*
  Warnings:

  - You are about to drop the column `message` on the `Meet` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Meet` table. All the data in the column will be lost.
  - You are about to drop the column `image_id` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `points` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Meet` DROP COLUMN `message`,
    DROP COLUMN `status`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `image_id`,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `points`,
    ADD COLUMN `latitude` DOUBLE NULL,
    ADD COLUMN `longitude` DOUBLE NULL,
    MODIFY `level` INTEGER NULL;
