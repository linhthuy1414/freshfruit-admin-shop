import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, LogOut, Leaf, ChevronRight } from 'lucide-react'
import { logoutAdmin } from '../utils/storage.js'

function AdminSidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutAdmin()
    navigate('/admin/login')
  }

  const menuItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  ]

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link to="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl flex items-center justify-center shadow-lg">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold">FreshImport</span>
            <span className="block text-[10px] text-gray-400 uppercase tracking-wider">Admin Panel</span>
          </div>
        </Link>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.to
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-brand-500/20 text-brand-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="flex-1">{item.label}</span>
              {isActive && <ChevronRight className="w-4 h-4 text-brand-400" />}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all mb-1"
        >
          <Package className="w-5 h-5" />
          <span>Xem cửa hàng</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar
