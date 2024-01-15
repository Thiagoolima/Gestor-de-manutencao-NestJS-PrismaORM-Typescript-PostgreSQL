-- CreateTable
CREATE TABLE "vehicles" (
    "plate" CHAR(7) NOT NULL,
    "model" VARCHAR(64),
    "manufacturer" VARCHAR(64),
    "fabrication_year" CHAR(4),
    "model_year" CHAR(4),
    "current_odometer" INTEGER NOT NULL,
    "url_img_vehicle" TEXT,
    "fuel_type" VARCHAR(30),
    "category" VARCHAR(30),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("plate")
);

-- CreateTable
CREATE TABLE "service_orders" (
    "id" SERIAL NOT NULL,
    "service_date" TIMESTAMP(3) NOT NULL,
    "odometer" INTEGER NOT NULL,
    "vehicle_plate" CHAR(7) NOT NULL,
    "supplier_id" INTEGER NOT NULL,

    CONSTRAINT "service_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "phone" VARCHAR(12) NOT NULL,

    CONSTRAINT "supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attachments" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "service_order_id" INTEGER NOT NULL,

    CONSTRAINT "attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_order_items" (
    "id" SERIAL NOT NULL,
    "service_order_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,

    CONSTRAINT "service_order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(120) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refuelings" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "liters" DECIMAL(10,2) NOT NULL,
    "cost" INTEGER NOT NULL,
    "full_tank" BOOLEAN NOT NULL DEFAULT false,
    "odometer" INTEGER NOT NULL,
    "vehicle_plate_id" CHAR(7) NOT NULL,

    CONSTRAINT "refuelings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_orders" ADD CONSTRAINT "service_orders_vehicle_plate_fkey" FOREIGN KEY ("vehicle_plate") REFERENCES "vehicles"("plate") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_orders" ADD CONSTRAINT "service_orders_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_service_order_id_fkey" FOREIGN KEY ("service_order_id") REFERENCES "service_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_order_items" ADD CONSTRAINT "service_order_items_service_order_id_fkey" FOREIGN KEY ("service_order_id") REFERENCES "service_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_order_items" ADD CONSTRAINT "service_order_items_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refuelings" ADD CONSTRAINT "refuelings_vehicle_plate_id_fkey" FOREIGN KEY ("vehicle_plate_id") REFERENCES "vehicles"("plate") ON DELETE RESTRICT ON UPDATE CASCADE;
