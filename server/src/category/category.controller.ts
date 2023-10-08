import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
// import { CategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('api/category')
export class CategoryController {
  constructor(private categoriesService: CategoryService) {}

  @Get()
  async fetchAllCategories(): Promise<Category> {
    const categories = await this.categoriesService.findAllCategories();

    return JSON.parse(categories);
  }

  @Get(':category_id')
  async fetchCategory(
    @Param('category_id') category_id: string,
  ): Promise<Category> {
    const categoryData = await this.categoriesService.findCategoryById(
      category_id,
    );

    return JSON.parse(categoryData);
  }

  @Post()
  async createCategory(
    @Body() createCategoryDto: CategoryDto,
  ): Promise<Category> {
    const categoryData = await this.categoriesService.createCategory(
      createCategoryDto,
    );

    return JSON.parse(categoryData);
  }

  @Put(':category_id')
  async updateCategory(
    @Param('category_id') category_id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const categoryData = await this.categoriesService.updateCategory(
      category_id,
      updateCategoryDto,
    );

    return JSON.parse(categoryData);
  }

  @Delete(':category_id')
  async deleteCategory(
    @Param('category_id') category_id: string,
  ): Promise<Category> {
    const categoryData = await this.categoriesService.destroyCategory(
      category_id,
    );

    return JSON.parse(categoryData);
  }
}
