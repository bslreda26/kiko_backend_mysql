const axios = require('axios')

const BASE_URL = 'http://localhost:3333'

async function testProductUpdate() {
  try {
    console.log('🔍 Testing Product Update...')

    // First create a collection
    const collectionResponse = await axios.post(`${BASE_URL}/api/collections`, {
      name: 'Test Collection for Update',
      description: 'A test collection for product updates',
      images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800']
    })
    const collectionId = collectionResponse.body().id

    // Create a product first
    const createResponse = await axios.post(`${BASE_URL}/api/products`, {
      title: 'Original Product',
      description: 'Original description',
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800',
      dimensions: { width: 100, height: 50, depth: 75 },
      price: 199.99,
      collectionId: collectionId
    })

    const productId = createResponse.data.id
    console.log('✅ Product created with ID:', productId)

    // Now update the product
    const updateResponse = await axios.put(`${BASE_URL}/api/products/${productId}`, {
      title: 'Updated Product Title',
      description: 'Updated product description',
      price: 299.99
    })

    console.log('✅ Product updated successfully!')
    console.log('📝 Updated product details:')
    console.log('   - Title:', updateResponse.data.title)
    console.log('   - Description:', updateResponse.data.description)
    console.log('   - Price:', updateResponse.data.price)

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message)
  }
}

testProductUpdate() 