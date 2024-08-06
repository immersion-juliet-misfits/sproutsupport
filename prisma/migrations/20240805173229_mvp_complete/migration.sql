/*
  Warnings:

  - You are about to drop the column `image_id` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `overdue` on the `Task` table. All the data in the column will be lost.
  - Added the required column `active` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Made the column `lastCompleted` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nextComplection` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `plant_id` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_plant_id_fkey`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `image_id`;

-- AlterTable
ALTER TABLE `Task` DROP COLUMN `overdue`,
    ADD COLUMN `active` BOOLEAN NOT NULL,
    MODIFY `lastCompleted` DATETIME(3) NOT NULL,
    MODIFY `nextComplection` DATETIME(3) NOT NULL,
    MODIFY `plant_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_plant_id_fkey` FOREIGN KEY (`plant_id`) REFERENCES `Plant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
