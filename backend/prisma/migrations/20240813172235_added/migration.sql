-- AlterTable
ALTER TABLE "User" ADD COLUMN     "encryptionKey" JSONB,
ADD COLUMN     "iv" TEXT;
