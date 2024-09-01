/*
  Warnings:

  - You are about to drop the `EventParticipents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventParticipents" DROP CONSTRAINT "EventParticipents_eventId_fkey";

-- DropTable
DROP TABLE "EventParticipents";

-- CreateTable
CREATE TABLE "EventParticipants" (
    "email" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "EventParticipants_pkey" PRIMARY KEY ("email","eventId")
);

-- AddForeignKey
ALTER TABLE "EventParticipants" ADD CONSTRAINT "EventParticipants_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
