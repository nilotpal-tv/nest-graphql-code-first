import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCoffeeDto } from './dto/coffee.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeeService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(paginationDto: PaginationDto): Promise<Coffee[]> {
    const { limit, skip } = paginationDto;
    return this.prisma.coffees.findMany({
      skip,
      take: limit <= 50 ? limit : 50,
    });
  }

  async createCoffee(createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    try {
      const coffee = await this.prisma.coffees.create({
        data: createCoffeeDto,
      });
      return coffee;
    } catch (error) {
      if (error.code === 'P2002')
        throw new ConflictException('Coffee with same name already exist.');
    }
  }
}
