import { Link } from 'react-router-dom'
import { Leaf, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">FreshImport</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Chuyên cung cấp trái cây nhập khẩu cao cấp từ Nhật Bản, Hàn Quốc, New Zealand, Hoa Kỳ và nhiều quốc gia khác. Cam kết 100% chính hãng.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-500 flex items-center justify-center transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-500 flex items-center justify-center transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-500 flex items-center justify-center transition-all duration-300">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Liên kết</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-brand-400 transition-colors">Trang chủ</Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-gray-400 hover:text-brand-400 transition-colors">Sản phẩm</Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm text-gray-400 hover:text-brand-400 transition-colors">Giỏ hàng</Link>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-brand-400 transition-colors">Chính sách đổi trả</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-brand-400 transition-colors">Điều khoản sử dụng</a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Danh mục</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-400 hover:text-brand-400 transition-colors">Nho nhập khẩu</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-brand-400 transition-colors">Cherry & Berries</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-brand-400 transition-colors">Xoài cao cấp</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-brand-400 transition-colors">Táo & Lê</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-brand-400 transition-colors">Kiwi & Dâu tây</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-400">123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span className="text-sm text-gray-400">1900 1234 56</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span className="text-sm text-gray-400">hello@freshimport.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 FreshImport. Đã đăng ký bản quyền.</p>
          <p className="text-xs text-gray-600">Thiết kế với 💚 bởi FreshImport Team</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
