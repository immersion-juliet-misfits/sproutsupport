/*
  Warnings:

  - You are about to drop the column `userId` on the `Plant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[google_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Plant` DROP FOREIGN KEY `Plant_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_image_id_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_userId_fkey`;

-- AlterTable
ALTER TABLE `Plant` DROP COLUMN `userId`,
    MODIFY `plantAPIID` INTEGER NULL,
    MODIFY `species` VARCHAR(191) NULL,
    MODIFY `commonName` VARCHAR(191) NULL,
    MODIFY `nickname` VARCHAR(191) NULL,
    MODIFY `location` VARCHAR(191) NULL,
    MODIFY `imageUrl` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Post` MODIFY `userId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_google_id_key` ON `User`(`google_id`);
