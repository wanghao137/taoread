CREATE TABLE "PhonicsWordSession" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "childId" TEXT NOT NULL,
  "courseVersionId" TEXT NOT NULL,
  "stateJson" TEXT,
  "revision" INTEGER NOT NULL DEFAULT 0,
  "updatedAt" DATETIME NOT NULL,
  CONSTRAINT "PhonicsWordSession_childId_fkey" FOREIGN KEY ("childId") REFERENCES "ChildProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "PhonicsWordSession_childId_key" ON "PhonicsWordSession"("childId");
CREATE TABLE "PhonicsWordSessionMutation" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "childId" TEXT NOT NULL,
  "clientEventId" TEXT NOT NULL,
  "requestHash" TEXT NOT NULL,
  "revision" INTEGER NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PhonicsWordSessionMutation_childId_fkey" FOREIGN KEY ("childId") REFERENCES "ChildProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "PhonicsWordSessionMutation_childId_clientEventId_key" ON "PhonicsWordSessionMutation"("childId", "clientEventId");
CREATE INDEX "PhonicsWordSessionMutation_childId_createdAt_idx" ON "PhonicsWordSessionMutation"("childId", "createdAt");
