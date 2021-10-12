export const BASE_URL = "https://ixntxnpeblpeluevducx.supabase.co";

export const SIGN_IN = "/auth/v1/token?grant_type=password";
export const LOGOUT = "/auth/v1/logout";
export const SIGN_UP = "/auth/v1/signup";

export const PRODUCTS = "/rest/v1/products?select=id,name,price,quantity";
export const UPDATE_PRODUCTS = "/rest/v1/products";
export const DELETE_PRODUCTS = "/rest/v1/products";
export const CUSTOMERS = "/rest/v1/customers?select=id,name,address,birthdate";
export const INSERT_CUSTOMERS = "/rest/v1/customers";
export const DELETE_CUSTOMERS = "/rest/v1/customers";
export const SALES = "/rest/v1/sales";
export const GET_SALES = "/rest/v1/sales?select=id,customers(name),products(name, price),quantity_product";

export const APIKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMzQ4MjYyMywiZXhwIjoxOTQ5MDU4NjIzfQ.hAuSJwadUqHcpNNalyuOKJDsURpK2NybavsNHAKR5Hk";