/*
  Warnings:

  - Added the required column `status` to the `Meet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Meet` ADD COLUMN `message` VARCHAR(191) NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;
