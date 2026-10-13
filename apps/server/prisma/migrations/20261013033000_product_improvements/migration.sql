-- AlterTable
ALTER TABLE "WordCard" ADD COLUMN "blockOrder" INTEGER;
ALTER TABLE "WordCard" ADD COLUMN "chapterOrder" INTEGER;
ALTER TABLE "WordCard" ADD COLUMN "sourceBookId" TEXT;

-- CreateTable
CREATE TABLE "ImportedRevision" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "chapters" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ImportedRevision_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "ImportedBook" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReadingBookmark" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "childId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "chapter" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "anchor" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ReadingBookmark_childId_fkey" FOREIGN KEY ("childId") REFERENCES "ChildProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContentFeedback" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "familyId" TEXT NOT NULL,
    "bookId" TEXT,
    "version" TEXT,
    "chapter" INTEGER,
    "position" INTEGER,
    "category" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'open',
    "resolution" TEXT,
    "duplicateOf" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ContentFeedback_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReadingPlan" (
    "childId" TEXT NOT NULL PRIMARY KEY,
    "days" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ReadingPlan_childId_fkey" FOREIGN KEY ("childId") REFERENCES "ChildProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DeviceSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "familyId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "deviceId" TEXT,
    "label" TEXT,
    "lastSeenAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" DATETIME,
    CONSTRAINT "DeviceSession_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_DeviceSession" ("createdAt", "deviceId", "familyId", "id", "revokedAt", "role") SELECT "createdAt", "deviceId", "familyId", "id", "revokedAt", "role" FROM "DeviceSession";
DROP TABLE "DeviceSession";
ALTER TABLE "new_DeviceSession" RENAME TO "DeviceSession";
CREATE INDEX "DeviceSession_familyId_idx" ON "DeviceSession"("familyId");
CREATE TABLE "new_ImportedBook" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "familyId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "lang" TEXT NOT NULL,
    "ageStage" TEXT NOT NULL,
    "sourceName" TEXT NOT NULL,
    "format" TEXT NOT NULL DEFAULT 'txt',
    "contentVersion" INTEGER NOT NULL DEFAULT 1,
    "sha256" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ImportedBook_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ImportedBook" ("ageStage", "author", "createdAt", "familyId", "format", "id", "lang", "sha256", "sourceName", "title") SELECT "ageStage", "author", "createdAt", "familyId", "format", "id", "lang", "sha256", "sourceName", "title" FROM "ImportedBook";
DROP TABLE "ImportedBook";
ALTER TABLE "new_ImportedBook" RENAME TO "ImportedBook";
CREATE INDEX "ImportedBook_familyId_createdAt_idx" ON "ImportedBook"("familyId", "createdAt");
CREATE UNIQUE INDEX "ImportedBook_familyId_sha256_key" ON "ImportedBook"("familyId", "sha256");
CREATE TABLE "new_ImportedReadingProgress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "childId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 1,
    "offset" INTEGER NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "relocationRequired" BOOLEAN NOT NULL DEFAULT false,
    "contentVersion" INTEGER NOT NULL DEFAULT 1,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ImportedReadingProgress_childId_fkey" FOREIGN KEY ("childId") REFERENCES "ChildProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ImportedReadingProgress_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "ImportedBook" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ImportedReadingProgress" ("bookId", "childId", "completed", "id", "offset", "order", "updatedAt") SELECT "bookId", "childId", "completed", "id", "offset", "order", "updatedAt" FROM "ImportedReadingProgress";
DROP TABLE "ImportedReadingProgress";
ALTER TABLE "new_ImportedReadingProgress" RENAME TO "ImportedReadingProgress";
CREATE UNIQUE INDEX "ImportedReadingProgress_childId_bookId_key" ON "ImportedReadingProgress"("childId", "bookId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "ImportedRevision_bookId_version_key" ON "ImportedRevision"("bookId", "version");

-- CreateIndex
CREATE INDEX "ReadingBookmark_childId_bookId_idx" ON "ReadingBookmark"("childId", "bookId");

-- CreateIndex
CREATE INDEX "ContentFeedback_familyId_createdAt_idx" ON "ContentFeedback"("familyId", "createdAt");
