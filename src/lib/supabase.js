import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Tên bucket dùng cho ảnh sản phẩm trên Supabase Storage.
 * Gom vào 1 constant để tránh hardcode nhiều nơi.
 * Nếu đổi tên bucket trên Supabase Dashboard, chỉ cần sửa ở đây.
 */
export const STORAGE_BUCKET = 'product-images';
