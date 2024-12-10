
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://6757ef9ac0a427baf94e88cc.mockapi.io";


export const addTask = createAsyncThunk(
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
  