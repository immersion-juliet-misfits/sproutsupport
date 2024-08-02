-- DropForeignKey
ALTER TABLE `Plant` DROP FOREIGN KEY `Plant_userId_fkey`;

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
ALTER TABLE `User` MODIFY `google_id` VARCHAR(191) NOT NULL,
    MODIFY `location_id` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_google_id_key` ON `User`(`google_id`);

