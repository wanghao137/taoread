-- v2 内容域（CBF：Canonical Book Format，docs/07 §3）
-- Book 是全家庭共享的精选公版库（无 family 外键）；共读会话以 cbf: 前缀引用其 id。
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "lang" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "ageStage" TEXT NOT NULL,
    "intro" TEXT,
    "coverArt" TEXT NOT NULL,
    "coverFrom" TEXT,
    "coverTo" TEXT,
    "words" INTEGER NOT NULL DEFAULT 0,
    "source" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);
CREATE INDEX "Book_lang_category_idx" ON "Book"("lang", "category");
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "art" TEXT,
    PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Chapter_bookId_order_key" ON "Chapter"("bookId", "order");
CREATE INDEX "Chapter_bookId_idx" ON "Chapter"("bookId");
CREATE TABLE "Block" (
    "id" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "kind" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "pinyin" TEXT,
    "translation" TEXT,
    "art" TEXT,
    PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Block_chapterId_order_key" ON "Block"("chapterId", "order");
CREATE INDEX "Block_chapterId_idx" ON "Block"("chapterId");
CREATE TABLE "RightsLedger" (
    "id" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "workTitle" TEXT NOT NULL,
    "author" TEXT,
    "authorDeathYear" INTEGER,
    "translator" TEXT,
    "jurisdiction" TEXT NOT NULL,
    "basis" TEXT NOT NULL,
    "sourceUrl" TEXT,
    "note" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "RightsLedger_bookId_key" ON "RightsLedger"("bookId");
CREATE TABLE "ReadingProgress" (
    "id" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "chapterOrder" INTEGER NOT NULL DEFAULT 1,
    "blockOrder" INTEGER NOT NULL DEFAULT 0,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" DATETIME NOT NULL,
    PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "ReadingProgress_childId_bookId_key" ON "ReadingProgress"("childId", "bookId");
CREATE INDEX "ReadingProgress_childId_idx" ON "ReadingProgress"("childId");
