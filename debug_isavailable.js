import axios from 'axios'

const BASE_URL = 'https://kikobackendmysql-production.up.railway.app'

async function debugIsAvailable() {
  try {
    console.log('🔍 Debugging isAvailable field...')

    // Get the current product
    const getResponse = await axios.get(`${BASE_URL}/api/products/1`)
    console.log('📝 Current product data:')
    console.log('   - ID:', getResponse.data.id)
    console.log('   - Title:', getResponse.data.title)
    console.log('   - isAvailable field exists:', 'isAvailable' in getResponse.data)
    console.log('   - isAvailable value:', getResponse.data.isAvailable)
    console.log('   - All fields:', Object.keys(getResponse.data))

    // Try to update with isAvailable
    const updateResponse = await axios.put(`${BASE_URL}/api/products/1`, {
      title: 'Debug Test Product',
      isAvailable: 15
    })

    console.log('📝 After update:')
    console.log('   - Title:', updateResponse.data.title)
    console.log('   - isAvailable field exists:', 'isAvailable' in updateResponse.data)
    console.log('   - isAvailable value:', updateResponse.data.isAvailable)
    console.log('   - All fields:', Object.keys(updateResponse.data))

  } catch (error) {
    console.error('❌ Debug failed:', error.response?.data || error.message)
  }
}

debugIsAvailable() 