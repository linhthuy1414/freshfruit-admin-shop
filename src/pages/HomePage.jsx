import { Link } from 'react-router-dom'
import { ArrowRight, Truck, ShieldCheck, Leaf, Award, ChevronRight, Star, Zap } from 'lucide-react'
import ProductCard from '../components/ProductCard.jsx'
import { getProducts } from '../services/products.js'
import { useState, useEffect } from 'react'

function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const data = await getProducts()
        setProducts(data)
      } catch (err) {
        console.error('HomePage: Failed to load products:', err)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  const featuredProducts = products.slice(0, 4)

  const features = [
    {
      icon: ShieldCheck,
      title: '100% Chính hãng',
      desc: 'Nhập khẩu trực tiếp, có giấy chứng nhận xuất xứ rõ ràng',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Truck,
      title: 'Giao hàng nhanh',
      desc: 'Giao hàng trong 2h nội thành, bảo quản lạnh suốt hành trình',
      color: 'from-brand-500 to-emerald-500',
    },
    {
      icon: Leaf,
      title: 'Tươi mới mỗi ngày',
      desc: 'Nhập hàng theo chuyến bay, đảm bảo độ tươi ngon tuyệt đối',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Award,
      title: 'Cam kết chất lượng',
      desc: 'Đổi trả 100% nếu không hài lòng về chất lượng sản phẩm',
      color: 'from-gold-400 to-gold-500',
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-emerald-50" />
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-brand-200/30 to-emerald-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-gold-200/20 to-brand-200/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 rounded-full px-4 py-2 mb-6">
                <Zap className="w-4 h-4 text-brand-500" />
                <span className="text-sm font-medium text-brand-600">Miễn phí ship đơn từ 500K</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
                Trái cây nhập khẩu{' '}
                <span className="text-gradient">cao cấp</span>
                <br />
                tươi ngon mỗi ngày
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                Khám phá bộ sưu tập trái cây nhập khẩu từ Nhật Bản, Hàn Quốc, New Zealand và nhiều quốc gia khác. Giao hàng tận nơi trong 2 giờ.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="btn-primary inline-flex items-center gap-2 text-base">
                  Khám phá ngay
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/products" className="btn-outline inline-flex items-center gap-2 text-base">
                  Xem tất cả sản phẩm
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-10 pt-8 border-t border-gray-200/60">
                <div>
                  <div className="text-2xl font-bold text-gray-900">50+</div>
                  <div className="text-sm text-gray-400">Sản phẩm</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-400">Khách hàng</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-2xl font-bold text-gray-900">
                    4.9 <Star className="w-5 h-5 text-gold-400 fill-gold-400" />
                  </div>
                  <div className="text-sm text-gray-400">Đánh giá</div>
                </div>
              </div>
            </div>

            {/* Right - Hero image collage */}
            <div className="hidden lg:block relative" style={{ animationDelay: '0.2s' }}>
              <div className="relative w-full aspect-square">
                {/* Main circle */}
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-brand-100 to-emerald-100 animate-pulse-glow" />

                {/* Floating fruit images */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-48 h-48 rounded-3xl overflow-hidden shadow-2xl shadow-brand-500/20 rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&h=400&fit=crop" alt="Nho" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-8 left-4 w-40 h-40 rounded-3xl overflow-hidden shadow-2xl shadow-brand-500/20 -rotate-6 hover:rotate-0 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=400&h=400&fit=crop" alt="Cherry" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-4 right-8 w-44 h-44 rounded-3xl overflow-hidden shadow-2xl shadow-brand-500/20 rotate-6 hover:rotate-0 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop" alt="Xoài" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-36 h-36 rounded-3xl overflow-hidden shadow-2xl shadow-brand-500/20 -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop" alt="Dâu" className="w-full h-full object-cover" />
                </div>

                {/* Floating badge */}
                <div className="absolute top-12 left-0 bg-white rounded-2xl shadow-xl p-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center">
                      <Truck className="w-4 h-4 text-brand-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">Giao nhanh 2h</p>
                      <p className="text-[10px] text-gray-400">Nội thành HCM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 border border-transparent hover:border-gray-100 transition-all duration-500"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-sm font-semibold text-brand-500 uppercase tracking-wider">Nổi bật</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2">Sản phẩm đang hot</h2>
            </div>
            <Link
              to="/products"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
            >
              Xem tất cả
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Đang tải sản phẩm...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="sm:hidden text-center mt-8">
            <Link to="/products" className="btn-outline inline-flex items-center gap-2">
              Xem tất cả sản phẩm
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-emerald-500 p-10 lg:p-16">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3" />

            <div className="relative text-center max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Đặt hàng ngay hôm nay
              </h2>
              <p className="text-brand-100 text-lg mb-8 leading-relaxed">
                Miễn phí giao hàng cho đơn từ 500.000₫. Trái cây tươi ngon được giao tận tay bạn trong vòng 2 giờ.
              </p>
              <Link to="/products" className="btn-gold inline-flex items-center gap-2 text-base px-8 py-4">
                Mua sắm ngay
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
