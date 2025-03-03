import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import productList from './__mocks__/productList.json';

export type Product = {
  title: string;
  description: string;
  image: string;
  url: string;
  category: string;
};

export const productListApi = createApi({
  reducerPath: 'productListApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://frontend-test-api.digitalcreative.cn/',
  }),
  // baseQuery: async (name: string) => {
  //   console.log('Mock API Call:', name);
  //   return { data: productList };
  // },
  endpoints: (builder) => ({
    getProductList: builder.query<Product[], string | undefined>({
      query: (name) => `/?no-throttling=true&search=${name}`,
    }),
  }),
});

export const { useGetProductListQuery } = productListApi;
