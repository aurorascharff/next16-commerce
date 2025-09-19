-- DropForeignKey
ALTER TABLE "public"."Product" DROP CONSTRAINT "Product_category_fkey";

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Product_featured_idx" ON "public"."Product"("featured");
