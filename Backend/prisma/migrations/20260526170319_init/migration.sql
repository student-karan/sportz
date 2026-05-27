/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `match` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `match` DROP COLUMN `updatedAt`,
    ADD COLUMN `endTime` DATETIME(3) NULL;
