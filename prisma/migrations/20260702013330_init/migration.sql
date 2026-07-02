-- CreateEnum
CREATE TYPE "StageStatus" AS ENUM ('ACTIVE', 'COMPLETE', 'PAUSED');

-- CreateTable
CREATE TABLE "Protocol" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "goal" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Protocol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stage" (
    "id" TEXT NOT NULL,
    "protocolId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3),
    "status" "StageStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplement" (
    "id" TEXT NOT NULL,
    "stageId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "timing" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Supplement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogEntry" (
    "id" TEXT NOT NULL,
    "stageId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "energyLevel" INTEGER,
    "symptoms" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabResult" (
    "id" TEXT NOT NULL,
    "protocolId" TEXT NOT NULL,
    "testName" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "referenceMin" DOUBLE PRECISION,
    "referenceMax" DOUBLE PRECISION,
    "date" TIMESTAMP(3) NOT NULL,
    "flagged" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LabResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "protocolId" TEXT,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Stage" ADD CONSTRAINT "Stage_protocolId_fkey" FOREIGN KEY ("protocolId") REFERENCES "Protocol"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplement" ADD CONSTRAINT "Supplement_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogEntry" ADD CONSTRAINT "LogEntry_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabResult" ADD CONSTRAINT "LabResult_protocolId_fkey" FOREIGN KEY ("protocolId") REFERENCES "Protocol"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_protocolId_fkey" FOREIGN KEY ("protocolId") REFERENCES "Protocol"("id") ON DELETE SET NULL ON UPDATE CASCADE;
