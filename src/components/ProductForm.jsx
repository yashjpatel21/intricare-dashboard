import React, { useEffect, useState } from 'react'

export default function ProductForm({ initial = {}, onSubmit, onCancel }){
  const [form, setForm] = useState({ title: '', price: '', description: '', category: '', image: '' })

  useEffect(()=>{ setForm(prev => ({ ...prev, ...initial })) }, [initial])

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = e =>{
    e.preventDefault()
    if(!form.title || !form.price) return alert('Title and price required')
    onSubmit({ title: form.title, price: parseFloat(form.price), description: form.description, category: form.category || 'others', image: form.image || 'https://via.placeholder.com/150' })
  }

  return (
    <form className="product-form" onSubmit={submit}>
      <label>Title<input name="title" value={form.title} onChange={handle} /></label>
      <label>Price<input name="price" value={form.price} onChange={handle} /></label>
      <label>Category<input name="category" value={form.category} onChange={handle} /></label>
      <label>Image URL<input name="image" value={form.image} onChange={handle} /></label>
      <label>Description<textarea name="description" value={form.description} onChange={handle} /></label>
      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}