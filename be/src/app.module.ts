import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from "./prisma/prisma.module"; 
import { HealthModule } from './health/health.module';
import { SeedModule } from './seed/seed.module'; 
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // loads .env into process.env
    PrismaModule,
    HealthModule, 
    SeedModule, 
    UsersModule, 
  ],  
  // // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
