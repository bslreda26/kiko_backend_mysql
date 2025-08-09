/* eslint-disable prettier/prettier */
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Collection from './collection.js'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column({
    serialize: (value: string) => {
      if (!value) return []
      try {
        const parsed = JSON.parse(value)
        return Array.isArray(parsed) ? parsed : [parsed]
      } catch {
        return [value]
      }
    },
    prepare: (value: any) => {
      if (Array.isArray(value)) {
        return JSON.stringify(value)
      }
      if (typeof value === 'object' && value !== null) {
        return JSON.stringify([value])
      }
      if (value) {
        return JSON.stringify([value])
      }
      return JSON.stringify([])
    }
  })
  declare image: string[] | object[]

  @column({
    serialize: (value: string) => {
      if (!value) return null
      try {
        return JSON.parse(value) 
      } catch {
        return value
      }
    },
    prepare: (value: any) => {
      if (typeof value === 'object' && value !== null) {
        return JSON.stringify(value)
      }
      return value
    }
  })
  declare dimensions: object // JSON object with width, height, depth

  @column()
  declare price: number

  @column({ columnName: 'collection_id' })
  declare collectionId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Collection)
  declare collection: BelongsTo<typeof Collection>
}
