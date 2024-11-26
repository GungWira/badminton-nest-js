/*
  Warnings:

  - You are about to drop the column `dateID` on the `Court` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `orderID` on the `OrderDetail` table. All the data in the column will be lost.
  - You are about to drop the column `playtimeID` on the `OrderDetail` table. All the data in the column will be lost.
  - You are about to drop the column `courtID` on the `Playtime` table. All the data in the column will be lost.
  - Added the required column `datePlayId` to the `Court` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playtimeId` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courtId` to the `Playtime` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Court` DROP FOREIGN KEY `Court_dateID_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_userID_fkey`;

-- DropForeignKey
ALTER TABLE `OrderDetail` DROP FOREIGN KEY `OrderDetail_orderID_fkey`;

-- DropForeignKey
ALTER TABLE `OrderDetail` DROP FOREIGN KEY `OrderDetail_playtimeID_fkey`;

-- DropForeignKey
ALTER TABLE `Playtime` DROP FOREIGN KEY `Playtime_courtID_fkey`;

-- AlterTable
ALTER TABLE `Court` DROP COLUMN `dateID`,
    ADD COLUMN `datePlayId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `userID`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `OrderDetail` DROP COLUMN `orderID`,
    DROP COLUMN `playtimeID`,
    ADD COLUMN `orderId` INTEGER NOT NULL,
    ADD COLUMN `playtimeId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Playtime` DROP COLUMN `courtID`,
    ADD COLUMN `courtId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Court` ADD CONSTRAINT `Court_datePlayId_fkey` FOREIGN KEY (`datePlayId`) REFERENCES `DatePlay`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Playtime` ADD CONSTRAINT `Playtime_courtId_fkey` FOREIGN KEY (`courtId`) REFERENCES `Court`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderDetail` ADD CONSTRAINT `OrderDetail_playtimeId_fkey` FOREIGN KEY (`playtimeId`) REFERENCES `Playtime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderDetail` ADD CONSTRAINT `OrderDetail_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
