import { useState, useEffect, useCallback } from 'react'
import api from '../api'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'
import CategoryForm from '../components/CategoryForm'

export default function DashboardPage() {
  const [expenses, setExpenses] = useState([])
  const [categories, setCategories] = useState([])
  const [filterCategory, setFilterCategory] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchCategories = useCallback(async () => {
    const res = await api.get('/categories/')
    setCategories(res.data)
  }, [])

  const fetchExpenses = useCallback(async () => {
    setLoading(true)
    try {
      const params = {}
      if (filterCategory) params.category_id = filterCategory
      if (dateFrom) params.date_from = new Date(dateFrom).toISOString()
      if (dateTo) params.date_to = new Date(dateTo).toISOString()
      const res = await api.get('/expenses/', { params })
      setExpenses(res.data)
    } finally {
      setLoading(false)
    }
  }, [filterCategory, dateFrom, dateTo])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    fetchExpenses()
  }, [fetchExpenses])

  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

      {/* Загальна сума */}
      <div className="bg-indigo-600 text-white rounded-2xl p-6 flex justify-between items-center">
        <div>
          <p className="text-indigo-200 text-sm">Загальні витрати</p>
          <p className="text-4xl font-bold mt-1">₴{total.toFixed(2)}</p>
        </div>
        <span className="text-5xl">💸</span>
      </div>

      {/* Категорії */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-3">
        <h2 className="font-semibold text-gray-700">Категорії</h2>
        <CategoryForm onCreated={fetchCategories} />
        <div className="flex flex-wrap gap-2 mt-2">
          {categories.map((cat) => (
            <span
              key={cat.id}
              className="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full"
            >
              {cat.name}
            </span>
          ))}
        </div>
      </div>

      {/* Форма додавання витрати */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-3">
        <h2 className="font-semibold text-gray-700">Нова витрата</h2>
        <ExpenseForm categories={categories} onCreated={fetchExpenses} />
      </div>

      {/* Фільтри */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-3">
        <h2 className="font-semibold text-gray-700">Фільтри</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Всі категорії</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      </div>

      {/* Список витрат */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-3">
        <h2 className="font-semibold text-gray-700">
          Витрати{' '}
          <span className="text-indigo-400 text-sm font-normal">
            ({expenses.length})
          </span>
        </h2>
        {loading ? (
          <p className="text-center text-gray-400 py-8">Завантаження...</p>
        ) : (
          <ExpenseList expenses={expenses} onDeleted={fetchExpenses} />
        )}
      </div>

    </div>
  )
}