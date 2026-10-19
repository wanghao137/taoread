-- Additive only. v1 rows retain protocolVersion=1 and their existing responses.
ALTER TABLE "PhonicsEnrollment" ADD COLUMN "courseVersionId" TEXT;
ALTER TABLE "PhonicsEnrollment" ADD COLUMN "entryMode" TEXT NOT NULL DEFAULT 'lesson';
ALTER TABLE "PhonicsEnrollment" ADD COLUMN "entryLessonKey" TEXT;
ALTER TABLE "PhonicsEnrollment" ADD COLUMN "revision" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE "PhonicsAttempt" ADD COLUMN "protocolVersion" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "PhonicsAttempt" ADD COLUMN "courseVersionId" TEXT;
ALTER TABLE "PhonicsAttempt" ADD COLUMN "lessonKey" TEXT;
ALTER TABLE "PhonicsAttempt" ADD COLUMN "lessonHash" TEXT;
ALTER TABLE "PhonicsAttempt" ADD COLUMN "planKind" TEXT;
ALTER TABLE "PhonicsAttempt" ADD COLUMN "planJson" TEXT;
ALTER TABLE "PhonicsAttempt" ADD COLUMN "planHash" TEXT;
ALTER TABLE "PhonicsAttempt" ADD COLUMN "startRequestHash" TEXT;
ALTER TABLE "PhonicsAttempt" ADD COLUMN "stateJson" TEXT;
ALTER TABLE "PhonicsAttempt" ADD COLUMN "currentStepKey" TEXT;
ALTER TABLE "PhonicsAttempt" ADD COLUMN "revision" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "PhonicsAttempt" ADD COLUMN "activeKey" TEXT;
ALTER TABLE "PhonicsAttempt" ADD COLUMN "closeReason" TEXT;
CREATE UNIQUE INDEX "PhonicsAttempt_activeKey_key" ON "PhonicsAttempt"("activeKey");
CREATE INDEX "PhonicsAttempt_childId_protocolVersion_status_startedAt_idx" ON "PhonicsAttempt"("childId", "protocolVersion", "status", "startedAt");

CREATE TABLE "PhonicsCourseRelease" (
  "versionId" TEXT NOT NULL PRIMARY KEY,
  "courseId" TEXT NOT NULL,
  "accent" TEXT NOT NULL,
  "contentHash" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'draft',
  "publishedAt" DATETIME,
  "withdrawnAt" DATETIME,
  "defaultForCourse" TEXT
);
CREATE UNIQUE INDEX "PhonicsCourseRelease_defaultForCourse_key" ON "PhonicsCourseRelease"("defaultForCourse");
CREATE INDEX "PhonicsCourseRelease_courseId_status_idx" ON "PhonicsCourseRelease"("courseId", "status");

CREATE TABLE "PhonicsLearningEvent" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "attemptId" TEXT NOT NULL,
  "clientEventId" TEXT NOT NULL,
  "requestHash" TEXT NOT NULL,
  "serverSequence" INTEGER NOT NULL,
  "stepKey" TEXT,
  "taskInstanceId" TEXT,
  "kind" TEXT NOT NULL,
  "payloadJson" TEXT NOT NULL,
  "resultJson" TEXT NOT NULL,
  "actorRole" TEXT NOT NULL,
  "receivedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "supersedesEventId" TEXT,
  CONSTRAINT "PhonicsLearningEvent_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "PhonicsAttempt"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "PhonicsLearningEvent_attemptId_clientEventId_key" ON "PhonicsLearningEvent"("attemptId", "clientEventId");
CREATE UNIQUE INDEX "PhonicsLearningEvent_attemptId_serverSequence_key" ON "PhonicsLearningEvent"("attemptId", "serverSequence");
CREATE INDEX "PhonicsLearningEvent_attemptId_receivedAt_idx" ON "PhonicsLearningEvent"("attemptId", "receivedAt");
