import defaultProducts from '../data/defaultProducts.js'

const PRODUCTS_KEY = 'freshimport_products'
const CART_KEY = 'freshimport_cart'
const AUTH_KEY = 'freshimport_admin_auth'

export function getProducts() {
  const stored = localStorage.getItem(PRODUCTS_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return defaultProducts
    }
  }
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts))
  return defaultProducts
}

export function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
}

export function updateProduct(updatedProduct) {
  const products = getProducts()
  const index = products.findIndex((p) => p.id === updatedProduct.id)
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct }
    saveProducts(products)
  }
  return products
}

export function getCart() {
  const stored = localStorage.getItem(CART_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return []
    }
  }
  return []
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export function addToCart(product, quantity = 1) {
  const cart = getCart()
  const existing = cart.find((item) => item.id === product.id)
  if (existing) {
    existing.quantity += quantity
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, unit: product.unit, quantity })
  }
  saveCart(cart)
  return cart
}

export function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.id !== productId)
  saveCart(cart)
  return cart
}

export function updateCartItemQuantity(productId, quantity) {
  const cart = getCart()
  const item = cart.find((item) => item.id === productId)
  if (item) {
    item.quantity = Math.max(1, quantity)
  }
  saveCart(cart)
  return cart
}

export function clearCart() {
  localStorage.removeItem(CART_KEY)
  return []
}

export function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0)
}

export function getCartTotal() {
  const cart = getCart()
  const products = getProducts()
  return cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id)
    const price = product ? product.price : item.price
    return sum + price * item.quantity
  }, 0)
}

export function loginAdmin(email, password) {
  if (email === 'admin@freshimport.vn' && password === '123456') {
    const authData = { email, loggedInAt: new Date().toISOString() }
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData))
    return true
  }
  return false
}

export function isAdminLoggedIn() {
  const stored = localStorage.getItem(AUTH_KEY)
  return !!stored
}

export function logoutAdmin() {
  localStorage.removeItem(AUTH_KEY)
}
