import { useState, useEffect } from 'react'
import { Package, DollarSign, TrendingUp, Edit3, Search, Star } from 'lucide-react'
import AdminSidebar from '../components/AdminSidebar.jsx'
import ProductFormModal from '../components/ProductFormModal.jsx'
import { getProducts, updateProduct, getCart } from '../utils/storage.js'
import { formatPrice } from '../utils/format.js'

function AdminDashboardPage() {
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [toast, setToast] = useState('')

  useEffect(() => {
    setProducts(getProducts())
  }, [])

  const handleSave = (updatedProduct) => {
    const newProducts = updateProduct(updatedProduct)
    setProducts(newProducts)
    setEditingProduct(null)
    setToast('Đã cập nhật sản phẩm thành công!')
    setTimeout(() => setToast(''), 3000)
  }

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.origin.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const cart = getCart()
  const totalRevenue = products.reduce((s, p) => s + p.price, 0)
  const avgRating = products.length
    ? (products.reduce((s, p) => s + p.rating, 0) / products.length).toFixed(1)
    : 0

  const stats = [
    { label: 'Tổng sản phẩm', value: products.length, icon: Package, color: 'from-blue-500 to-blue-600' },
    { label: 'Giỏ hàng hiện tại', value: cart.length + ' SP', icon: TrendingUp, color: 'from-brand-500 to-emerald-500' },
    { label: 'Trung bình giá', value: formatPrice(products.length ? Math.round(totalRevenue / products.length) : 0), icon: DollarSign, color: 'from-gold-400 to-gold-500' },
    { label: 'Đánh giá TB', value: avgRating + ' ⭐', icon: Star, color: 'from-purple-500 to-purple-600' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 p-6 lg:p-8 overflow-auto">
        {/* Toast */}
        {toast && (
          <div className="fixed top-6 right-6 z-50 bg-brand-500 text-white px-6 py-3 rounded-xl shadow-xl animate-slide-in-right text-sm font-medium">
            ✅ {toast}
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Quản lý sản phẩm và giá cả</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-gray-800">Danh sách sản phẩm</h2>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text" placeholder="Tìm sản phẩm..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Sản phẩm</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Xuất xứ</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Giá bán</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Giá gốc</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Trạng thái</th>
                  <th className="text-right text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{product.name}</p>
                          <p className="text-xs text-gray-400">{product.unit}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">{product.origin}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-bold text-brand-600">{formatPrice(product.price)}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-gray-400">{formatPrice(product.originalPrice)}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${product.inStock ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                        {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button onClick={() => setEditingProduct(product)}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-3 py-2 rounded-lg transition-all">
                        <Edit3 className="w-3.5 h-3.5" /> Sửa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden p-4 space-y-3">
            {filteredProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <img src={product.image} alt={product.name} className="w-14 h-14 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 text-sm truncate">{product.name}</p>
                  <p className="text-xs text-gray-400">{product.origin}</p>
                  <p className="text-sm font-bold text-brand-600 mt-0.5">{formatPrice(product.price)}</p>
                </div>
                <button onClick={() => setEditingProduct(product)}
                  className="p-2 text-brand-600 bg-brand-50 rounded-lg hover:bg-brand-100 transition-all">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">Không tìm thấy sản phẩm</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <ProductFormModal
          product={editingProduct}
          onSave={handleSave}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  )
}

export default AdminDashboardPage
