CREATE TABLE "TtsMediaOwner" ("path" TEXT NOT NULL PRIMARY KEY, "familyId" TEXT NOT NULL, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "TtsMediaOwner_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family" ("id") ON DELETE CASCADE ON UPDATE CASCADE);
CREATE INDEX "TtsMediaOwner_familyId_idx" ON "TtsMediaOwner"("familyId");
