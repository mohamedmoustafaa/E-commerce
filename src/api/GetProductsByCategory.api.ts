export default async function GetProductsByCategory(categoryId: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`, {
      cache: "no-store"
    });

    const data = await res.json();
    return data.data; // لأن الـ API بيحط المنتجات داخل data.data
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}
