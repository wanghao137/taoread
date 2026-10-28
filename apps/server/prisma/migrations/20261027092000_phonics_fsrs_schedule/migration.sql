ALTER TABLE "PhonicsPracticeAnswer" ADD COLUMN "track" TEXT NOT NULL DEFAULT 'practice';
ALTER TABLE "PhonicsPracticeAnswer" ADD COLUMN "reviewLogJson" TEXT;

CREATE TABLE "PhonicsWordSchedule" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "childId" TEXT NOT NULL,
  "courseVersionId" TEXT NOT NULL,
  "wordId" TEXT NOT NULL,
  "algorithm" TEXT NOT NULL,
  "cardJson" TEXT NOT NULL,
  "dueAt" DATETIME NOT NULL,
  "updatedAt" DATETIME NOT NULL,
  CONSTRAINT "PhonicsWordSchedule_childId_fkey" FOREIGN KEY ("childId") REFERENCES "ChildProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "PhonicsWordSchedule_childId_courseVersionId_wordId_key" ON "PhonicsWordSchedule"("childId", "courseVersionId", "wordId");
CREATE INDEX "PhonicsWordSchedule_childId_courseVersionId_dueAt_idx" ON "PhonicsWordSchedule"("childId", "courseVersionId", "dueAt");
