import { test } from '@japa/runner'

test.group('Products API', (group) => {
  group.each.setup(async () => {
    // Setup test database or clean data
  })

  group.each.teardown(async () => {
    // Clean up test data
  })

  test('should create a new product', async ({ client }) => {
    // First create a collection
    const collectionResponse = await client.post('/api/collections').json({
      name: 'Test Collection',
      description: 'A test collection',
      images: JSON.stringify(['image1.jpg'])
    })

    const collectionId = collectionResponse.body().id

    const response = await client.post('/api/products').json({
      title: 'Test Product',
      description: 'A test product',
      image: 'product.jpg',
      dimensions: JSON.stringify({ width: 10, height: 20, depth: 5 }),
      price: 99.99,
      collectionId: collectionId
    })

    response.assertStatus(201)
    response.assertBodyContains({
      title: 'Test Product',
      price: 99.99,
      collectionId: collectionId
    })
  })

  test('should get all products', async ({ client }) => {
    const response = await client.get('/api/products')

    response.assertStatus(200)
    response.assertBodyContains([])
  })

  test('should get product by id', async ({ client }) => {
    // First create a collection and product
    const collectionResponse = await client.post('/api/collections').json({
      name: 'Test Collection',
      description: 'A test collection',
      images: JSON.stringify(['image1.jpg'])
    })

    const collectionId = collectionResponse.body().id

    const createResponse = await client.post('/api/products').json({
      title: 'Test Product',
      description: 'A test product',
      image: 'product.jpg',
      dimensions: JSON.stringify({ width: 10, height: 20, depth: 5 }),
      price: 99.99,
      collectionId: collectionId
    })

    const productId = createResponse.body().id

    const response = await client.get(`/api/products/${productId}`)

    response.assertStatus(200)
    response.assertBodyContains({
      id: productId,
      title: 'Test Product',
      price: 99.99
    })
  })

  test('should get products by collection', async ({ client }) => {
    // First create a collection and product
    const collectionResponse = await client.post('/api/collections').json({
      name: 'Test Collection',
      description: 'A test collection',
      images: JSON.stringify(['image1.jpg'])
    })

    const collectionId = collectionResponse.body().id

    await client.post('/api/products').json({
      title: 'Test Product',
      description: 'A test product',
      image: 'product.jpg',
      dimensions: JSON.stringify({ width: 10, height: 20, depth: 5 }),
      price: 99.99,
      collectionId: collectionId
    })

    const response = await client.get(`/api/products/by-collection/${collectionId}`)

    response.assertStatus(200)
    response.assertBodyContains([])
  })

  test('should search products by price range', async ({ client }) => {
    const response = await client.get('/api/products/by-price-range?minPrice=50&maxPrice=150')

    response.assertStatus(200)
    response.assertBodyContains([])
  })

  test('should search products with filters', async ({ client }) => {
    const response = await client.get('/api/products/search?minPrice=50&maxPrice=150&title=Test')

    response.assertStatus(200)
    response.assertBodyContains([])
  })

  test('should update a product', async ({ client }) => {
    // First create a collection and product
    const collectionResponse = await client.post('/api/collections').json({
      name: 'Test Collection',
      description: 'A test collection',
      images: JSON.stringify(['image1.jpg'])
    })

    const collectionId = collectionResponse.body().id

    const createResponse = await client.post('/api/products').json({
      title: 'Original Title',
      description: 'Original description',
      image: 'product.jpg',
      dimensions: JSON.stringify({ width: 10, height: 20, depth: 5 }),
      price: 99.99,
      collectionId: collectionId
    })

    const productId = createResponse.body().id

    const response = await client.put(`/api/products/${productId}`).json({
      title: 'Updated Title',
      description: 'Updated description',
      price: 149.99
    })

    response.assertStatus(200)
    response.assertBodyContains({
      id: productId,
      title: 'Updated Title',
      price: 149.99
    })
  })

  test('should delete a product', async ({ client }) => {
    // First create a collection and product
    const collectionResponse = await client.post('/api/collections').json({
      name: 'Test Collection',
      description: 'A test collection',
      images: JSON.stringify(['image1.jpg'])
    })

    const collectionId = collectionResponse.body().id

    const createResponse = await client.post('/api/products').json({
      title: 'To Delete',
      description: 'Will be deleted',
      image: 'product.jpg',
      dimensions: JSON.stringify({ width: 10, height: 20, depth: 5 }),
      price: 99.99,
      collectionId: collectionId
    })

    const productId = createResponse.body().id

    const response = await client.delete(`/api/products/${productId}`)

    response.assertStatus(200)
    response.assertBodyContains({
      message: 'Product deleted successfully'
    })
  })
}) 