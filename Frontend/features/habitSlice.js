import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Función para realizar la solicitud GET
const fetchHabits = async () => {
    const response = await fetch('http://localhost:5000/habits');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

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
        builder.addCase(fetchHabitsThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchHabitsThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.habits = action.payload;
        });
        builder.addCase(fetchHabitsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Something went wrong';
        });
    }
});

export const { addHabits } = habitSlice.actions;
export default habitSlice.reducer;