import { apiSlice } from './apiSlice';
const TAX_RATES_URL = '/api/tax-rates';

export const taxRateApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTaxRates: builder.query({
      query: () => `${TAX_RATES_URL}`,
      keepUnusedDataFor: 5,
    }),
    getAllTaxRates: builder.query({
      query: () => `${TAX_RATES_URL}/admin/all`,
      keepUnusedDataFor: 5,
    }),
    getTaxRateByState: builder.query({
      query: (state) => `${TAX_RATES_URL}/${state}`,
      keepUnusedDataFor: 5,
    }),
    updateTaxRate: builder.mutation({
      query: (data) => ({
        url: `${TAX_RATES_URL}/${data.state}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['TaxRate'],
    }),
    deactivateTaxRate: builder.mutation({
      query: (state) => ({
        url: `${TAX_RATES_URL}/${state}/deactivate`,
        method: 'PUT',
      }),
      invalidatesTags: ['TaxRate'],
    }),
    activateTaxRate: builder.mutation({
      query: (state) => ({
        url: `${TAX_RATES_URL}/${state}/activate`,
        method: 'PUT',
      }),
      invalidatesTags: ['TaxRate'],
    }),
  }),
});

export const {
  useGetTaxRatesQuery,
  useGetAllTaxRatesQuery,
  useGetTaxRateByStateQuery,
  useUpdateTaxRateMutation,
  useDeactivateTaxRateMutation,
  useActivateTaxRateMutation,
} = taxRateApiSlice;
