CREATE TABLE "PhonicsTypingResult" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "childId" TEXT NOT NULL,
  "courseVersionId" TEXT NOT NULL,
  "clientSessionId" TEXT NOT NULL,
  "requestHash" TEXT NOT NULL,
  "mode" TEXT NOT NULL,
  "source" TEXT NOT NULL,
  "items" INTEGER NOT NULL,
  "correctCharacters" INTEGER NOT NULL,
  "attemptedCharacters" INTEGER NOT NULL,
  "acceptedCharacters" INTEGER NOT NULL,
  "elapsedMs" INTEGER NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PhonicsTypingResult_childId_fkey" FOREIGN KEY ("childId") REFERENCES "ChildProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "PhonicsTypingResult_childId_clientSessionId_key" ON "PhonicsTypingResult"("childId", "clientSessionId");
CREATE INDEX "PhonicsTypingResult_childId_courseVersionId_createdAt_idx" ON "PhonicsTypingResult"("childId", "courseVersionId", "createdAt");
