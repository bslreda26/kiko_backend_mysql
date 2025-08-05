import axios from 'axios'

const BASE_URL = 'https://kikobackendmysql-production.up.railway.app'

async function checkDatabase() {
  try {
    console.log('🔍 Checking database structure...')

    // Get all products to see if any have isAvailable
    const getAllResponse = await axios.get(`${BASE_URL}/api/products`)
    console.log('📝 All products response:')
    console.log('   - Number of products:', getAllResponse.data.length)
    
    if (getAllResponse.data.length > 0) {
      const firstProduct = getAllResponse.data[0]
      console.log('   - First product fields:', Object.keys(firstProduct))
      console.log('   - First product has isAvailable:', 'isAvailable' in firstProduct)
    }

    // Try to create a new product with isAvailable
    const createResponse = await axios.post(`${BASE_URL}/api/products`, {
      title: 'Test Product with isAvailable',
      description: 'Test description',
      image: 'https://example.com/test.jpg',
      dimensions: { width: 100, height: 50, depth: 75 },
      price: 199.99,
      collectionId: 1,
      isAvailable: 5
    })

    console.log('📝 Created product:')
    console.log('   - ID:', createResponse.data.id)
    console.log('   - Title:', createResponse.data.title)
    console.log('   - Has isAvailable:', 'isAvailable' in createResponse.data)
    console.log('   - isAvailable value:', createResponse.data.isAvailable)
    console.log('   - All fields:', Object.keys(createResponse.data))

  } catch (error) {
    console.error('❌ Check failed:', error.response?.data || error.message)
  }
}

checkDatabase() 