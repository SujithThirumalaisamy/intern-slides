-- CreateTable
CREATE TABLE "user" (
    "userId" TEXT NOT NULL,
    "access_token" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_userId_key" ON "user"("userId");
