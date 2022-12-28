import { ParseIntPipe } from '@nestjs/common';
import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { CoffeeService } from './coffee.service';
import { CreateCoffeeDto } from './dto/coffee.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Coffee } from './entities/coffee.entity';

@Resolver()
export class CoffeeResolver {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Query(() => [Coffee], { name: 'coffees' })
  async findAll(
    @Args('paginationInput', { type: () => PaginationDto })
    paginationInput: PaginationDto,
  ): Promise<Coffee[]> {
    const coffees = await this.coffeeService.findAll(paginationInput);
    return coffees;
  }

  @Query(() => Coffee, { name: 'coffeeByTitle', nullable: true })
  async findByTitle(@Args('title') title: string): Promise<Coffee> {
    return null;
  }

  @Query(() => Coffee, { name: 'coffeeById', nullable: true })
  async findById(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Coffee> {
    return null;
  }

  @Mutation(() => Coffee)
  async createCoffee(
    @Args('createCoffeeInput', { type: () => CreateCoffeeDto })
    createCoffeeInput: CreateCoffeeDto,
  ): Promise<Coffee> {
    const coffee = await this.coffeeService.createCoffee(createCoffeeInput);
    return coffee;
  }
}
