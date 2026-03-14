import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Trash2, ArrowLeft, ArrowRight, ShoppingCart } from 'lucide-react'
import CartItem from '../components/CartItem.jsx'
import { getCart, getProducts, removeFromCart, updateCartItemQuantity, clearCart } from '../utils/storage.js'
import { formatPrice } from '../utils/format.js'

function CartPage() {
  const [cart, setCart] = useState([])
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    refreshCart()
  }, [])

  const refreshCart = () => {
    const cartItems = getCart()
    const products = getProducts()
    // Sync prices from products (admin might have updated them)
    const syncedCart = cartItems.map((item) => {
      const product = products.find((p) => p.id === item.id)
      if (product) {
        return { ...item, price: product.price, image: product.image, name: product.name, unit: product.unit }
      }
      return item
    })
    setCart(syncedCart)
  }

  const handleUpdateQuantity = (productId, quantity) => {
    updateCartItemQuantity(productId, quantity)
    refreshCart()
  }

  const handleRemove = (productId) => {
    removeFromCart(productId)
    refreshCart()
  }

  const handleClearCart = () => {
    clearCart()
    setCart([])
    setShowClearConfirm(false)
  }

  const handlePlaceOrder = () => {
    setOrderPlaced(true)
    clearCart()
    setCart([])
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= 500000 ? 0 : 30000
  const total = subtotal + shipping

  if (orderPlaced) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center animate-fade-in-up max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-brand-500/30 animate-pulse-glow">
            <ShoppingBag className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Đặt hàng thành công!</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Cảm ơn bạn đã tin tưởng FreshImport. Đơn hàng của bạn sẽ được giao trong thời gian sớm nhất.
          </p>
          <Link to="/products" className="btn-primary inline-flex items-center gap-2">
            Tiếp tục mua sắm
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center animate-fade-in-up max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Giỏ hàng trống</h2>
          <p className="text-gray-500 mb-8">Hãy khám phá các sản phẩm trái cây nhập khẩu cao cấp của chúng tôi</p>
          <Link to="/products" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <span className="text-sm font-semibold text-brand-500 uppercase tracking-wider">Giỏ hàng</span>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2">
            Giỏ hàng của bạn
            <span className="text-lg font-normal text-gray-400 ml-3">({cart.length} sản phẩm)</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemove}
              />
            ))}

            {/* Clear cart */}
            <div className="flex justify-end mt-4">
              {showClearConfirm ? (
                <div className="flex items-center gap-3 animate-fade-in">
                  <span className="text-sm text-gray-500">Xóa tất cả?</span>
                  <button
                    onClick={handleClearCart}
                    className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Xác nhận
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Hủy
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Xóa tất cả
                </button>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24 animate-slide-in-right">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Tóm tắt đơn hàng</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tạm tính</span>
                  <span className="font-medium text-gray-800">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Phí giao hàng</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-brand-500' : 'text-gray-800'}`}>
                    {shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-brand-500 bg-brand-50 px-3 py-2 rounded-lg">
                    🎉 Mua thêm {formatPrice(500000 - subtotal)} để được miễn phí ship
                  </p>
                )}
                <div className="border-t border-gray-100 pt-4 flex justify-between">
                  <span className="text-base font-semibold text-gray-800">Tổng cộng</span>
                  <span className="text-xl font-bold text-brand-600">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-base"
              >
                <ShoppingBag className="w-5 h-5" />
                Đặt hàng
              </button>

              <Link
                to="/products"
                className="w-full mt-3 flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-500 hover:text-brand-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
