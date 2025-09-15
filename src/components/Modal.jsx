import React from 'react'

export default function Modal({ open, children, onClose }){
  if(!open) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e=>e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  )
}