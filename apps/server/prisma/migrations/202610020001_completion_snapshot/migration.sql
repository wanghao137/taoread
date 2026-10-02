ALTER TABLE "Cosession" ADD COLUMN "completionVerified" BOOLEAN;
CREATE INDEX "Cosession_familyId_endedAt_idx" ON "Cosession"("familyId", "endedAt");
