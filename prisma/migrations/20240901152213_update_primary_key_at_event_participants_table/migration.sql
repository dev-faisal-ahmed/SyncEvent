/*
  Warnings:

  - The primary key for the `EventParticipants` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "EventParticipants" DROP CONSTRAINT "EventParticipants_pkey",
ADD CONSTRAINT "EventParticipants_pkey" PRIMARY KEY ("id");
