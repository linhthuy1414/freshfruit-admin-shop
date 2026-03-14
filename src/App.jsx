import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import CartPage from './pages/CartPage.jsx'
import AdminLoginPage from './pages/AdminLoginPage.jsx'
import AdminDashboardPage from './pages/AdminDashboardPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-black text-gray-200 mb-4">404</h1>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Trang không tồn tại
        </h2>
        <p className="text-gray-500 mb-6">
          Đường dẫn bạn truy cập không đúng hoặc đã bị xóa.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            to="/"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Về trang chủ
          </Link>
          <Link
            to="/admin/login"
            className="btn-outline inline-flex items-center gap-2"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        {/* Admin routes - NO Header/Footer */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Public routes - WITH Header/Footer */}
        <Route
          path="*"
          element={
            <>
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  )
}

export default App
