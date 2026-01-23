import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'; 

@Injectable() // Nest’s DI container can inject it  
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL is not set');
    }

    const adapter = new PrismaPg({ connectionString });
    super({ adapter }); // ✅ Prisma 7 requires adapter or accelerateUrl
  }  
  async onModuleInit() {
    // Connect once when Nest starts up 
    await this.$connect();
  }
  async onModuleDestroy() {
    // Gracefully disconnect when Nest shuts down 
    await this.$disconnect();
  }
}