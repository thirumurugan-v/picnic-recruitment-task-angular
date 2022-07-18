export interface ProductListDto{
  products: ProductDto[];
}

export interface ProductDto{
  product_id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}
