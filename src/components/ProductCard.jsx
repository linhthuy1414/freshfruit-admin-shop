import { Link } from 'react-router-dom'
import { ShoppingCart, Star, Eye } from 'lucide-react'
import { formatPrice, calcDiscount } from '../utils/format.js'
import { addToCart } from '../utils/storage.js'
import { useState } from 'react'

function ProductCard({ product }) {
  const [added, setAdded] = useState(false)
  const discount = calcDiscount(product.originalPrice, product.price)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-500 hover:-translate-y-2 border border-gray-100">
      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
        <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick view button */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-4 py-2 rounded-full shadow-lg">
            <Eye className="w-3.5 h-3.5" />
            Xem chi tiết
          </span>
        </div>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className="inline-block bg-gradient-to-r from-brand-500 to-emerald-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-brand-500/30">
              {product.badge}
            </span>
          </div>
        )}

        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3">
            <span className="inline-block bg-gradient-to-r from-red-500 to-rose-500 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-full shadow-lg">
              -{discount}%
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 lg:p-5">
        {/* Origin tag */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-medium text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
            {product.origin}
          </span>
          <span className="text-[11px] text-gray-400">{product.unit}</span>
        </div>

        {/* Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 group-hover:text-brand-600 transition-colors line-clamp-2 mb-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'text-gold-400 fill-gold-400'
                    : 'text-gray-200 fill-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        {/* Price & Button */}
        <div className="flex items-end justify-between gap-2">
          <div>
            <div className="text-lg font-bold text-brand-600">{formatPrice(product.price)}</div>
            {product.originalPrice > product.price && (
              <div className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</div>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={added}
            className={`p-2.5 rounded-xl transition-all duration-300 shadow-sm ${
              added
                ? 'bg-brand-500 text-white scale-110'
                : 'bg-brand-50 text-brand-600 hover:bg-brand-500 hover:text-white hover:shadow-lg hover:shadow-brand-500/25'
            }`}
            title="Thêm vào giỏ"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
