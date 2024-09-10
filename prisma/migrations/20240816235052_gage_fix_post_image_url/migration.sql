-- /*
--   Warnings:

--   - You are about to drop the column `image_id` on the `Post` table. All the data in the column will be lost.
--   - Added the required column `imageURL` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- ALTER TABLE `Post` DROP COLUMN `image_id`,
--     ADD COLUMN `imageURL` VARCHAR(191) NOT NULL;
