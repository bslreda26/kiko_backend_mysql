import { test } from '@japa/runner'

test.group('Collections API', (group) => {
  group.each.setup(async () => {
    // Setup test database or clean data
  })

  group.each.teardown(async () => {
    // Clean up test data
  })

  test('should create a new collection', async ({ client }) => {
    const response = await client.post('/api/collections').json({
      name: 'Test Collection',
      description: 'A test collection',
      images: JSON.stringify(['image1.jpg', 'image2.jpg'])
    })

    response.assertStatus(201)
    response.assertBodyContains({
      name: 'Test Collection',
      description: 'A test collection'
    })
  })

  test('should get all collections', async ({ client }) => {
    const response = await client.get('/api/collections')

    response.assertStatus(200)
    response.assertBodyIsArray()
  })

  test('should get collection by id', async ({ client }) => {
    // First create a collection
    const createResponse = await client.post('/api/collections').json({
      name: 'Test Collection',
      description: 'A test collection',
      images: JSON.stringify(['image1.jpg'])
    })

    const collectionId = createResponse.body().id

    // Then get it by id
    const response = await client.get(`/api/collections/${collectionId}`)

    response.assertStatus(200)
    response.assertBodyContains({
      id: collectionId,
      name: 'Test Collection'
    })
  })

  test('should search collections by name', async ({ client }) => {
    const response = await client.get('/api/collections/search?name=Test')

    response.assertStatus(200)
    response.assertBodyIsArray()
  })

  test('should update a collection', async ({ client }) => {
    // First create a collection
    const createResponse = await client.post('/api/collections').json({
      name: 'Original Name',
      description: 'Original description',
      images: JSON.stringify(['image1.jpg'])
    })

    const collectionId = createResponse.body().id

    // Then update it
    const response = await client.put(`/api/collections/${collectionId}`).json({
      name: 'Updated Name',
      description: 'Updated description'
    })

    response.assertStatus(200)
    response.assertBodyContains({
      id: collectionId,
      name: 'Updated Name',
      description: 'Updated description'
    })
  })

  test('should delete a collection', async ({ client }) => {
    // First create a collection
    const createResponse = await client.post('/api/collections').json({
      name: 'To Delete',
      description: 'Will be deleted',
      images: JSON.stringify(['image1.jpg'])
    })

    const collectionId = createResponse.body().id

    // Then delete it
    const response = await client.delete(`/api/collections/${collectionId}`)

    response.assertStatus(200)
    response.assertBodyContains({
      message: 'Collection deleted successfully'
    })
  })
}) 