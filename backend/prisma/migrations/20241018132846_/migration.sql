/*
Warnings:
- Added the required column `userId` to the `posts` table without a default value. This is not possible if the table is not empty.
*/
-- AlterTable
ALTER TABLE `posts` ADD COLUMN `userId` INT NOT NULL DEFAULT 13;

-- AddForeignKey
ALTER TABLE `posts`
ADD CONSTRAINT `posts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;