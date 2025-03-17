import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchHabits } from "./habitAPI";

// Acción asíncrona para obtener los hábitos
export const fetchHabitsThunk = createAsyncThunk('habits/fetchHabits', async () => {
    const response = await fetchHabits();
    return response;
});

// Estado inicial
const initialState = {
    habits: [],
    loading: false,
    error: ''
};

// Slice de hábitos
const habitSlice = createSlice({
    name: 'habits',
    initialState,
    reducers: {
        addHabits: (state, action) => {
            state.habits = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchHabitsThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.habits = action.payload;
        });
    }
});

export const { addHabits } = habitSlice.actions;
export default habitSlice.reducer;