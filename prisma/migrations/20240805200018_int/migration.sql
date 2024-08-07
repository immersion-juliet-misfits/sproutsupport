/*
  Warnings:

  - You are about to drop the column `message` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `post_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `Task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_plant_id_fkey`;

-- DropIndex
DROP INDEX `Post_image_id_fkey` ON `Post`;

-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `message`,
    DROP COLUMN `post_id`,
    DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `Task` DROP COLUMN `active`,
    ADD COLUMN `overdue` BOOLEAN NULL,
    MODIFY `lastCompleted` DATETIME(3) NULL,
    MODIFY `nextComplection` DATETIME(3) NULL,
    MODIFY `plant_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_plant_id_fkey` FOREIGN KEY (`plant_id`) REFERENCES `Plant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
