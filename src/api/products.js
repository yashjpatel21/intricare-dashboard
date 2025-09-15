import axios from 'axios'
const API_BASE = 'https://fakestoreapi.com'
const api = axios.create({ baseURL: API_BASE, headers: { 'Content-Type': 'application/json' } })
export const fetchProducts = () => api.get('/products').then(r => r.data)
export const createProduct = payload => api.post('/products', payload).then(r => r.data)
export const updateProduct = (id, payload) => api.put(`/products/${id}`, payload).then(r => r.data)
export const deleteProductApi = id => api.delete(`/products/${id}`).then(r => r.data)
export const fetchCategories = () => api.get('/products/categories').then(r => r.data)
export const fetchProductsByCategory = cat => api.get(`/products/category/${cat}`).then(r => r.data)