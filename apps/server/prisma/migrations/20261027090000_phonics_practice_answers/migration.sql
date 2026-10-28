CREATE TABLE "PhonicsPracticeAnswer" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "childId" TEXT NOT NULL,
  "courseVersionId" TEXT NOT NULL,
  "clientEventId" TEXT NOT NULL,
  "questionId" TEXT NOT NULL,
  "wordId" TEXT NOT NULL,
  "mode" TEXT NOT NULL,
  "requestHash" TEXT NOT NULL,
  "correct" BOOLEAN NOT NULL,
  "firstAttempt" BOOLEAN NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PhonicsPracticeAnswer_childId_fkey" FOREIGN KEY ("childId") REFERENCES "ChildProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "PhonicsPracticeAnswer_childId_clientEventId_key" ON "PhonicsPracticeAnswer"("childId", "clientEventId");
CREATE INDEX "PhonicsPracticeAnswer_childId_courseVersionId_createdAt_idx" ON "PhonicsPracticeAnswer"("childId", "courseVersionId", "createdAt");
CREATE INDEX "PhonicsPracticeAnswer_childId_questionId_idx" ON "PhonicsPracticeAnswer"("childId", "questionId");
