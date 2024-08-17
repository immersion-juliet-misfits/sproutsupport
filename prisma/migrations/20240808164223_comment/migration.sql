-- /*
--   Warnings:

--   - Added the required column `message` to the `Comment` table without a default value. This is not possible if the table is not empty.
--   - Added the required column `postId` to the `Comment` table without a default value. This is not possible if the table is not empty.
--   - Made the column `imageUrl` on table `Post` required. This step will fail if there are existing NULL values in that column.

-- */
-- -- AlterTable
-- ALTER TABLE `Comment` ADD COLUMN `message` VARCHAR(191) NOT NULL,
--     ADD COLUMN `postId` INTEGER NOT NULL;

-- -- AlterTable
-- ALTER TABLE `Post` MODIFY `imageUrl` VARCHAR(191) NOT NULL;

-- -- AddForeignKey
-- ALTER TABLE `Comment` ADD CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
