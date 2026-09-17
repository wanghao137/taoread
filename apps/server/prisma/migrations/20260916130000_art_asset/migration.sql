-- CreateTable
CREATE TABLE "ArtAsset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "scene" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "urlPath" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "bytes" INTEGER NOT NULL,
    "prompt" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "ArtAsset_scene_key" ON "ArtAsset"("scene");
