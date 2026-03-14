import { useState, useEffect, useMemo } from 'react'
import { Package, DollarSign, TrendingUp, Edit3, Search, Star } from 'lucide-react'
import AdminSidebar from '../components/AdminSidebar.jsx'
import ProductFormModal from '../components/ProductFormModal.jsx'
import { getProducts, updateProduct } from '../services/products.js'
import { getCart } from '../utils/storage.js'
import { formatPrice } from '../utils/format.js'

function AdminDashboardPage() {
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [toast, setToast] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      setError(err.message || 'Không tải được sản phẩm')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleSave = async (updatedProduct) => {
    try {
      await updateProduct(updatedProduct.id, updatedProduct)
      await loadProducts()
      setEditingProduct(null)
      setToast('Đã cập nhật sản phẩm thành công!')
      setTimeout(() => setToast(''), 3000)
    } catch (err) {
      setToast(err.message || 'Cập nhật thất bại')
      setTimeout(() => setToast(''), 3000)
    }
  }

  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase()

    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(term) ||
        p.origin?.toLowerCase().includes(term)
    )
  }, [products, searchTerm])

  const cart = getCart()

  const totalRevenue = products.reduce((sum, p) => sum + Number(p.price || 0), 0)

  const avgRating = products.length
    ? (
        products.reduce((sum, p) => sum + Number(p.rating || 0), 0) /
        products.length
      ).toFixed(1)
    : 0

  const stats = [
    {
      label: 'Tổng sản phẩm',
      value: products.length,
      icon: Package,
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Giỏ hàng hiện tại',
      value: cart.length + ' SP',
      icon: TrendingUp,
      color: 'from-brand-500 to-emerald-500',
    },
    {
      label: 'Trung bình giá',
      value: formatPrice(
        products.length ? Math.round(totalRevenue / products.length) : 0
      ),
      icon: DollarSign,
      color: 'from-gold-400 to-gold-500',
    },
    {
      label: 'Đánh giá TB',
      value: avgRating + ' ⭐',
      icon: Star,
      color: 'from-purple-500 to-purple-600',
    },
  ]

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 p-6 lg:p-8">
          <p className="text-gray-500">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 p-6 lg:p-8">
          <p className="text-red-500">Lỗi: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 p-6 lg:p-8 overflow-auto">

        {toast && (
          <div className="fixed top-6 right-6 z-50 bg-brand-500 text-white px-6 py-3 rounded-xl shadow-xl text-sm font-medium">
            {toast}
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Quản lý sản phẩm và giá cả
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>

              <p className="text-2xl font-bold text-gray-900">
                {stat.value}
              </p>

              <p className="text-sm text-gray-400 mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">

          <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

            <h2 className="text-lg font-bold text-gray-800">
              Danh sách sản phẩm
            </h2>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

              <input
                type="text"
                placeholder="Tìm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
              />
            </div>

          </div>

          <div className="hidden md:block overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b border-gray-100">

                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">
                    Sản phẩm
                  </th>

                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">
                    Xuất xứ
                  </th>

                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">
                    Giá bán
                  </th>

                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">
                    Giá gốc
                  </th>

                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">
                    Trạng thái
                  </th>

                  <th className="text-right text-xs font-semibold text-gray-400 px-5 py-3">
                    Hành động
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredProducts.map((product) => {

                  const sellingPrice = product.salePrice || product.price
                  const originalPrice = product.price

                  const inStock =
                    product.inStock !== undefined
                      ? product.inStock
                      : product.status === 'Còn hàng' || Number(product.stock) > 0

                  return (
                    <tr key={product.id} className="border-b border-gray-50">

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-xl object-cover"
                          />

                          <div>
                            <p className="font-medium text-gray-800 text-sm">
                              {product.name}
                            </p>

                            <p className="text-xs text-gray-400">
                              {product.unit}
                            </p>
                          </div>

                        </div>

                      </td>

                      <td className="px-5 py-4">
                        <span className="text-sm text-gray-600">
                          {product.origin}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-sm font-bold text-brand-600">
                          {formatPrice(sellingPrice)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-sm text-gray-400">
                          {formatPrice(originalPrice)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-xs font-medium">
                          {inStock ? 'Còn hàng' : 'Hết hàng'}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">

                        <button
                          onClick={() => setEditingProduct(product)}
                          className="inline-flex items-center gap-1 text-sm text-brand-600"
                        >
                          <Edit3 className="w-4 h-4" /> Sửa
                        </button>

                      </td>

                    </tr>
                  )
                })}

              </tbody>
            </table>

          </div>

        </div>

      </div>

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