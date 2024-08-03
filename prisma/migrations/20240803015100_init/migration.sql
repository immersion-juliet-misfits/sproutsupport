/*
  Warnings:

  - A unique constraint covering the columns `[google_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Plant` MODIFY `plantAPIID` INTEGER NULL,
    MODIFY `species` VARCHAR(191) NULL,
    MODIFY `commonName` VARCHAR(191) NULL,
    MODIFY `nickname` VARCHAR(191) NULL,
    MODIFY `location` VARCHAR(191) NULL,
    MODIFY `imageUrl` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Task` MODIFY `taskName` VARCHAR(191) NULL,
    MODIFY `frequency` VARCHAR(191) NULL,
    MODIFY `lastCompleted` VARCHAR(191) NULL,
    MODIFY `nextComplection` VARCHAR(191) NULL,
    MODIFY `active` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_google_id_key` ON `User`(`google_id`);
