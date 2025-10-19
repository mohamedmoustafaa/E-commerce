export interface ProductType {
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  images: string[]
  category: Category
  subcategory: Subcategory[]
  brand: Brand
  sold: number
  ratingsAverage: number
  ratingsQuantity: number
  createdAt: string
  updatedAt: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  image: string
}

export interface Subcategory {
  _id: string
  name: string
  slug: string
  category: string
}

export interface Brand {
  _id: string
  name: string
  slug: string
  image: string
}
