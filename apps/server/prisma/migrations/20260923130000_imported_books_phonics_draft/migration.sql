CREATE TABLE "ImportedBook" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "familyId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "author" TEXT,
  "lang" TEXT NOT NULL,
  "ageStage" TEXT NOT NULL,
  "sourceName" TEXT NOT NULL,
  "sha256" TEXT NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ImportedBook_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "ImportedBook_familyId_sha256_key" ON "ImportedBook"("familyId", "sha256");
CREATE INDEX "ImportedBook_familyId_createdAt_idx" ON "ImportedBook"("familyId", "createdAt");
CREATE TABLE "ImportedChapter" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "bookId" TEXT NOT NULL,
  "order" INTEGER NOT NULL,
  "title" TEXT NOT NULL,
  "text" TEXT NOT NULL,
  CONSTRAINT "ImportedChapter_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "ImportedBook" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "ImportedChapter_bookId_order_key" ON "ImportedChapter"("bookId", "order");
CREATE TABLE "PhonicsEnrollment" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "childId" TEXT NOT NULL,
  "enabled" BOOLEAN NOT NULL DEFAULT false,
  "updatedAt" DATETIME NOT NULL,
  CONSTRAINT "PhonicsEnrollment_childId_fkey" FOREIGN KEY ("childId") REFERENCES "ChildProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "PhonicsEnrollment_childId_key" ON "PhonicsEnrollment"("childId");
CREATE TABLE "PhonicsAttempt" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "childId" TEXT NOT NULL,
  "clientAttemptId" TEXT NOT NULL,
  "lessonId" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'started',
  "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "finishedAt" DATETIME,
  CONSTRAINT "PhonicsAttempt_childId_fkey" FOREIGN KEY ("childId") REFERENCES "ChildProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "PhonicsAttempt_childId_clientAttemptId_key" ON "PhonicsAttempt"("childId", "clientAttemptId");
CREATE INDEX "PhonicsAttempt_childId_startedAt_idx" ON "PhonicsAttempt"("childId", "startedAt");
CREATE TABLE "PhonicsResponse" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "attemptId" TEXT NOT NULL,
  "itemId" TEXT NOT NULL,
  "answerId" TEXT NOT NULL,
  "correct" BOOLEAN NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PhonicsResponse_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "PhonicsAttempt" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "PhonicsResponse_attemptId_itemId_key" ON "PhonicsResponse"("attemptId", "itemId");