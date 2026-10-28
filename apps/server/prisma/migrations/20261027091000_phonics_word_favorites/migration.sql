CREATE TABLE "PhonicsWordFavorite" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "childId" TEXT NOT NULL,
  "courseVersionId" TEXT NOT NULL,
  "wordId" TEXT NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PhonicsWordFavorite_childId_fkey" FOREIGN KEY ("childId") REFERENCES "ChildProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "PhonicsWordFavorite_childId_courseVersionId_wordId_key" ON "PhonicsWordFavorite"("childId", "courseVersionId", "wordId");
CREATE INDEX "PhonicsWordFavorite_childId_courseVersionId_idx" ON "PhonicsWordFavorite"("childId", "courseVersionId");
