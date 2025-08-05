const axios = require('axios')

const BASE_URL = 'http://localhost:3333'

async function testIsAvailableUpdate() {
  try {
    console.log('🔍 Testing isAvailable Field Update...')

    // First create a collection
    const collectionResponse = await axios.post(`${BASE_URL}/api/collections`, {
      name: 'Test Collection for isAvailable',
      description: 'A test collection for isAvailable updates',
      images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800']
    })
    const collectionId = collectionResponse.data.id

    // Create a product first
    const createResponse = await axios.post(`${BASE_URL}/api/products`, {
      title: 'Test Product for isAvailable',
      description: 'Test description',
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800',
      dimensions: { width: 100, height: 50, depth: 75 },
      price: 199.99,
      collectionId: collectionId,
      isAvailable: 5
    })

    const productId = createResponse.data.id
    console.log('✅ Product created with ID:', productId)
    console.log('📝 Initial isAvailable:', createResponse.data.isAvailable)

    // Now update the product with different isAvailable values
    const updateResponse = await axios.put(`${BASE_URL}/api/products/${productId}`, {
      title: 'Updated Product Title',
      description: 'Updated product description',
      price: 299.99,
      isAvailable: 10
    })

    console.log('✅ Product updated successfully!')
    console.log('📝 Updated product details:')
    console.log('   - Title:', updateResponse.data.title)
    console.log('   - Description:', updateResponse.data.description)
    console.log('   - Price:', updateResponse.data.price)
    console.log('   - isAvailable:', updateResponse.data.isAvailable)

    // Test another update
    const updateResponse2 = await axios.put(`${BASE_URL}/api/products/${productId}`, {
      isAvailable: 0
    })

    console.log('✅ Second update successful!')
    console.log('📝 Final isAvailable:', updateResponse2.data.isAvailable)

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message)
  }
}

testIsAvailableUpdate() 