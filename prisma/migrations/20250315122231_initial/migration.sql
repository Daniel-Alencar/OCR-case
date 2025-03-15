-- CreateTable
CREATE TABLE "Consultant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiration" TIMESTAMP(3),
    "areaOfActivity" JSONB NOT NULL,
    "availability" TEXT,
    "description" TEXT,
    "accepted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Consultant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "consultantId" INTEGER NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Consultant_email_key" ON "Consultant"("email");

-- CreateIndex
CREATE INDEX "Document_consultantId_idx" ON "Document"("consultantId");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_consultantId_fkey" FOREIGN KEY ("consultantId") REFERENCES "Consultant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
