/*
  Warnings:

  - You are about to drop the column `index` on the `List` table. All the data in the column will be lost.
  - You are about to drop the column `index` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "List" DROP COLUMN "index",
ADD COLUMN     "tasksOrder" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "index";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE SET NULL ON UPDATE CASCADE;
