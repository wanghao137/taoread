-- CreateTable
CREATE TABLE "BookFavorite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "childId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "BookFavorite_childId_fkey" FOREIGN KEY ("childId") REFERENCES "ChildProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "BookFavorite_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WordCard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "childId" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "bookId" TEXT,
    "context" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WordCard_childId_fkey" FOREIGN KEY ("childId") REFERENCES "ChildProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WordCard_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Block" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chapterId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "kind" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "pinyin" TEXT,
    "translation" TEXT,
    "art" TEXT,
    CONSTRAINT "Block_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Block" ("art", "chapterId", "id", "kind", "order", "pinyin", "text", "translation") SELECT "art", "chapterId", "id", "kind", "order", "pinyin", "text", "translation" FROM "Block";
DROP TABLE "Block";
ALTER TABLE "new_Block" RENAME TO "Block";
CREATE INDEX "Block_chapterId_idx" ON "Block"("chapterId");
CREATE UNIQUE INDEX "Block_chapterId_order_key" ON "Block"("chapterId", "order");
CREATE TABLE "new_Chapter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "art" TEXT,
    CONSTRAINT "Chapter_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Chapter" ("art", "bookId", "id", "order", "title") SELECT "art", "bookId", "id", "order", "title" FROM "Chapter";
DROP TABLE "Chapter";
ALTER TABLE "new_Chapter" RENAME TO "Chapter";
CREATE INDEX "Chapter_bookId_idx" ON "Chapter"("bookId");
CREATE UNIQUE INDEX "Chapter_bookId_order_key" ON "Chapter"("bookId", "order");
CREATE TABLE "new_ReadingProgress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "childId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "chapterOrder" INTEGER NOT NULL DEFAULT 1,
    "blockOrder" INTEGER NOT NULL DEFAULT 0,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ReadingProgress_childId_fkey" FOREIGN KEY ("childId") REFERENCES "ChildProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ReadingProgress_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ReadingProgress" ("blockOrder", "bookId", "chapterOrder", "childId", "finished", "id", "updatedAt") SELECT "blockOrder", "bookId", "chapterOrder", "childId", "finished", "id", "updatedAt" FROM "ReadingProgress";
DROP TABLE "ReadingProgress";
ALTER TABLE "new_ReadingProgress" RENAME TO "ReadingProgress";
CREATE INDEX "ReadingProgress_childId_idx" ON "ReadingProgress"("childId");
CREATE UNIQUE INDEX "ReadingProgress_childId_bookId_key" ON "ReadingProgress"("childId", "bookId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "BookFavorite_childId_idx" ON "BookFavorite"("childId");

-- CreateIndex
CREATE UNIQUE INDEX "BookFavorite_childId_bookId_key" ON "BookFavorite"("childId", "bookId");

-- CreateIndex
CREATE INDEX "WordCard_childId_idx" ON "WordCard"("childId");

-- CreateIndex
CREATE UNIQUE INDEX "WordCard_childId_word_key" ON "WordCard"("childId", "word");

-- CreateIndex
CREATE UNIQUE INDEX "ParentPrompt_familyId_bookId_stage_nightKey_key" ON "ParentPrompt"("familyId", "bookId", "stage", "nightKey");

