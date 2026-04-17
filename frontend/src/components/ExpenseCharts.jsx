import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#3b82f6', '#ec4899', '#14b8a6']

function getMonthlyData(expenses) {
  const map = {}
  expenses.forEach((e) => {
    const date = new Date(e.date)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    const label = date.toLocaleString('uk-UA', { month: 'short', year: '2-digit' })
    if (!map[key]) map[key] = { key, label, total: 0 }
    map[key].total += e.amount
  })
  return Object.values(map)
    .sort((a, b) => a.key.localeCompare(b.key))
    .map((item) => ({ ...item, total: parseFloat(item.total.toFixed(2)) }))
}

function getCategoryData(expenses) {
  const map = {}
  expenses.forEach((e) => {
    const name = e.category ? e.category.name : 'Без категорії'
    if (!map[name]) map[name] = { name, total: 0 }
    map[name].total += e.amount
  })
  return Object.values(map).map((item) => ({
    ...item,
    total: parseFloat(item.total.toFixed(2)),
  }))
}

export default function ExpenseCharts({ expenses }) {
  if (expenses.length === 0) {
    return (
      <p className="text-center text-gray-400 py-8">
        Додайте витрати щоб побачити графіки 📊
      </p>
    )
  }

  const monthlyData = getMonthlyData(expenses)
  const categoryData = getCategoryData(expenses)

  return (
    <div className="space-y-8">
      {/* Bar chart — по місяцях */}
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-3">Витрати по місяцях</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthlyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value) => [`₴${value}`, 'Сума']}
              contentStyle={{ borderRadius: '8px', fontSize: '13px' }}
            />
            <Bar dataKey="total" fill="#6366f1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie chart — по категоріях */}
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-3">Витрати по категоріях</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="total"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {categoryData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`₴${value}`, 'Сума']}
              contentStyle={{ borderRadius: '8px', fontSize: '13px' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}