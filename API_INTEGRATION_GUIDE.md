# KikoBackend API Integration Guide

## **API Base URL:**
```
http://localhost:3333
```

## **Module Structure for Frontend Integration:**

### **1. API Service Module**
Create `services/api.ts`:

```typescript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3333';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

### **2. Collections API Module**
Create `services/collectionsApi.ts`:

```typescript
import api from './api';

export interface Collection {
  id: number;
  name: string;
  description: string;
  images: string;
  createdAt: string;
  updatedAt: string;
  products?: Product[];
}

export interface CreateCollectionData {
  name: string;
  description: string;
  images: string;
}

export interface UpdateCollectionData {
  name?: string;
  description?: string;
  images?: string;
}

export const collectionsApi = {
  // Get all collections
  getAll: () => api.get<Collection[]>('/api/collections'),
  
  // Get collection by ID
  getById: (id: number) => api.get<Collection>(`/api/collections/${id}`),
  
  // Create collection
  create: (data: CreateCollectionData) => api.post<Collection>('/api/collections', data),
  
  // Update collection
  update: (id: number, data: UpdateCollectionData) => 
    api.put<Collection>(`/api/collections/${id}`, data),
  
  // Delete collection
  delete: (id: number) => api.delete(`/api/collections/${id}`),
  
  // Search collections
  search: (name: string) => api.get<Collection[]>(`/api/collections/search?name=${name}`),
  
  // Get collections with products
  getWithProducts: () => api.get<Collection[]>('/api/collections/with-products'),
  
  // Get collection stats
  getStats: (id: number) => api.get(`/api/collections/${id}/stats`),
};
```

### **3. Products API Module**
Create `services/productsApi.ts`:

```typescript
import api from './api';

export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  dimensions: string;
  price: number;
  collectionId: number;
  createdAt: string;
  updatedAt: string;
  collection?: Collection;
}

export interface CreateProductData {
  title: string;
  description: string;
  image: string;
  dimensions: string;
  price: number;
  collectionId: number;
}

export interface UpdateProductData {
  title?: string;
  description?: string;
  image?: string;
  dimensions?: string;
  price?: number;
  collectionId?: number;
}

export interface SearchProductParams {
  minPrice?: number;
  maxPrice?: number;
  collectionId?: number;
  title?: string;
}

export const productsApi = {
  // Get all products
  getAll: () => api.get<Product[]>('/api/products'),
  
  // Get product by ID
  getById: (id: number) => api.get<Product>(`/api/products/${id}`),
  
  // Create product
  create: (data: CreateProductData) => api.post<Product>('/api/products', data),
  
  // Update product
  update: (id: number, data: UpdateProductData) => 
    api.put<Product>(`/api/products/${id}`, data),
  
  // Delete product
  delete: (id: number) => api.delete(`/api/products/${id}`),
  
  // Search products
  search: (params: SearchProductParams) => {
    const queryParams = new URLSearchParams();
    if (params.minPrice) queryParams.append('minPrice', params.minPrice.toString());
    if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
    if (params.collectionId) queryParams.append('collectionId', params.collectionId.toString());
    if (params.title) queryParams.append('title', params.title);
    
    return api.get<Product[]>(`/api/products/search?${queryParams}`);
  },
  
  // Get products by price range
  getByPriceRange: (minPrice: number, maxPrice: number) => 
    api.get<Product[]>(`/api/products/by-price-range?minPrice=${minPrice}&maxPrice=${maxPrice}`),
  
  // Get products by collection
  getByCollection: (collectionId: number) => 
    api.get<Product[]>(`/api/products/by-collection/${collectionId}`),
};
```

### **4. React Query Hooks**
Create `hooks/useApi.ts`:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collectionsApi, CollectionsApi } from '../services/collectionsApi';
import { productsApi, ProductsApi } from '../services/productsApi';

// Collections hooks
export const useCollections = () => {
  return useQuery({
    queryKey: ['collections'],
    queryFn: () => collectionsApi.getAll(),
  });
};

export const useCollection = (id: number) => {
  return useQuery({
    queryKey: ['collection', id],
    queryFn: () => collectionsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateCollection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: collectionsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });
};

export const useUpdateCollection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCollectionData }) =>
      collectionsApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      queryClient.invalidateQueries({ queryKey: ['collection', id] });
    },
  });
};

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: collectionsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });
};

// Products hooks
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productsApi.getAll(),
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: productsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProductData }) =>
      productsApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', id] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: productsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useSearchProducts = (params: SearchProductParams) => {
  return useQuery({
    queryKey: ['products', 'search', params],
    queryFn: () => productsApi.search(params),
    enabled: Object.keys(params).length > 0,
  });
};
```

### **5. Admin Panel CRUD Components**

#### **Collections Management:**
Create `components/admin/CollectionsList.tsx`:

```typescript
import React from 'react';
import { useCollections, useDeleteCollection } from '../../hooks/useApi';

export const CollectionsList = () => {
  const { data: collections, isLoading, error } = useCollections();
  const deleteCollection = useDeleteCollection();

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this collection?')) {
      deleteCollection.mutate(id);
    }
  };

  if (isLoading) return <div>Loading collections...</div>;
  if (error) return <div>Error loading collections</div>;

  return (
    <div className="collections-list">
      <h2>Collections</h2>
      <div className="grid">
        {collections?.data.map((collection) => (
          <div key={collection.id} className="collection-card">
            <h3>{collection.name}</h3>
            <p>{collection.description}</p>
            <div className="actions">
              <button onClick={() => handleEdit(collection.id)}>Edit</button>
              <button onClick={() => handleDelete(collection.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

#### **Products Management:**
Create `components/admin/ProductsList.tsx`:

```typescript
import React from 'react';
import { useProducts, useDeleteProduct } from '../../hooks/useApi';

export const ProductsList = () => {
  const { data: products, isLoading, error } = useProducts();
  const deleteProduct = useDeleteProduct();

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct.mutate(id);
    }
  };

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="products-list">
      <h2>Products</h2>
      <div className="grid">
        {products?.data.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p className="price">${product.price}</p>
            <div className="actions">
              <button onClick={() => handleEdit(product.id)}>Edit</button>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### **6. Form Components**

#### **Collection Form:**
Create `components/admin/CollectionForm.tsx`:

```typescript
import React from 'react';
import { useForm } from 'react-hook-form';
import { useCreateCollection, useUpdateCollection } from '../../hooks/useApi';

interface CollectionFormProps {
  collection?: Collection;
  onSuccess?: () => void;
}

export const CollectionForm = ({ collection, onSuccess }: CollectionFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const createCollection = useCreateCollection();
  const updateCollection = useUpdateCollection();

  const onSubmit = (data: CreateCollectionData) => {
    if (collection) {
      updateCollection.mutate({ id: collection.id, data });
    } else {
      createCollection.mutate(data);
    }
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input 
          {...register('name', { required: true })} 
          defaultValue={collection?.name}
        />
        {errors.name && <span>Name is required</span>}
      </div>
      
      <div>
        <label>Description:</label>
        <textarea 
          {...register('description')} 
          defaultValue={collection?.description}
        />
      </div>
      
      <div>
        <label>Images (JSON array):</label>
        <input 
          {...register('images')} 
          defaultValue={collection?.images}
          placeholder='["image1.jpg", "image2.jpg"]'
        />
      </div>
      
      <button type="submit">
        {collection ? 'Update Collection' : 'Create Collection'}
      </button>
    </form>
  );
};
```

#### **Product Form:**
Create `components/admin/ProductForm.tsx`:

```typescript
import React from 'react';
import { useForm } from 'react-hook-form';
import { useCreateProduct, useUpdateProduct } from '../../hooks/useApi';

interface ProductFormProps {
  product?: Product;
  collections: Collection[];
  onSuccess?: () => void;
}

export const ProductForm = ({ product, collections, onSuccess }: ProductFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const onSubmit = (data: CreateProductData) => {
    if (product) {
      updateProduct.mutate({ id: product.id, data });
    } else {
      createProduct.mutate(data);
    }
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Title:</label>
        <input 
          {...register('title', { required: true })} 
          defaultValue={product?.title}
        />
        {errors.title && <span>Title is required</span>}
      </div>
      
      <div>
        <label>Description:</label>
        <textarea 
          {...register('description')} 
          defaultValue={product?.description}
        />
      </div>
      
      <div>
        <label>Image URL:</label>
        <input 
          {...register('image')} 
          defaultValue={product?.image}
        />
      </div>
      
      <div>
        <label>Dimensions (JSON):</label>
        <input 
          {...register('dimensions')} 
          defaultValue={product?.dimensions}
          placeholder='{"width": 100, "height": 50, "depth": 75}'
        />
      </div>
      
      <div>
        <label>Price:</label>
        <input 
          type="number" 
          step="0.01"
          {...register('price', { required: true, min: 0 })} 
          defaultValue={product?.price}
        />
        {errors.price && <span>Valid price is required</span>}
      </div>
      
      <div>
        <label>Collection:</label>
        <select {...register('collectionId', { required: true })} defaultValue={product?.collectionId}>
          <option value="">Select a collection</option>
          {collections.map(collection => (
            <option key={collection.id} value={collection.id}>
              {collection.name}
            </option>
          ))}
        </select>
        {errors.collectionId && <span>Collection is required</span>}
      </div>
      
      <button type="submit">
        {product ? 'Update Product' : 'Create Product'}
      </button>
    </form>
  );
};
```

## **Usage in Admin Panel:**

```typescript
// In your admin dashboard
import { CollectionsList } from './components/admin/CollectionsList';
import { ProductsList } from './components/admin/ProductsList';
import { CollectionForm } from './components/admin/CollectionForm';
import { ProductForm } from './components/admin/ProductForm';

// Use the components in your admin panel
<CollectionsList />
<ProductsList />
<CollectionForm />
<ProductForm collections={collections} />
```

## **Error Handling:**
All API calls return standard error responses:
```typescript
{
  message: "Error description",
  error: "Detailed error message"
}
```

This structure provides complete CRUD operations for your admin panel with proper TypeScript types and React Query integration! 