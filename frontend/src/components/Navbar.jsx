import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Navbar() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-indigo-600">
        💰 Expense Tracker
      </Link>
      {token && (
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-red-500 transition"
        >
          Вийти
        </button>
      )}
    </nav>
  )
}