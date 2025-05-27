-- CreateTable
CREATE TABLE "attractions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type_id" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "longitude" DECIMAL(10,6) NOT NULL,
    "latitude" DECIMAL(10,6) NOT NULL,
    "introduction" TEXT,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "ticket_price" DECIMAL(10,2) NOT NULL,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attractions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attraction_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "attraction_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "attractions_name_key" ON "attractions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "attraction_types_name_key" ON "attraction_types"("name");

-- AddForeignKey
ALTER TABLE "attractions" ADD CONSTRAINT "attractions_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "attraction_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
