-- CreateTable
CREATE TABLE "BookReviewEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "reviewer" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "evidence" TEXT NOT NULL,
    "beforeState" TEXT NOT NULL,
    "afterState" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "BookReviewEvent_bookId_createdAt_idx" ON "BookReviewEvent"("bookId", "createdAt");
