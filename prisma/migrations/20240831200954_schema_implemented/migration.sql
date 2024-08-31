-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventParticipents" (
    "email" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "EventParticipents_pkey" PRIMARY KEY ("email","eventId")
);

-- AddForeignKey
ALTER TABLE "EventParticipents" ADD CONSTRAINT "EventParticipents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
