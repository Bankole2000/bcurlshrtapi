-- CreateTable
CREATE TABLE "Url" (
    "id" SERIAL NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "shortenedId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url.originalUrl_unique" ON "Url"("originalUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Url.shortenedId_unique" ON "Url"("shortenedId");
