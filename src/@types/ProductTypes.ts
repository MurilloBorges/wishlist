interface ProductTypes {
  price: string;
  image: string;
  brand: string;
  id: string;
  title: string;
  reviewScore?: string;
}

interface IProductInterface {
  data: ProductTypes;
}

export type { ProductTypes, IProductInterface };
