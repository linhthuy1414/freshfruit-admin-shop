import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Leaf, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { supabase } from '../lib/supabase.js'

function AdminLoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('hoangthuylinh1414@gmail.com')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('Email hoặc mật khẩu không chính xác')
      setLoading(false)
      return
    }

    if (data.user) {
      navigate('/admin/dashboard')
      return
    }

    setError('Không thể đăng nhập')
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-brand-600 via-brand-500 to-emerald-500 items-center justify-center p-12">

        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

        <div className="relative text-center max-w-md">

          <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Leaf className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">
            FreshImport
          </h1>

          <p className="text-brand-100 text-lg leading-relaxed">
            Hệ thống quản trị cửa hàng trái cây nhập khẩu cao cấp.
          </p>

        </div>

      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">

        <div className="w-full max-w-md">

          {/* MOBILE LOGO */}
          <div className="lg:hidden flex items-center gap-2 justify-center mb-10">

            <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>

            <span className="text-xl font-bold text-gradient">
              FreshImport
            </span>

          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

            <div className="mb-8">

              <h2 className="text-2xl font-bold text-gray-900">
                Đăng nhập Admin
              </h2>

              <p className="text-gray-500 mt-1">
                Nhập thông tin để truy cập quản trị
              </p>

            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* EMAIL */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>

                <div className="relative">

                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email admin"
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                    required
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Mật khẩu
                </label>

                <div className="relative">

                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword
                      ? <EyeOff className="w-4 h-4" />
                      : <Eye className="w-4 h-4" />}
                  </button>

                </div>

              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-base disabled:opacity-70"
              >

                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Đăng nhập
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}

              </button>

            </form>

            <div className="mt-6 p-4 bg-brand-50 rounded-xl border border-brand-100">

              <p className="text-xs font-semibold text-brand-700 mb-1">
                🔑 Tài khoản admin hiện tại
              </p>

              <p className="text-xs text-brand-600">
                Email:
                <span className="font-mono font-bold">
                  hoangthuylinh1414@gmail.com
                </span>
              </p>

              <p className="text-xs text-brand-600">
                Mật khẩu:
                <span className="font-mono font-bold">
                  mật khẩu anh đã tạo trong Supabase
                </span>
              </p>

            </div>

          </div>

          <div className="text-center mt-6">

            <Link
              to="/"
              className="text-sm text-gray-400 hover:text-brand-600"
            >
              ← Quay về cửa hàng
            </Link>

          </div>

        </div>

      </div>

    </div>
  )
}

export default AdminLoginPage