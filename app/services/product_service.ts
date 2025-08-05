import Product from '#models/product'
import { inject } from '@adonisjs/core'

interface ProductData {
  title: string
  description: string
  image: string | object
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
      .preload('collection')
    return products
  }
}
