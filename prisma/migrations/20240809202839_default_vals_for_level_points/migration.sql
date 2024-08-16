-- /*
--   Warnings:

--   - Made the column `level` on table `User` required. This step will fail if there are existing NULL values in that column.
--   - Made the column `points` on table `User` required. This step will fail if there are existing NULL values in that column.

-- */
-- -- AlterTable
-- ALTER TABLE `User` MODIFY `level` INTEGER NOT NULL DEFAULT 0,
--     MODIFY `points` INTEGER NOT NULL DEFAULT 0;
