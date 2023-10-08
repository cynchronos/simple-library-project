import { Injectable, Inject } from '@nestjs/common';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryModel: typeof Category,
  ) {}

  async findAllCategories(): Promise<string> {
    try {
      const categories: Category[] =
        await this.categoryModel.findAll<Category>();

      if (categories.length < 1) {
        const error: any = new Error();
        error.errorCode = 404;
        error.errorInfo = 'Kategori tidak ditemukan';

        throw error;
      }

      return JSON.stringify({
        code: 200,
        message: 'Categories Loaded',
        data: categories,
      });
    } catch (error) {
      return JSON.stringify({
        code: error.errorCode || 400,
        message: 'Error Load Categories',
        data: error.errorInfo || error,
      });
    }
  }

  async findCategoryById(category_id: string): Promise<string> {
    try {
      const categoryData: Category = await this.categoryModel.findOne({
        where: {
          category_id: category_id,
        },
      });

      if (!categoryData) {
        const error: any = new Error();
        error.errorCode = 404;
        error.errorInfo = 'Kategori tidak ditemukan';

        throw error;
      }

      return JSON.stringify({
        code: 200,
        message: 'Category Loaded',
        data: categoryData,
      });
    } catch (error) {
      return JSON.stringify({
        code: error.errorCode || 400,
        message: 'Error Load Category',
        data: error.errorInfo || error,
      });
    }
  }

  async createCategory(categoryData: any): Promise<string> {
    try {
      const categoryGetData: Category = await this.categoryModel.findOne({
        where: {
          category_id: categoryData.category_id,
        },
      });

      if (categoryGetData) {
        const error: any = new Error();
        error.errorCode = 409;
        error.errorInfo = 'Kategori sudah ada';

        throw error;
      }

      if (
        categoryData.category_id === '' ||
        categoryData.category_name === '' ||
        categoryData.category_description === ''
      ) {
        const error: any = new Error();
        error.errorCode = 400;
        error.errorInfo = 'Data tidak boleh kosong';

        throw error;
      }

      await this.categoryModel.create(categoryData);

      return JSON.stringify({
        code: 200,
        message: 'Category Created',
      });
    } catch (error) {
      return JSON.stringify({
        code: 400,
        message: 'Error Create Category',
        data: error.errorInfo || error,
      });
    }
  }

  async updateCategory(
    category_id: string,
    updatecategoryData: any,
  ): Promise<string> {
    try {
      const categoryData = await this.categoryModel.findOne({
        where: {
          category_id: category_id,
        },
      });

      if (!categoryData) {
        const error: any = new Error();
        error.errorCode = 404;
        error.errorInfo = 'Kategori tidak ditemukan';

        throw error;
      }

      categoryData.category_name =
        updatecategoryData.category_name || categoryData.category_name;

      categoryData.category_description =
        updatecategoryData.category_description ||
        categoryData.category_description;

      await categoryData.save();

      return JSON.stringify({
        code: 200,
        message: 'Category Updated',
        data: categoryData,
      });
    } catch (error) {
      return JSON.stringify({
        code: 400,
        message: 'Error Updating Category',
        data: error.errorInfo || error,
      });
    }
  }

  async destroyCategory(category_id: string): Promise<string> {
    try {
      const categoryData = await this.categoryModel.findOne({
        where: {
          category_id: category_id,
        },
      });

      if (!categoryData) {
        const error: any = new Error();
        error.errorCode = 404;
        error.errorInfo = 'Kategori tidak ditemukan';

        throw error;
      }

      await this.categoryModel.destroy({
        where: {
          category_id: categoryData.category_id,
        },
      });

      return JSON.stringify({
        code: 200,
        message: 'Category Deleted',
      });
    } catch (error) {
      return JSON.stringify({
        code: 400,
        message: 'Error Deleting Category',
        data: error.errorInfo || error,
      });
    }
  }
}
