import { Minus, Plus, Trash2 } from 'lucide-react'
import { formatPrice } from '../utils/format.js'

function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 animate-fade-in">
      {/* Image */}
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
        <p className="text-xs text-gray-400 mt-0.5">{item.unit}</p>
        <p className="text-brand-600 font-bold mt-1">{formatPrice(item.price)}</p>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Subtotal */}
      <div className="hidden sm:block text-right min-w-[100px]">
        <p className="font-bold text-gray-800">{formatPrice(item.price * item.quantity)}</p>
      </div>

      {/* Remove */}
      <button
        onClick={() => onRemove(item.id)}
        className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
        title="Xóa"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}

export default CartItem
