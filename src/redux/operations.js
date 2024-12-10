
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://6757ef9ac0a427baf94e88cc.mockapi.io";

export const fetchContacts = createAsyncThunk(
    "contacts/fetchAll",
    // İlk parametrenin adı olarak alt çizgi karakterini kullanırız,
    // çünkü bu işlemde ona ihtiyacımız yok
    async (_, thunkAPI) => {
      try {
        const response = await axios.get("/contacts");
        // İstek başarılı olursa, verileri içeren bir proxy döndürürüz
        return response.data;
      } catch (e) {
        // İstek başarısız olursa, bir söz döndürürüz
        // hata metni ile reddedilecek olan
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );

export const addContact = createAsyncThunk(
    "contacts/addContact",
    async (text, thunkAPI) => {
      try {
        const response = await axios.post("/contacts", { text });
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );

  // src/redux/operations.js

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (contactId, thunkAPI) => {
      try {
        const response = await axios.delete(`/contacts/${contactId}`);
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );
  