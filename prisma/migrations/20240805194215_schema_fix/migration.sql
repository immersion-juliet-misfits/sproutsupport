/*
  Warnings:

  - You are about to drop the column `active` on the `Task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_plant_id_fkey`;

-- AlterTable
ALTER TABLE `Post` ADD COLUMN `image_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `Task` DROP COLUMN `active`,
    ADD COLUMN `overdue` BOOLEAN NULL,
    MODIFY `lastCompleted` DATETIME(3) NULL,
    MODIFY `nextComplection` DATETIME(3) NULL,
    MODIFY `plant_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_plant_id_fkey` FOREIGN KEY (`plant_id`) REFERENCES `Plant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
