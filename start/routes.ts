/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

// Health check route
router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Collection routes
router
  .group(() => {
    router.post('/', '#controllers/collection_controller.create')
    router.get('/', '#controllers/collection_controller.getAll')
    router.get('/search', '#controllers/collection_controller.search')
    router.get('/search-paged', '#controllers/collection_controller.getCollectionsPaged')
    router.get('/with-products', '#controllers/collection_controller.getWithProducts')
    router.get('/:id', '#controllers/collection_controller.getById')
    router.get('/:id/stats', '#controllers/collection_controller.getStats')
    router.put('/:id', '#controllers/collection_controller.update')
    router.delete('/:id', '#controllers/collection_controller.delete')
  })
  .prefix('/api/collections')

// Product routes
router
  .group(() => {
    router.post('/', '#controllers/product_controller.create')
    router.get('/', '#controllers/product_controller.getAll')
    router.get('/search', '#controllers/product_controller.search')
    router.get('/search-paged', '#controllers/product_controller.getProductByCriteriaPaged')
    router.get('/by-price-range', '#controllers/product_controller.getByPriceRange')
    router.get('/by-collection/:collectionId', '#controllers/product_controller.getByCollection')
    router.get('/:id', '#controllers/product_controller.getById')
    router.put('/:id', '#controllers/product_controller.update')
    router.delete('/:id', '#controllers/product_controller.delete')
  })
  .prefix('/api/products')
