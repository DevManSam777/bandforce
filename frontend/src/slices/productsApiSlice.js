import { PRODUCTS_URL, UPLOAD_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ keyword, pageNumber }) => ({
                url: PRODUCTS_URL,
                params: {
                    keyword,
                    pageNumber,
                }
            }),
            providesTags: ['Products'],
            keepUnusedDataFor: 5,
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            providesTags: (result, error, productId) => [{ type: 'Product', id: productId }],
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST',
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data._id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Product', id: arg._id }, 'Products'],
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: data,
            })
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',
            }),
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`, 
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Product',]
        }),
        updateReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews/${data.reviewId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
        deleteReview: builder.mutation({
            query: ({ productId, reviewId }) => ({
                url: `${PRODUCTS_URL}/${productId}/reviews/${reviewId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }), 
        getTopProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/top`, 
            }),
            keepUnusedDataFor: 5,
        }),
        getCategories: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/categories`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Categories'],
        }),
        getCategoryDetails: builder.query({
            query: (categoryId) => ({
                url: `${PRODUCTS_URL}/categories/${categoryId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createCategory: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/categories`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Categories'],
        }),
        updateCategory: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/categories/${data._id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Categories'],
        }),
        deleteCategory: builder.mutation({
            query: (categoryId) => ({
                url: `${PRODUCTS_URL}/categories/${categoryId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Categories'],
        }),
        updateCategoryPosition: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/categories/${data.categoryId}/position`,
                method: 'PUT',
                body: { direction: data.direction },
            }),
            invalidatesTags: ['Categories'],
        }),
        updateProductPosition: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/position`,
                method: 'PUT',
                body: { direction: data.direction },
            }),
            invalidatesTags: ['Products'],
        }),
    }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation, useDeleteProductMutation, useCreateReviewMutation, useUpdateReviewMutation, useDeleteReviewMutation, useGetTopProductsQuery, useGetCategoriesQuery, useGetCategoryDetailsQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryPositionMutation, useUpdateProductPositionMutation } = productsApiSlice;