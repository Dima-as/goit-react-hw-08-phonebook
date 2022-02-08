import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createReducer } from "@reduxjs/toolkit";
import { filterContacts } from "./contact-action";

export const filterReducer = createReducer("", {
  [filterContacts]: (_, { payload }) => payload,
});
export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://connections-api.herokuapp.com/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Contacts"],
  endpoints: (builder) => ({
    fetchContacts: builder.query({
      query: () => "/contacts",
      keepUnusedDataFor: 0,
      providesTags: ["Contacts"],
    }),

    deleteContacts: builder.mutation({
      query: (contactId) => ({
        url: `/contacts/${contactId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contacts"],
    }),
    createContacts: builder.mutation({
      query: (contact) => ({
        url: "/contacts",
        method: "POST",
        body: contact,
      }),
      invalidatesTags: ["Contacts"],
    }),
    editContact: builder.mutation({
      query: ({ changedContact, contactId }) => {
        return {
          url: `/contacts/${contactId}`,
          method: "PATCH",
          body: changedContact,
        };
      },
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const {
  useFetchContactsQuery,
  useDeleteContactsMutation,
  useCreateContactsMutation,
  useEditContactMutation,
} = contactsApi;
