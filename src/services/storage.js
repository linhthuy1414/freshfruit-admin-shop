import { supabase } from '../lib/supabase.js'

export async function uploadProductImage(file) {
  if (!file) throw new Error('Chua ch?n ?nh')

  const ext = file.name.split('.').pop()

  const fileName =
    ${Date.now()}-.

  const filePath = products/

  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    })

  if (uploadError) throw uploadError

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath)

  return data.publicUrl
}
