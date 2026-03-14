import { supabase, STORAGE_BUCKET } from '../lib/supabase.js'

/**
 * Upload ảnh sản phẩm lên Supabase Storage.
 *
 * Trả về:
 *   { success: true, url: '...' }   — upload thành công
 *   { success: false, error: '...' } — upload thất bại (bucket chưa tạo, policy sai, v.v.)
 *
 * KHÔNG throw error để caller có thể quyết định:
 *   - giữ ảnh cũ nếu upload fail
 *   - chỉ hiện toast 1 lần
 */
export async function uploadProductImage(file) {
  // ── Validate input ──────────────────────────────────────────
  if (!file) {
    return { success: false, error: 'Chưa chọn ảnh.' }
  }

  if (!file.type.startsWith('image/')) {
    return { success: false, error: 'File không phải là ảnh.' }
  }

  const MAX_SIZE = 5 * 1024 * 1024 // 5 MB
  if (file.size > MAX_SIZE) {
    return { success: false, error: 'Ảnh quá lớn (tối đa 5MB).' }
  }

  // ── Generate unique file path ───────────────────────────────
  const ext = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`
  const filePath = `products/${fileName}`

  // ── Upload ──────────────────────────────────────────────────
  try {
    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      })

    if (uploadError) {
      return { success: false, error: mapUploadError(uploadError) }
    }

    // ── Get public URL ──────────────────────────────────────
    const { data } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath)

    if (!data?.publicUrl) {
      return { success: false, error: 'Không lấy được URL ảnh sau khi upload.' }
    }

    return { success: true, url: data.publicUrl }
  } catch (err) {
    // Network error hoặc exception không lường trước
    console.error('[uploadProductImage] unexpected error:', err)
    return { success: false, error: 'Lỗi kết nối khi upload ảnh. Vui lòng thử lại.' }
  }
}

// ── Helpers ──────────────────────────────────────────────────────

function mapUploadError(uploadError) {
  const msg = uploadError.message || ''

  if (msg.includes('Bucket not found')) {
    return (
      `Bucket "${STORAGE_BUCKET}" chưa được tạo trên Supabase.\n` +
      `→ Vào Supabase Dashboard → Storage → New Bucket → tên: ${STORAGE_BUCKET} (public).`
    )
  }

  if (msg.includes('new row violates row-level security')) {
    return (
      `Chưa cấu hình quyền upload.\n` +
      `→ Supabase Dashboard → Storage → ${STORAGE_BUCKET} → Policies → thêm INSERT policy.`
    )
  }

  if (msg.includes('The resource already exists')) {
    return 'File ảnh đã tồn tại. Vui lòng thử lại.'
  }

  return `Upload thất bại: ${msg}`
}
