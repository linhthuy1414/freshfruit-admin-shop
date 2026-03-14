import { supabase } from '../lib/supabase.js'

const BUCKET_NAME = 'product-images'

export async function uploadProductImage(file) {
  if (!file) throw new Error('Chưa chọn ảnh')

  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('File không phải là ảnh')
  }

  // Validate file size (max 5MB)
  const MAX_SIZE = 5 * 1024 * 1024
  if (file.size > MAX_SIZE) {
    throw new Error('Ảnh quá lớn (tối đa 5MB)')
  }

  const ext = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2)}.${ext}`
  const filePath = `products/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    })

  if (uploadError) {
    // Provide user-friendly error messages
    if (uploadError.message?.includes('Bucket not found')) {
      throw new Error(
        'Bucket "product-images" chưa được tạo trong Supabase. ' +
        'Vào Supabase Dashboard → Storage → New Bucket → tên: product-images (public).'
      )
    }
    if (uploadError.message?.includes('new row violates row-level security')) {
      throw new Error(
        'Chưa cấu hình quyền upload. Vào Supabase Dashboard → Storage → product-images → Policies → thêm INSERT policy cho authenticated users.'
      )
    }
    throw new Error(`Upload thất bại: ${uploadError.message}`)
  }

  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath)

  if (!data?.publicUrl) {
    throw new Error('Không lấy được URL ảnh sau khi upload')
  }

  return data.publicUrl
}
