import Product from '#models/product'
import { inject } from '@adonisjs/core'

interface ProductData {
  title: string
  description: string
  image: string[] | object[]
  dimensions: object
  price?: number
  collectionId: number
}

interface SearchOptions {
  minPrice?: number
  maxPrice?: number
  collectionId?: number
  title?: string
}

interface PaginationOptions {
  page?: number
  limit?: number
}

interface PagedResult<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

@inject()
export default class ProductService {
  async createProduct(data: ProductData) {
    const product = await Product.create(data)

    // Reload product with collection
    await product.load('collection')
    return product
  }

  async updateProduct(id: number, data: Partial<ProductData>) {
    const product = await Product.findOrFail(id)

    product.merge(data)
    await product.save()

    await product.load('collection')
    return product
  }

  async deleteProduct(id: number) {
    const product = await Product.findOrFail(id)
    await product.delete()
    return { message: 'Product deleted successfully' }
  }

  async getAllProducts() {
    const products = await Product.query().preload('collection')
    return products
  }

  async getProductById(id: number) {
    const product = await Product.query().where('id', id).preload('collection').firstOrFail()
    return product
  }

  async getProductsByCollection(collectionId: number) {
    const products = await Product.query()
      .where('collection_id', collectionId)
      .preload('collection')
    return products
  }

  async searchProducts(options: SearchOptions) {
    const query = Product.query().preload('collection')

    if (options.minPrice !== undefined) {
      query.where('price', '>=', options.minPrice)
    }

    if (options.maxPrice !== undefined) {
      query.where('price', '<=', options.maxPrice)
    }

    if (options.collectionId) {
      query.where('collection_id', options.collectionId)
    }

    if (options.title) {
      query.whereILike('title', `%${options.title}%`)
    }

    return await query
  }

  async getProductsByPriceRange(minPrice: number, maxPrice: number) {
    const products = await Product.query()
      .where('price', '>=', minPrice)
      .where('price', '<=', maxPrice)
    return products
  }

  async getProductByCriteriaPaged(
    paginationOptions: PaginationOptions = {}
  ): Promise<PagedResult<any>> {
    const page = paginationOptions.page || 1
    const limit = paginationOptions.limit || 3
    const offset = (page - 1) * limit

    // Build the query
    const query = Product.query()

    // Get total count for pagination
    const totalQuery = query.clone()
    const total = await totalQuery.count('* as total')
    const totalCount = total[0].$extras.total

    // Apply pagination
    query.offset(offset).limit(limit)

    // Execute the query
    const data = await query

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limit)
    const hasNext = page < totalPages
    const hasPrev = page > 1

    return {
      data,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages,
        hasNext,
        hasPrev,
      },
    }
  }
}
