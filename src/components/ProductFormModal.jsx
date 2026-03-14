import { useState, useEffect } from 'react'
import { X, Save, ImageIcon, Upload, Loader2 } from 'lucide-react'
import { formatPrice } from '../utils/format.js'

function ProductFormModal({ product, onSave, onClose, saving }) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: '',
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

  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        slug: product.slug || '',
        category: product.category || '',
        price: product.price || 0,
        salePrice: product.salePrice || product.sale_price || 0,
        origin: product.origin || '',
        unit: product.unit || '',
        description: product.description || '',
        image: product.image || product.image_url || '',
        badge: product.badge || '',
        stock: product.stock || 0,
        status: product.status || 'Còn hàng',
      })

      setSelectedFile(null)
      setPreviewUrl('')
    }
  }, [product])

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl('')
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreviewUrl(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

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
      selectedFile,
    })
  }

  if (!product) return null

  const displayImage = previewUrl || formData.image

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}

        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            {product.id ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Preview */}

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <img
              src={displayImage || 'https://via.placeholder.com/150?text=No+Image'}
              alt={formData.name}
              className="w-16 h-16 rounded-xl object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150?text=No+Image'
              }}
            />

            <div>
              <p className="font-semibold text-gray-800">
                {formData.name || 'Tên sản phẩm'}
              </p>

              <p className="text-sm text-brand-600 font-bold">
                {formatPrice(Number(formData.salePrice || formData.price))}
              </p>
            </div>
          </div>

          {/* Name */}

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

          {/* Slug / Category */}

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Slug
              </label>

              <input
                type="text"
                value={formData.slug}
                onChange={(e) => handleChange('slug', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                placeholder="vd: nho-shine-muscat"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Danh mục
              </label>

              <input
                type="text"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                placeholder="vd: Nho, Cherry, Xoài"
              />
            </div>

          </div>

          {/* Prices */}

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

          {/* Origin / Unit */}

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

          {/* Badge / Status */}

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Badge
              </label>

              <input
                type="text"
                value={formData.badge}
                onChange={(e) => handleChange('badge', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                placeholder="vd: Best Seller, Hot, Mới về"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Trạng thái
              </label>

              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
              >
                <option value="Còn hàng">Còn hàng</option>
                <option value="Hết hàng">Hết hàng</option>
              </select>
            </div>

          </div>

          {/* Description */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Mô tả sản phẩm
            </label>

            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none"
              placeholder="Mô tả chi tiết sản phẩm..."
            />
          </div>

          {/* Image URL */}

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
                placeholder="Dán link ảnh hoặc chọn file bên dưới"
              />
            </div>
          </div>

          {/* Upload file */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Upload ảnh từ máy
            </label>

            <label className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-sm text-gray-600 cursor-pointer hover:bg-gray-100 transition-all">
              <Upload className="w-4 h-4" />
              <span>{selectedFile ? selectedFile.name : 'Chọn file ảnh'}</span>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setSelectedFile(e.target.files?.[0] || null)
                }
                className="hidden"
              />
            </label>

            {selectedFile && (
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="mt-2 text-xs text-red-500 hover:text-red-700"
              >
                Xóa file đã chọn
              </button>
            )}
          </div>

          {/* Stock */}

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

          {/* Buttons */}

          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Hủy
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Lưu thay đổi
                </>
              )}
            </button>

          </div>

        </form>
      </div>
    </div>
  )
}

export default ProductFormModal