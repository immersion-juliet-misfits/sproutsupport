-- /*
--   Warnings:

--   - A unique constraint covering the columns `[id,userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
--   - Added the required column `userId` to the `Comment` table without a default value. This is not possible if the table is not empty.
--   - Added the required column `username` to the `Comment` table without a default value. This is not possible if the table is not empty.
--   - Added the required column `username` to the `Post` table without a default value. This is not possible if the table is not empty.

-- */
-- -- DropForeignKey
-- ALTER TABLE `Attendee` DROP FOREIGN KEY `Attendee_meet_id_fkey`;

-- -- DropForeignKey
-- ALTER TABLE `Attendee` DROP FOREIGN KEY `Attendee_userId_fkey`;

-- -- DropForeignKey
-- ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_postId_fkey`;

-- -- DropForeignKey
-- ALTER TABLE `Meet` DROP FOREIGN KEY `Meet_userId_fkey`;

-- -- DropForeignKey
-- ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_userId_fkey`;

-- -- DropForeignKey
-- ALTER TABLE `Plant` DROP FOREIGN KEY `Plant_userId_fkey`;

-- -- DropForeignKey
-- ALTER TABLE `Post` DROP FOREIGN KEY `Post_userId_fkey`;

-- -- DropForeignKey
-- ALTER TABLE `Task` DROP FOREIGN KEY `Task_plant_id_fkey`;

-- -- AlterTable
-- ALTER TABLE `Comment` ADD COLUMN `userId` INTEGER NOT NULL,
--     ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- -- AlterTable
-- ALTER TABLE `Post` ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- -- CreateIndex
-- CREATE INDEX `Comment_userId_fkey` ON `Comment`(`userId`, `username`);

-- -- CreateIndex
-- CREATE INDEX `Post_userId_fkey` ON `Post`(`userId`, `username`);

-- -- CreateIndex
-- CREATE UNIQUE INDEX `User_id_userName_key` ON `User`(`id`, `userName`);

-- -- AddForeignKey
-- ALTER TABLE `Meet` ADD CONSTRAINT `Meet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `Plant` ADD CONSTRAINT `Plant_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `Task` ADD CONSTRAINT `Task_plant_id_fkey` FOREIGN KEY (`plant_id`) REFERENCES `Plant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `Post` ADD CONSTRAINT `Post_userId_username_fkey` FOREIGN KEY (`userId`, `username`) REFERENCES `User`(`id`, `userName`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `Comment` ADD CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_username_fkey` FOREIGN KEY (`userId`, `username`) REFERENCES `User`(`id`, `userName`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `Attendee` ADD CONSTRAINT `Attendee_meet_id_fkey` FOREIGN KEY (`meet_id`) REFERENCES `Meet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `Attendee` ADD CONSTRAINT `Attendee_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
