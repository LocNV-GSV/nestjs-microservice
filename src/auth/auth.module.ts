import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'prisma/prisma.module';
import { KafkaModule } from 'src/kafka/kafka.module';
import { CreateConsumer } from './consumer/create.consumer';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    HttpModule,
    PrismaModule,
    KafkaModule
  ],
  controllers: [AuthController],
  providers: [AuthService, CreateConsumer],
  exports: [AuthService],
})
export class AuthModule {}
