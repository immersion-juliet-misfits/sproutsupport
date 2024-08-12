/*
  Warnings:

  - You are about to drop the column `message` on the `Meet` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Meet` table. All the data in the column will be lost.
  - You are about to drop the column `image_id` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `points` on the `User` table. All the data in the column will be lost.
  - Added the required column `message` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `message` VARCHAR(191) NOT NULL,
    ADD COLUMN `postId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Meet` DROP COLUMN `message`,
    DROP COLUMN `status`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `image_id`,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `latitude`,
    DROP COLUMN `longitude`,
    DROP COLUMN `points`,
    MODIFY `level` INTEGER NULL;

-- CreateIndex
CREATE INDEX `Comment_postId_fkey` ON `Comment`(`postId`);

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
