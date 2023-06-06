/*
  Warnings:

  - The primary key for the `ArticleToTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tagId` on the `ArticleToTag` table. All the data in the column will be lost.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Tag` table. All the data in the column will be lost.
  - Added the required column `tagName` to the `ArticleToTag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ArticleToTag" DROP CONSTRAINT "ArticleToTag_tagId_fkey";

-- AlterTable
ALTER TABLE "ArticleToTag" DROP CONSTRAINT "ArticleToTag_pkey",
DROP COLUMN "tagId",
ADD COLUMN     "tagName" TEXT NOT NULL,
ADD CONSTRAINT "ArticleToTag_pkey" PRIMARY KEY ("articleId", "tagName");

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("name");

-- AddForeignKey
ALTER TABLE "ArticleToTag" ADD CONSTRAINT "ArticleToTag_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "Tag"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
