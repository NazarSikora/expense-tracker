import { useState } from 'react'
import api from '../api'

export default function ExpenseForm({ categories, onCreated }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !amount) return
    setLoading(true)
    try {
      await api.post('/expenses/', {
        title,
        amount: parseFloat(amount),
        category_id: categoryId ? parseInt(categoryId) : null,
        date: date ? new Date(date).toISOString() : null,
      })
      setTitle('')
      setAmount('')
      setCategoryId('')
      setDate('')
      onCreated()
    } catch {
      alert('Помилка створення витрати')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <input
        type="text"
        placeholder="Назва витрати"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        required
      />
      <input
        type="number"
        placeholder="Сума (₴)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        required
        min="0"
        step="0.01"
      />
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <option value="">Без категорії</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="sm:col-span-2 bg-green-600 text-white py-2 rounded-lg text-sm hover:bg-green-700 transition disabled:opacity-50 font-medium"
      >
        {loading ? 'Збереження...' : '+ Додати витрату'}
      </button>
    </form>
  )
}