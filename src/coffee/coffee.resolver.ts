import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoffeeService } from './coffee.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
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
    return await this.coffeeService.findByTitle(title);
  }

  @Query(() => Coffee, { name: 'coffeeById', nullable: true })
  async findById(@Args('id') id: string): Promise<Coffee> {
    return await this.coffeeService.findById(id);
  }

  @Mutation(() => Coffee)
  async createCoffee(
    @Args('createCoffeeInput', { type: () => CreateCoffeeDto })
    createCoffeeInput: CreateCoffeeDto,
  ): Promise<Coffee> {
    const coffee = await this.coffeeService.create(createCoffeeInput);
    return coffee;
  }

  @Mutation(() => Coffee)
  async updateCoffee(
    @Args('updateCoffeeInput', { type: () => UpdateCoffeeDto })
    updateCoffeeDto: UpdateCoffeeDto,
  ): Promise<Coffee> {
    return await this.coffeeService.update(updateCoffeeDto);
  }

  @Mutation(() => Coffee)
  async deleteCoffee(
    @Args('id')
    id: string,
  ): Promise<Coffee> {
    return await this.coffeeService.delete(id);
  }
}
