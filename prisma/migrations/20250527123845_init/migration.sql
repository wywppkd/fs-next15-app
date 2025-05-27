-- AlterTable
ALTER TABLE "attraction_types" ADD COLUMN     "update_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "attractions" ALTER COLUMN "update_time" SET DEFAULT CURRENT_TIMESTAMP;
