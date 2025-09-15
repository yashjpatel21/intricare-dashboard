import React from 'react'

export default function SearchFilter({ q, setQ, categories = [], category, setCategory }){
  return (
    <div className="search-filter">
      <input placeholder="Search by title..." value={q} onChange={e => setQ(e.target.value)} />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="all">All</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
  )
}