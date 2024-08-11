/*
  Warnings:

  - Made the column `level` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `latitude` DOUBLE NULL,
    ADD COLUMN `longitude` DOUBLE NULL,
    ADD COLUMN `points` INTEGER NOT NULL DEFAULT 0,
    MODIFY `level` INTEGER NOT NULL DEFAULT 1;
