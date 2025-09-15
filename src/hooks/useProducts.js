import { useEffect, useState, useMemo } from 'react'
import * as api from '../api/products'

export default function useProducts(){
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [q, setQ] = useState('')
  const [category, setCategory] = useState('all')

  useEffect(()=>{
    setLoading(true)
    Promise.all([api.fetchProducts(), api.fetchCategories()])
      .then(([prods, cats])=>{
        setProducts(prods)
        setCategories(cats)
      })
      .catch(e=> setError(e.message || 'Failed'))
      .finally(()=> setLoading(false))
  }, [])

  const addProduct = async (data) =>{
    setLoading(true)
    try{
      const created = await api.createProduct(data)
      setProducts(prev=> [created, ...prev])
      return created
    }finally{ setLoading(false) }
  }

  const editProduct = async (id, data) =>{
    setLoading(true)
    try{
      const updated = await api.updateProduct(id, data)
      setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p))
      return updated
    }finally{ setLoading(false) }
  }

  const deleteProduct = async (id) =>{
    setLoading(true)
    try{
      await api.deleteProductApi(id)
      setProducts(prev => prev.filter(p => p.id !== id))
    }finally{ setLoading(false) }
  }

  const filtered = useMemo(()=>{
    let res = products
    if(category && category !== 'all') res = res.filter(p => p.category === category)
    if(q) res = res.filter(p => p.title.toLowerCase().includes(q.toLowerCase()))
    return res
  }, [products, q, category])

  return { products: filtered, rawProducts: products, categories, loading, error, q, setQ, category, setCategory, addProduct, editProduct, deleteProduct, refresh: async ()=>{ setLoading(true); try{ const prods = await api.fetchProducts(); setProducts(prods)}finally{ setLoading(false)} } }
}