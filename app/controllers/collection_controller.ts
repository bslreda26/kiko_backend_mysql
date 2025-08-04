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
      const data = request.only(['name', 'description', 'images'])

      const collection = await this.collectionService.updateCollection(Number.parseInt(id), data)
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
      const result = await this.collectionService.deleteCollection(Number.parseInt(id))
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
      const collection = await this.collectionService.getCollectionById(Number.parseInt(id))
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
      const stats = await this.collectionService.getCollectionStats(Number.parseInt(id))
      return response.ok(stats)
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to fetch collection stats',
        error: error.message,
      })
    }
  }
}
