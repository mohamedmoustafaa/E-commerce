export default async function GetProductsByBrand(brandId: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch products for brand: ${brandId}`);
    }

    const data = await res.json();
    return data.data; 
  } catch  {
    return [];
  }
}
