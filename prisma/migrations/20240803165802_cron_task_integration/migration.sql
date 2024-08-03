/*
  Warnings:

  - You are about to alter the column `lastCompleted` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `nextComplection` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `active` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.
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
    MODIFY `lastCompleted` DATETIME(3) NULL,
    MODIFY `nextComplection` DATETIME(3) NULL,
    MODIFY `active` BOOLEAN NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_google_id_key` ON `User`(`google_id`);
