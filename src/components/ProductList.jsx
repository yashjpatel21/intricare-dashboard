import React from 'react'

export default function ProductList({ products = [], onEdit, onDelete }){
  return (
    <div className="product-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td className="title-cell">{p.title}</td>
              <td>{p.price}</td>
              <td>{p.category}</td>
              <td>
                <button onClick={()=> onEdit(p)}>Edit</button>
                <button onClick={()=> onDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {products.length === 0 && <div className="empty">No products found</div>}
    </div>
  )
}