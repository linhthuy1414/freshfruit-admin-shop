import { supabase } from '../lib/supabase';

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw error;

  return data.map((item) => ({
    ...item,
    salePrice: item.sale_price,
    image: item.image_url,
  }));
}

export async function updateProduct(id, updates) {
  const payload = {
    name: updates.name,
    slug: updates.slug,
    category: updates.category,
    origin: updates.origin,
    price: Number(updates.price),
    sale_price: Number(updates.salePrice ?? updates.sale_price ?? 0),
    stock: Number(updates.stock),
    unit: updates.unit,
    badge: updates.badge,
    status: updates.status,
    description: updates.description,
    image_url: updates.image ?? updates.image_url,
  };

  const { data, error } = await supabase
    .from('products')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return data;
}
