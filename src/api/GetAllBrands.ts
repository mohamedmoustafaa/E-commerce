'use server'

export default async function GetAllBrands() {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
      cache: "no-store", // علشان دايمًا يجيب أحدث بيانات
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch brands: ${res.status}`);
    }

    const data = await res.json();
    return data.data; // الـ API بيحط النتايج جوّا data.data
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}
