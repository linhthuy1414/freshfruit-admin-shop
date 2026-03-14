import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ArrowLeft, ShoppingCart, Star, Check, Minus, Plus, Truck, ShieldCheck, RotateCcw, ChevronRight } from 'lucide-react'
import { getProducts } from '../services/products.js'
import { addToCart } from '../utils/storage.js'
import { formatPrice, calcDiscount } from '../utils/format.js'
import ProductCard from '../components/ProductCard.jsx'

function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        const products = await getProducts()
        const found = products.find((p) => p.id === Number(id))
        if (found) {
          setProduct(found)
          setRelatedProducts(products.filter((p) => p.id !== found.id).slice(0, 4))
        } else {
          setProduct(null)
        }
      } catch (err) {
        console.error('ProductDetailPage: Failed to load:', err)
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
    window.scrollTo(0, 0)
  }, [id])

  const handleAddToCart = () => {
    if (!product) return
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Đang tải sản phẩm...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy sản phẩm</h2>
          <Link to="/products" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Link>
        </div>
      </div>
    )
  }

  const discount = calcDiscount(product.originalPrice, product.price)

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8 animate-fade-in">
          <Link to="/" className="hover:text-brand-600 transition-colors">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/products" className="hover:text-brand-600 transition-colors">Sản phẩm</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-600 font-medium">{product.name}</span>
        </nav>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-20">
          {/* Image */}
          <div className="animate-fade-in-up">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600?text=No+Image'
                }}
              />
              {product.badge && (
                <div className="absolute top-5 left-5">
                  <span className="inline-block bg-gradient-to-r from-brand-500 to-emerald-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg shadow-brand-500/30">
                    {product.badge}
                  </span>
                </div>
              )}
              {discount > 0 && (
                <div className="absolute top-5 right-5">
                  <span className="inline-block bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-bold px-3 py-2 rounded-full shadow-lg">
                    -{discount}%
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            {/* Origin badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium text-brand-600 bg-brand-50 px-3 py-1.5 rounded-full">{product.origin}</span>
              <span className="text-sm text-gray-400">{product.category}</span>
            </div>

            {/* Name */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating || 0)
                        ? 'text-gold-400 fill-gold-400'
                        : 'text-gray-200 fill-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.rating || 0} ({product.reviews || 0} đánh giá)</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mb-6 pb-6 border-b border-gray-100">
              <span className="text-3xl font-bold text-brand-600">{formatPrice(product.salePrice || product.price)}</span>
              {product.originalPrice > (product.salePrice || product.price) && (
                <span className="text-lg text-gray-400 line-through mb-0.5">{formatPrice(product.originalPrice)}</span>
              )}
              <span className="text-sm text-gray-400 mb-1">/ {product.unit}</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-3">Đặc điểm nổi bật</h3>
                <ul className="space-y-2.5">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-brand-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-brand-500" />
                      </div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity + Add to cart */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-1.5">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-4 px-8 rounded-xl font-semibold text-base transition-all duration-300 shadow-lg ${
                  added
                    ? 'bg-brand-500 text-white shadow-brand-500/30 scale-[1.02]'
                    : 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-brand-500/25 hover:shadow-brand-500/40 hover:from-brand-600 hover:to-brand-700 active:scale-95'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    Đã thêm vào giỏ
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Thêm vào giỏ hàng
                  </>
                )}
              </button>
            </div>

            {/* Policies */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl text-center">
                <Truck className="w-5 h-5 text-brand-500" />
                <span className="text-xs text-gray-600 font-medium">Giao nhanh 2h</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl text-center">
                <ShieldCheck className="w-5 h-5 text-brand-500" />
                <span className="text-xs text-gray-600 font-medium">Chính hãng 100%</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl text-center">
                <RotateCcw className="w-5 h-5 text-brand-500" />
                <span className="text-xs text-gray-600 font-medium">Đổi trả dễ dàng</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Sản phẩm liên quan</h2>
              <Link to="/products" className="text-sm font-semibold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1 transition-colors">
                Xem thêm <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default ProductDetailPage
