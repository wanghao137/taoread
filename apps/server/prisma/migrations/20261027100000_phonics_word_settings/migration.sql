ALTER TABLE "PhonicsEnrollment" ADD COLUMN "wordSettingsJson" TEXT NOT NULL DEFAULT '{}';
ALTER TABLE "PhonicsEnrollment" ADD COLUMN "wordSettingsRevision" INTEGER NOT NULL DEFAULT 0;
