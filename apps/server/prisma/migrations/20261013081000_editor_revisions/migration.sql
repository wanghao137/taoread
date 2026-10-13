CREATE TABLE "BookTextRevision" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "bookId" TEXT NOT NULL,
  "fromVersion" TEXT NOT NULL,
  "toVersion" TEXT NOT NULL,
  "beforeText" TEXT NOT NULL,
  "afterText" TEXT NOT NULL,
  "reviewer" TEXT NOT NULL,
  "reason" TEXT NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX "BookTextRevision_bookId_createdAt_idx" ON "BookTextRevision"("bookId", "createdAt");
