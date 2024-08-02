/*
  Warnings:

  - A unique constraint covering the columns `[google_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Plant` DROP FOREIGN KEY `Plant_userId_fkey`;

-- AlterTable
ALTER TABLE `Plant` MODIFY `userId` INTEGER NULL,
    MODIFY `plantAPIID` INTEGER NULL,
    MODIFY `species` VARCHAR(191) NULL,
    MODIFY `commonName` VARCHAR(191) NULL,
    MODIFY `nickname` VARCHAR(191) NULL,
    MODIFY `location` VARCHAR(191) NULL,
    MODIFY `imageUrl` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_google_id_key` ON `User`(`google_id`);
