import {City, Customer, Employee, Product, State} from '../openapi';

export const filterProduct = (product: Product, inputPar: string) => {
  return [product.code, product.name, product.description, product.category.name].some(prop => prop.toLowerCase().startsWith(inputPar.toLowerCase()));
};

export const filterEmployee = (employee: Employee, inputPar: string) => {
  return [employee.firstName, employee.lastName].some(prop => prop.toLowerCase().startsWith(inputPar.toLowerCase()));
};

export const filterCustomer = (customer: Customer, inputPar: string) => {
  return [customer.name, customer.state.name].some(prop => prop.toLowerCase().startsWith(inputPar.toLowerCase()));
};

export const filterState = (state: State, inputPar: string) => {
  return [state.name].some(prop => prop.toLowerCase().startsWith(inputPar.toLowerCase()));
};

export const filterCity = (city: City, inputPar: string) => {
  return [city.city, city.zipcode].some(prop => prop.toLowerCase().startsWith(inputPar.toLowerCase()));
};
