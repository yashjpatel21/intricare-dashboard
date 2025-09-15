import React, { useState } from 'react'
import useProducts from '../hooks/useProducts'
import ProductList from '../components/ProductList'
import ProductForm from '../components/ProductForm'
import SearchFilter from '../components/SearchFilter'
import Modal from '../components/Modal'
import Loader from '../components/Loader'

export default function Dashboard(){
  const { products, categories, loading, error, q, setQ, category, setCategory, addProduct, editProduct, deleteProduct } = useProducts()
  const [showAdd, setShowAdd] = useState(false)
  const [editing, setEditing] = useState(null)

  return (
    <div className="dashboard">
      <header className="top">
        <h1>Product Management</h1>
        <div className="top-actions">
          <button onClick={() => setShowAdd(true)}>+ Add Product</button>
        </div>
      </header>

      <SearchFilter q={q} setQ={setQ} categories={categories} category={category} setCategory={setCategory} />

      {loading && <Loader />}
      {error && <div className="error">{error}</div>}

      <ProductList products={products} onEdit={(p)=>setEditing(p)} onDelete={(id)=>{ if(window.confirm('Delete product?')) deleteProduct(id) }} />

      <Modal open={showAdd} onClose={()=>setShowAdd(false)}>
        <h2>Add Product</h2>
        <ProductForm onSubmit={async (data)=>{ await addProduct(data); setShowAdd(false) }} onCancel={()=>setShowAdd(false)} />
      </Modal>

      <Modal open={!!editing} onClose={()=>setEditing(null)}>
        <h2>Edit Product</h2>
        <ProductForm initial={editing} onSubmit={async (data)=>{ await editProduct(editing.id, data); setEditing(null) }} onCancel={()=>setEditing(null)} />
      </Modal>
    </div>
  )
}