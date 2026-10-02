ALTER TABLE "Book" ADD COLUMN "publicationStatus" TEXT NOT NULL DEFAULT 'published';
ALTER TABLE "Book" ADD COLUMN "reviewStatus" TEXT NOT NULL DEFAULT 'pending';
ALTER TABLE "Book" ADD COLUMN "contentVersion" TEXT NOT NULL DEFAULT 'legacy';
