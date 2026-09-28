-- docs/34 P1-2：每日阅读时长提醒上限（家长可选，null=不限；温柔收尾非强制）
ALTER TABLE "Family" ADD COLUMN "dailyReadingLimitMin" INTEGER;

-- docs/34 P1-11：划线收藏（孩子长按段落收藏，进阅读记忆金句流）
CREATE TABLE "BookHighlight" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "childId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "chapterOrder" INTEGER NOT NULL,
    "blockOrder" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "BookHighlight_childId_fkey" FOREIGN KEY ("childId") REFERENCES "ChildProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "BookHighlight_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "BookHighlight_childId_bookId_chapterOrder_blockOrder_key" ON "BookHighlight"("childId", "bookId", "chapterOrder", "blockOrder");
CREATE INDEX "BookHighlight_childId_idx" ON "BookHighlight"("childId");
