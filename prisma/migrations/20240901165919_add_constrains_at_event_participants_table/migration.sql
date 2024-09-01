/*
  Warnings:

  - A unique constraint covering the columns `[email,eventId]` on the table `EventParticipants` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EventParticipants_email_eventId_key" ON "EventParticipants"("email", "eventId");
