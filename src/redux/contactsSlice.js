 
import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts } from './operations';
import { createSelector } from 'reselect'; // Import createSelector

  const initialState = {
    items: [
      { id: "id-1", name: "Rosie Simpson", phone: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", phone: "443-89-12" },
      { id: "id-3", name: "Eden Clements", phone: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", phone: "227-91-26" },
    ],
    isLoading: false,
    error: null,
  };
  
  export const contactsSlice=createSlice({
    name:'contacts',
    initialState,
    reducers:{
      addContact(state,action){
        state.items.push(action.payload);
      },

      deleteContact(state,action){
        state.items= state.items.filter(contact => contact.id !== action.payload);
      },
      
      updateContact(state,action){
        const index= state.items.findIndex((contact) => contact.id === action.payload.id);
        if(index !== -1){
          state.items[index]={...state.items[index],...action.payload}
        }
      }
    },
    extraReducers: builder => {
      builder
      // eslint-disable-next-line no-unused-vars
      .addCase(fetchContacts.pending, (state,action)=>{
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state,action)=>{
        state.isLoading=false;
        state.error=null;
        state.items=action.payload;
      })
      .addCase(fetchContacts.rejected, (state,action)=>{
        state.isLoading=false;
        state.error=action.payload;
      })
      .addCase(addContact.fulfilled, (state,action)=>{
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      // eslint-disable-next-line no-unused-vars
      .addCase(addContact.pending, (state,action)=>{
        state.isLoading = false;
        state.error=null;
      })
      .addCase(addContact.rejected, (state,action)=>{
        state.isLoading = false;
        state.error=action.payload;
      })
      .addCase(deleteContact.fulfilled, (state,action)=>{
        state.isLoading = true;
        state.error=null;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      // eslint-disable-next-line no-unused-vars
      .addCase(deleteContact.pending, (state,action)=>{
        state.isLoading = false;
        state.error=null;
      })
      .addCase(deleteContact.rejected, (state,action)=>{
        state.isLoading = false;
        state.error=action.payload;
      })
    }
  });
  
  const selectContacts = state => state.contacts.items;
  const selectNameFilter = state => state.contacts.filter; 

  export const selectFilteredContacts = createSelector(
    [selectContacts, selectNameFilter], // Input selectors
    (contacts, nameFilter) => {
      if (!nameFilter) return contacts;
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }
  );
    export const {addContact, deleteContact, updateContact} = contactsSlice.actions;
  export default contactsSlice.reducer;