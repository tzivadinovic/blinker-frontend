import {City, Currency, Customer, Employee, Invoice, Product, State, TransportTerm} from '../openapi';

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

export const filterInvoice = (invoice: Invoice, inputPar: string) => {
  return [invoice.invoiceDetail.number, invoice.invoiceDetail.customer.name].some(prop => prop.toLowerCase().startsWith(inputPar.toLowerCase()));
};

export const filterTransportTerm = (transportTerm: TransportTerm, inputPar: string) => {
  return [transportTerm.term].some(prop => prop.toLowerCase().startsWith(inputPar.toLowerCase()));
};

export const filterCurrency = (currency: Currency, inputPar: string) => {
  return [currency.currency].some(prop => prop.toLowerCase().startsWith(inputPar.toLowerCase()));
};
