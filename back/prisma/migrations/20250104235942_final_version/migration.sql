-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "adType" TEXT,
    "condoFee" DOUBLE PRECISION,
    "description" TEXT,
    "propertyTax" DOUBLE PRECISION,
    "available" BOOLEAN DEFAULT true,
    "numberOfBedrooms" INTEGER,
    "price" DOUBLE PRECISION,
    "creationDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "parkingSpaces" INTEGER,
    "propertyType" TEXT,
    "numberOfBathrooms" INTEGER,
    "userCpfCnpj" TEXT,
    "addressPk" INTEGER,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "addressPk" SERIAL NOT NULL,
    "neighborhood" TEXT,
    "number" TEXT,
    "street" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postalCode" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("addressPk")
);

-- CreateTable
CREATE TABLE "Review" (
    "userCpfCnpj" TEXT NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "rating" INTEGER,
    "comment" TEXT,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("userCpfCnpj","propertyId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Property_addressPk_key" ON "Property"("addressPk");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_userCpfCnpj_fkey" FOREIGN KEY ("userCpfCnpj") REFERENCES "User"("cpf_cnpj") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_addressPk_fkey" FOREIGN KEY ("addressPk") REFERENCES "Address"("addressPk") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userCpfCnpj_fkey" FOREIGN KEY ("userCpfCnpj") REFERENCES "User"("cpf_cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
