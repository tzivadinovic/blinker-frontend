import {Product} from '../openapi';

export const filterProduct = (product: Product, inputPar: string) => {
  return [product.code, product.name, product.description, product.category.name].some(prop => prop.toLowerCase().startsWith(inputPar.toLowerCase()));
};
