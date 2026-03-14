export function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price)
}

export function formatNumber(num) {
  return new Intl.NumberFormat('vi-VN').format(num)
}

export function calcDiscount(originalPrice, price) {
  if (!originalPrice || originalPrice <= price) return 0
  return Math.round(((originalPrice - price) / originalPrice) * 100)
}
