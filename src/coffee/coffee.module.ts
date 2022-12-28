import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CoffeeResolver } from './coffee.resolver';
import { CoffeeService } from './coffee.service';

@Module({
  providers: [CoffeeService, CoffeeResolver, PrismaService],
})
export class CoffeeModule {}
