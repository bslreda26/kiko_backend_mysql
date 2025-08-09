import Collection from '#models/collection'
import { inject } from '@adonisjs/core'

interface CollectionData {
  name: string
  description: string
  images: string[] // Array of image URLs
}

interface SearchOptions {
  name?: string
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
export default class CollectionService {
  async createCollection(data: CollectionData) {
    const collection = await Collection.create(data)

    // Reload collection with products
    await collection.load('products')
    return collection
  }

  async updateCollection(id: number, data: Partial<CollectionData>) {
    const collection = await Collection.findOrFail(id)

    collection.merge(data)
    await collection.save()

    await collection.load('products')
    return collection
  }

  async deleteCollection(id: number) {
    const collection = await Collection.findOrFail(id)
    await collection.delete()
    return { message: 'Collection deleted successfully' }
  }

  async getAllCollections() {
    const collections = await Collection.query().preload('products')
    return collections
  }

  async getCollectionById(id: number) {
    const collection = await Collection.query().where('id', id).preload('products').firstOrFail()
    return collection
  }

  async searchCollections(options: SearchOptions) {
    const query = Collection.query().preload('products')

    if (options.name) {
      query.whereILike('name', `%${options.name}%`)
    }

    return await query
  }

  async getCollectionsWithProducts() {
    const collections = await Collection.query()
      .preload('products')
      .whereHas('products', (query) => {
        query.whereNotNull('id')
      })
    return collections
  }

  async getCollectionStats(id: number) {
    const collection = await Collection.query().where('id', id).preload('products').firstOrFail()

    const totalProducts = collection.products.length
    const totalValue = collection.products.reduce((sum, product) => sum + (product.price ?? 0), 0)
    const averagePrice = totalProducts > 0 ? totalValue / totalProducts : 0

    return {
      collection,
      stats: {
        totalProducts,
        totalValue,
        averagePrice,
      },
    }
  }

  async getCollectionsPaged(paginationOptions: PaginationOptions = {}): Promise<PagedResult<any>> {
    const page = paginationOptions.page || 1
    const limit = paginationOptions.limit || 3
    const offset = (page - 1) * limit

    // Get total count for pagination
    const total = await Collection.query().count('* as total')
    const totalCount = total[0].$extras.total

    // Build the query with pagination
    const data = await Collection.query().offset(offset).limit(limit).preload('products')

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
