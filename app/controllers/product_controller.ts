import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ProductService from '#services/product_service'

@inject()
export default class ProductController {
  constructor(private productService: ProductService) {}

  async create({ request, response }: HttpContext) {
    try {
      const data = request.only([
        'title',
        'description',
        'image',
        'dimensions',
        'price',
        'collectionId',
      ])

      // Basic validation for base64 image format
      if (data.image && !this.isValidBase64Image(data.image)) {
        return response.badRequest({
          message: 'Invalid image format. Expected base64 encoded image.',
        })
      }

      const product = await this.productService.createProduct(data)
      return response.created(product)
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to create product',
        error: error.message,
      })
    }
  }

  private isValidBase64Image(imageString: string): boolean {
    // Check if it's a data URL with base64 image
    const base64ImageRegex = /^data:image\/(png|jpg|jpeg|gif|webp|svg\+xml);base64,/
    return base64ImageRegex.test(imageString) || imageString.startsWith('http')
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const { id } = params
      const data = request.only([
        'title',
        'description',
        'image',
        'dimensions',
        'price',
        'collectionId',
      ])

      // Basic validation for base64 image format
      if (data.image && !this.isValidBase64Image(data.image)) {
        return response.badRequest({
          message: 'Invalid image format. Expected base64 encoded image.',
        })
      }

      const product = await this.productService.updateProduct(Number.parseInt(id), data)
      return response.ok(product)
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to update product',
        error: error.message,
      })
    }
  }

  async delete({ params, response }: HttpContext) {
    try {
      const { id } = params
      const result = await this.productService.deleteProduct(Number.parseInt(id))
      return response.ok(result)
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to delete product',
        error: error.message,
      })
    }
  }

  async getAll({ response }: HttpContext) {
    try {
      const products = await this.productService.getAllProducts()
      return response.ok(products)
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to fetch products',
        error: error.message,
      })
    }
  }

  async getById({ params, response }: HttpContext) {
    try {
      const { id } = params
      const product = await this.productService.getProductById(Number.parseInt(id))
      return response.ok(product)
    } catch (error) {
      return response.notFound({
        message: 'Product not found',
        error: error.message,
      })
    }
  }

  async getByCollection({ params, response }: HttpContext) {
    try {
      const { collectionId } = params
      const products = await this.productService.getProductsByCollection(
        Number.parseInt(collectionId)
      )
      return response.ok(products)
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to fetch products by collection',
        error: error.message,
      })
    }
  }

  async search({ request, response }: HttpContext) {
    try {
      const { minPrice, maxPrice, collectionId, title } = request.qs()

      const options = {
        minPrice: minPrice ? Number.parseInt(minPrice) : undefined,
        maxPrice: maxPrice ? Number.parseInt(maxPrice) : undefined,
        collectionId: collectionId ? Number.parseInt(collectionId) : undefined,
        title: title as string,
      }

      const products = await this.productService.searchProducts(options)
      return response.ok(products)
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to search products',
        error: error.message,
      })
    }
  }

  async getByPriceRange({ request, response }: HttpContext) {
    try {
      const { minPrice, maxPrice } = request.qs()

      if (!minPrice || !maxPrice) {
        return response.badRequest({
          message: 'Both minPrice and maxPrice are required',
        })
      }

      const products = await this.productService.getProductsByPriceRange(
        Number.parseInt(minPrice),
        Number.parseInt(maxPrice)
      )
      return response.ok(products)
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to fetch products by price range',
        error: error.message,
      })
    }
  }
}
