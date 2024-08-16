/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Post` table. All the data in the column will be lost.
  - Added the required column `status` to the `Meet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Meet` ADD COLUMN `message` VARCHAR(191) NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `imageUrl`,
    ADD COLUMN `image_id` INTEGER NULL;
