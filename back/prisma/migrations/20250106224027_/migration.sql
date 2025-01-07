-- DropForeignKey
ALTER TABLE "Telephone" DROP CONSTRAINT "Telephone_userId_fkey";

-- AddForeignKey
ALTER TABLE "Telephone" ADD CONSTRAINT "Telephone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("cpf_cnpj") ON DELETE CASCADE ON UPDATE CASCADE;
