import { useState, useEffect } from 'react'
import { X, Save, ImageIcon } from 'lucide-react'
import { formatPrice } from '../utils/format.js'

function ProductFormModal({ product, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    salePrice: 0,
    origin: '',
    unit: '',
    description: '',
    image: '',
    badge: '',
    stock: 0,
    status: 'Còn hàng',
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || 0,
        salePrice: product.salePrice || 0,
        origin: product.origin || '',
        unit: product.unit || '',
        description: product.description || '',
        image: product.image || '',
        badge: product.badge || '',
        stock: product.stock || 0,
        status: product.status || 'Còn hàng',
      })
    }
  }, [product])

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    onSave({
      ...product,
      ...formData,
      price: Number(formData.price),
      salePrice: Number(formData.salePrice),
      stock: Number(formData.stock),
    })
  }

  if (!product) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            Chỉnh sửa sản phẩm
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <img
              src={formData.image}
              alt={formData.name}
              className="w-16 h-16 rounded-xl object-cover"
            />

            <div>
              <p className="font-semibold text-gray-800">
                {formData.name}
              </p>

              <p className="text-sm text-brand-600 font-bold">
                {formatPrice(Number(formData.salePrice || formData.price))}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Tên sản phẩm
            </label>

            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Giá gốc
              </label>

              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Giá bán
              </label>

              <input
                type="number"
                value={formData.salePrice}
                onChange={(e) => handleChange('salePrice', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
              />
            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Xuất xứ
              </label>

              <input
                type="text"
                value={formData.origin}
                onChange={(e) => handleChange('origin', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Đơn vị
              </label>

              <input
                type="text"
                value={formData.unit}
                onChange={(e) => handleChange('unit', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
              />
            </div>

          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Badge
            </label>

            <input
              type="text"
              value={formData.badge}
              onChange={(e) => handleChange('badge', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Link hình ảnh
            </label>

            <div className="relative">
              <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

              <input
                type="url"
                value={formData.image}
                onChange={(e) => handleChange('image', e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Tồn kho
            </label>

            <input
              type="number"
              value={formData.stock}
              onChange={(e) => handleChange('stock', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
            />
          </div>

          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-600 font-medium rounded-xl"
            >
              Hủy
            </button>

            <button
              type="submit"
              className="flex-1 btn-primary flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Lưu thay đổi
            </button>

          </div>

        </form>
      </div>
    </div>
  )
}

export default ProductFormModal