const axios = require('axios')

const BASE_URL = 'http://localhost:3333'

async function testAPI() {
  try {
    console.log('🚀 Starting API Tests...\n')

    // Test creating a collection
    console.log('📦 Testing Collection Creation...')
    const collectionResponse = await axios.post(`${BASE_URL}/api/collections`, {
      name: 'Test Collection',
      description: 'A test collection for API testing',
      images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800']
    })
    console.log('✅ Collection created:', collectionResponse.data.name)
    const collectionId = collectionResponse.data.id

    // Test creating a product with price
    console.log('\n🛍️ Testing Product Creation with Price...')
    const productResponse = await axios.post(`${BASE_URL}/api/products`, {
      title: 'Test Product',
      description: 'A test product with price',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
      dimensions: { width: 100, height: 50, depth: 75 },
      price: 299.99,
      collectionId: collectionId
    })
    console.log('✅ Product created:', productResponse.data.title, `($${productResponse.data.price})`)

    // Test creating a product without price
    console.log('\n🛍️ Testing Product Creation without Price...')
    const productNoPriceResponse = await axios.post(`${BASE_URL}/api/products`, {
      title: 'Test Product No Price',
      description: 'A test product without price',
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800',
      dimensions: { width: 80, height: 40, depth: 60 },
      collectionId: collectionId
    })
    console.log('✅ Product created without price:', productNoPriceResponse.data.title)

    // Test getting all products
    console.log('\n📋 Testing Get All Products...')
    const getAllResponse = await axios.get(`${BASE_URL}/api/products`)
    console.log('✅ Get all products:', getAllResponse.data.length, 'products found')

    // Test getting product by ID
    console.log('\n🔍 Testing Get Product by ID...')
    const productId = productResponse.data.id
    const getByIdResponse = await axios.get(`${BASE_URL}/api/products/${productId}`)
    console.log('✅ Get product by ID:', getByIdResponse.data.title)

    // Test updating a product
    console.log('\n✏️ Testing Product Update...')
    const updateResponse = await axios.put(`${BASE_URL}/api/products/${productId}`, {
      title: 'Updated Test Product',
      price: 399.99
    })
    console.log('✅ Product updated:', updateResponse.data.title, `($${updateResponse.data.price})`)

    // Test searching products
    console.log('\n🔍 Testing Product Search...')
    const searchResponse = await axios.get(`${BASE_URL}/api/products/search?title=Test&minPrice=200&maxPrice=500`)
    console.log('✅ Search products:', searchResponse.data.length, 'products found')

    // Test getting products by collection
    console.log('\n📦 Testing Get Products by Collection...')
    const getByCollectionResponse = await axios.get(`${BASE_URL}/api/products/by-collection/${collectionId}`)
    console.log('✅ Get products by collection:', getByCollectionResponse.data.length, 'products found')

    // Test getting products by price range
    console.log('\n💰 Testing Get Products by Price Range...')
    const getByPriceRangeResponse = await axios.get(`${BASE_URL}/api/products/by-price-range?minPrice=100&maxPrice=400`)
    console.log('✅ Get products by price range:', getByPriceRangeResponse.data.length, 'products found')

    // Test deleting a product
    console.log('\n🗑️ Testing Product Deletion...')
    const deleteResponse = await axios.delete(`${BASE_URL}/api/products/${productId}`)
    console.log('✅ Product deleted:', deleteResponse.data.message)

    console.log('\n🎉 All API tests completed successfully!')

  } catch (error) {
    console.error('❌ API Test Error:', error.response?.data || error.message)
  }
}

testAPI() 