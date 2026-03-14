import { useState, useEffect, useMemo } from 'react'
import { getProducts } from '../services/products.js'
import ProductCard from '../components/ProductCard.jsx'
import SearchFilterBar from '../components/SearchFilterBar.jsx'
import { Package } from 'lucide-react'

function ProductsPage() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrigin, setSelectedOrigin] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
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

    loadProducts()
  }, [])

  const origins = useMemo(() => {
    return [...new Set(products.map((p) => p.origin).filter(Boolean))].sort()
  }, [products])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(term) ||
          p.origin?.toLowerCase().includes(term) ||
          p.category?.toLowerCase().includes(term)
      )
    }

    if (selectedOrigin) {
      result = result.filter((p) => p.origin === selectedOrigin)
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
        break
      case 'price-desc':
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
        break
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name, 'vi'))
        break
      default:
        break
    }

    return result
  }, [products, searchTerm, selectedOrigin, sortBy])

  if (loading) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-500">Đang tải sản phẩm...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-500">Lỗi: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8 animate-fade-in-up">
          <span className="text-sm font-semibold text-brand-500 uppercase tracking-wider">
            Bộ sưu tập
          </span>

          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-2">
            Tất cả sản phẩm
          </h1>

          <p className="text-gray-500">
            Trái cây nhập khẩu cao cấp từ khắp nơi trên thế giới
          </p>
        </div>

        <SearchFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedOrigin={selectedOrigin}
          onOriginChange={setSelectedOrigin}
          origins={origins}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <p className="text-sm text-gray-400 mb-6">
          Hiển thị
          <span className="font-semibold text-gray-600"> {filteredProducts.length} </span>
          sản phẩm
        </p>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>

            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Không tìm thấy sản phẩm
            </h3>

            <p className="text-gray-400">
              Thử thay đổi từ khóa hoặc bộ lọc
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

export default ProductsPage