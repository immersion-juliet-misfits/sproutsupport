/*
  Warnings:

  - You are about to drop the column `points` on the `User` table. All the data in the column will be lost.
  - Added the required column `message` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `message` VARCHAR(191) NOT NULL,
    ADD COLUMN `postId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `points`,
    MODIFY `level` INTEGER NULL;

-- CreateIndex
CREATE INDEX `Comment_postId_fkey` ON `Comment`(`postId`);

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
