import { PrismaService } from 'src/prisma/prisma.service';

export class PrismaServiceFactory {
  create(): PrismaService {
    return new PrismaService();
  }
}
