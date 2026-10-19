-- Preserve v1 enabled independently. Legacy toggles must never enable v2 content.
ALTER TABLE "PhonicsEnrollment" ADD COLUMN "v2Enabled" BOOLEAN NOT NULL DEFAULT false;
