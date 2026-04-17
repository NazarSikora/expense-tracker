import api from '../api'

export default function ExpenseList({ expenses, onDeleted }) {
  const handleDelete = async (id) => {
    if (!confirm('Видалити витрату?')) return
    try {
      await api.delete(`/expenses/${id}`)
      onDeleted()
    } catch {
      alert('Помилка видалення')
    }
  }

  if (expenses.length === 0) {
    return (
      <p className="text-center text-gray-400 py-8">
        Витрат поки немає. Додайте першу! 👆
      </p>
    )
  }

  return (
    <div className="space-y-2">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 hover:bg-gray-100 transition"
        >
          <div className="flex flex-col">
            <span className="font-medium text-gray-800">{expense.title}</span>
            <span className="text-xs text-gray-400">
              {expense.category ? expense.category.name : 'Без категорії'} •{' '}
              {new Date(expense.date).toLocaleDateString('uk-UA')}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-indigo-600">
              ₴{expense.amount.toFixed(2)}
            </span>
            <button
              onClick={() => handleDelete(expense.id)}
              className="text-red-400 hover:text-red-600 text-sm transition"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}