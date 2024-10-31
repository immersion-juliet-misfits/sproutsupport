-- DropIndex
DROP INDEX `Post_userId_fkey` ON `Post`;

-- RenameIndex
ALTER TABLE `Post` RENAME INDEX `Post_userId_username_fkey` TO `Post_userId_fkey`;
