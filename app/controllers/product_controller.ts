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

      // Parse and validate image data
      if (data.image) {
        const parsedImages = this.parseImageData(data.image)
        if (!this.isValidImageArray(parsedImages)) {
          return response.badRequest({
            message: 'Invalid image format. Expected array of base64 encoded images or URLs.',
          })
        }
        data.image = parsedImages
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

  private parseImageData(imageData: any): any[] {
    // If it's already an array, return it
    if (Array.isArray(imageData)) {
      return imageData
    }
    
    // If it's a string, try to parse it as JSON
    if (typeof imageData === 'string') {
      try {
        const parsed = JSON.parse(imageData)
        return Array.isArray(parsed) ? parsed : [parsed]
      } catch {
        // If it's not JSON, treat it as a single image
        return [imageData]
      }
    }
    
    // If it's a single object or other type, wrap it in an array
    return [imageData]
  }

  private isValidImageArray(images: any[]): boolean {
    if (!Array.isArray(images) || images.length === 0) {
      return false
    }
    
    return images.every((image) => {
      if (typeof image !== 'string') {
        return false
      }
      return this.isValidBase64Image(image)
    })
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const { id } = params
      
      // Validate that id is a valid number
      const productId = Number.parseInt(id)
      if (isNaN(productId)) {
        return response.badRequest({
          message: 'Invalid product ID. ID must be a valid number.',
        })
      }
      
      const data = request.only([
        'title',
        'description',
        'image',
        'dimensions',
        'price',
        'collectionId',
      ])

      // Parse and validate image data
      if (data.image) {
        const parsedImages = this.parseImageData(data.image)
        if (!this.isValidImageArray(parsedImages)) {
          return response.badRequest({
            message: 'Invalid image format. Expected array of base64 encoded images or URLs.',
          })
        }
        data.image = parsedImages
      }

      const product = await this.productService.updateProduct(productId, data)
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
      
      // Validate that id is a valid number
      const productId = Number.parseInt(id)
      if (isNaN(productId)) {
        return response.badRequest({
          message: 'Invalid product ID. ID must be a valid number.',
        })
      }
      
      const result = await this.productService.deleteProduct(productId)
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
      
      // Validate that id is a valid number
      const productId = Number.parseInt(id)
      if (isNaN(productId)) {
        return response.badRequest({
          message: 'Invalid product ID. ID must be a valid number.',
        })
      }
      
      const product = await this.productService.getProductById(productId)
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
      
      // Validate that collectionId is a valid number
      const collectionIdNum = Number.parseInt(collectionId)
      if (isNaN(collectionIdNum)) {
        return response.badRequest({
          message: 'Invalid collection ID. Collection ID must be a valid number.',
        })
      }
      
      const products = await this.productService.getProductsByCollection(collectionIdNum)
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
        minPrice: minPrice ? (() => {
          const parsed = Number.parseInt(minPrice)
          return isNaN(parsed) ? undefined : parsed
        })() : undefined,
        maxPrice: maxPrice ? (() => {
          const parsed = Number.parseInt(maxPrice)
          return isNaN(parsed) ? undefined : parsed
        })() : undefined,
        collectionId: collectionId ? (() => {
          const parsed = Number.parseInt(collectionId)
          return isNaN(parsed) ? undefined : parsed
        })() : undefined,
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

      // Validate that prices are valid numbers
      const minPriceNum = Number.parseInt(minPrice)
      const maxPriceNum = Number.parseInt(maxPrice)
      
      if (isNaN(minPriceNum) || isNaN(maxPriceNum)) {
        return response.badRequest({
          message: 'Both minPrice and maxPrice must be valid numbers',
        })
      }

      const products = await this.productService.getProductsByPriceRange(minPriceNum, maxPriceNum)
      return response.ok(products)
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to fetch products by price range',
        error: error.message,
      })
    }
  }

  async getProductByCriteriaPaged({ request, response }: HttpContext) {
    try {
      const { page, limit } = request.qs()

      const paginationOptions = {
        page: page ? (() => {
          const parsed = Number.parseInt(page)
          return isNaN(parsed) ? 1 : parsed
        })() : 1,
        limit: limit ? (() => {
          const parsed = Number.parseInt(limit)
          return isNaN(parsed) ? 3 : parsed
        })() : 3,
      }

      // Validate pagination parameters
      if (paginationOptions.page < 1) {
        return response.badRequest({
          message: 'Page must be greater than 0',
        })
      }

      if (paginationOptions.limit < 1 || paginationOptions.limit > 100) {
        return response.badRequest({
          message: 'Limit must be between 1 and 100',
        })
      }

      const result = await this.productService.getProductByCriteriaPaged(paginationOptions)
      return response.ok(result)
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to fetch products with pagination',
        error: error.message,
      })
    }
  }
}
