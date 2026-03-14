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
    originalPrice: item.price,
  }));
}

export async function addProduct(product) {
  const payload = {
    name: product.name,
    slug: product.slug,
    category: product.category,
    origin: product.origin,
    price: Number(product.price),
    sale_price: Number(product.salePrice ?? product.sale_price ?? 0),
    stock: Number(product.stock ?? 0),
    unit: product.unit,
    badge: product.badge,
    status: product.status ?? 'Còn hàng',
    description: product.description,
    image_url: product.image ?? product.image_url,
  };

  const { data, error } = await supabase
    .from('products')
    .insert(payload)
    .select()
    .single();

  if (error) throw error;

  return data;
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

export async function deleteProduct(id) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
