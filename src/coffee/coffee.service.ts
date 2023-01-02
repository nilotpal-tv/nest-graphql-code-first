import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import ObjectId from 'bson-objectid';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PrismaErrorCodes } from './enums/prisma-error-codes.enum';
import { Coffee } from './model/coffee.model';

@Injectable()
export class CoffeeService {
  constructor(private readonly prisma: PrismaService) {}

  private async isValidId(id: string) {
    if (!ObjectId.isValid(id)) throw new BadRequestException('Invalid id.');
  }

  async create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    try {
      const coffee = await this.prisma.coffees.create({
        data: createCoffeeDto,
      });
      return coffee;
    } catch (error) {
      if (error.code === PrismaErrorCodes.CONFLICT)
        throw new ConflictException('Coffee with same name already exist.');
    }
  }

  async update(updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee> {
    const { id, ...rest } = updateCoffeeDto;
    this.isValidId(id);

    return this.prisma.coffees.update({
      where: { id },
      data: rest,
    });
  }

  async delete(id: string): Promise<Coffee> {
    const coffee = await this.findById(id);

    if (!coffee)
      throw new NotFoundException(`Coffee with id ${id} doesn't exist.`);
    return this.prisma.coffees.delete({ where: { id } });
  }

  async findById(id: string): Promise<Coffee> {
    this.isValidId(id);
    const coffee = await this.prisma.coffees.findUnique({
      where: { id },
    });

    if (!coffee)
      throw new NotFoundException(`Coffee with id ${id} doesn't exist.`);
    return coffee;
  }

  async findByTitle(title: string): Promise<Coffee> {
    return this.prisma.coffees.findFirst({
      where: {
        title: {
          contains: title,
        },
      },
    });
  }

  async findAll(paginationDto: PaginationDto): Promise<Coffee[]> {
    const { limit, skip } = paginationDto;

    return this.prisma.coffees.findMany({
      skip: skip - 1,
      take: limit <= 50 ? limit : 50,
    });
  }
}
