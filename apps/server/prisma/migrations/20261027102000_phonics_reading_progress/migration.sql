CREATE TABLE "PhonicsReadingProgress" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "childId" TEXT NOT NULL,
  "courseVersionId" TEXT NOT NULL,
  "readerId" TEXT NOT NULL,
  "page" INTEGER NOT NULL DEFAULT 0,
  "fontSize" INTEGER NOT NULL DEFAULT 24,
  "revision" INTEGER NOT NULL DEFAULT 0,
  "updatedAt" DATETIME NOT NULL,
  CONSTRAINT "PhonicsReadingProgress_childId_fkey" FOREIGN KEY ("childId") REFERENCES "ChildProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "PhonicsReadingProgress_childId_courseVersionId_readerId_key" ON "PhonicsReadingProgress"("childId", "courseVersionId", "readerId");
CREATE INDEX "PhonicsReadingProgress_childId_courseVersionId_idx" ON "PhonicsReadingProgress"("childId", "courseVersionId");
