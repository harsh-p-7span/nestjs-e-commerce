/*
  Warnings:

  - You are about to drop the column `subcategory_id` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_subcategory_id_fkey`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `subcategory_id`;

-- CreateTable
CREATE TABLE `_productTosubcategory` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_productTosubcategory_AB_unique`(`A`, `B`),
    INDEX `_productTosubcategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_productTosubcategory` ADD CONSTRAINT `_productTosubcategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_productTosubcategory` ADD CONSTRAINT `_productTosubcategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `subcategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
