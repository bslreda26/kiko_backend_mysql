import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import CollectionService from '#services/collection_service'

@inject()
export default class CollectionController {
  constructor(private collectionService: CollectionService) {}

  async create({ request, response }: HttpContext) {
    try {
      const data = request.only(['name', 'description', 'images'])

      const collection = await this.collectionService.createCollection(data)
      return response.created(collection)
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to create collection',
        error: error.message,
      })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const { id } = params
      
      // Validate that id is a valid number
      const collectionId = Number.parseInt(id)
      if (isNaN(collectionId)) {
        return response.badRequest({
          message: 'Invalid collection ID. ID must be a valid number.',
        })
      }
      
      const data = request.only(['name', 'description', 'images'])

      const collection = await this.collectionService.updateCollection(collectionId, data)
      return response.ok(collection)
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to update collection',
        error: error.message,
      })
    }
  }

  async delete({ params, response }: HttpContext) {
    try {
      const { id } = params
      
      // Validate that id is a valid number
      const collectionId = Number.parseInt(id)
      if (isNaN(collectionId)) {
        return response.badRequest({
          message: 'Invalid collection ID. ID must be a valid number.',
        })
      }
      
      const result = await this.collectionService.deleteCollection(collectionId)
      return response.ok(result)
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to delete collection',
        error: error.message,
      })
    }
  }

  async getAll({ response }: HttpContext) {
    try {
      const collections = await this.collectionService.getAllCollections()
      return response.ok(collections)
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to fetch collections',
        error: error.message,
      })
    }
  }

  async getById({ params, response }: HttpContext) {
    try {
      const { id } = params
      
      // Validate that id is a valid number
      const collectionId = Number.parseInt(id)
      if (isNaN(collectionId)) {
        return response.badRequest({
          message: 'Invalid collection ID. ID must be a valid number.',
        })
      }
      
      const collection = await this.collectionService.getCollectionById(collectionId)
      return response.ok(collection)
    } catch (error) {
      return response.notFound({
        message: 'Collection not found',
        error: error.message,
      })
    }
  }

  async search({ request, response }: HttpContext) {
    try {
      const { name } = request.qs()

      const options = {
        name: name as string,
      }

      const collections = await this.collectionService.searchCollections(options)
      return response.ok(collections)
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to search collections',
        error: error.message,
      })
    }
  }

  async getWithProducts({ response }: HttpContext) {
    try {
      const collections = await this.collectionService.getCollectionsWithProducts()
      return response.ok(collections)
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to fetch collections with products',
        error: error.message,
      })
    }
  }

  async getStats({ params, response }: HttpContext) {
    try {
      const { id } = params
      
      // Validate that id is a valid number
      const collectionId = Number.parseInt(id)
      if (isNaN(collectionId)) {
        return response.badRequest({
          message: 'Invalid collection ID. ID must be a valid number.',
        })
      }
      
      const stats = await this.collectionService.getCollectionStats(collectionId)
      return response.ok(stats)
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to fetch collection stats',
        error: error.message,
      })
    }
  }

  async getCollectionsPaged({ request, response }: HttpContext) {
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

      const result = await this.collectionService.getCollectionsPaged(paginationOptions)
      return response.ok(result)
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to fetch collections with pagination',
        error: error.message,
      })
    }
  }
}
