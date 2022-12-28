import { Module } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CoffeeResolver } from './coffee.resolver';

@Module({
  providers: [CoffeeService, CoffeeResolver],
})
export class CoffeeModule {}
