import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchHabits } from "./habitAPI";

// Acción asíncrona para obtener los hábitos
export const fetchHabitsThunk = createAsyncThunk('habits/fetchHabits', async () => {
    const response = await fetchHabits();
    return response;
});

// Acción asíncrona para marcar un hábito como hecho
export const markHabitDoneThunk = createAsyncThunk('habits/markHabitDone', async (habitId, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:5000/habits/${habitId}`, {
            method: 'PATCH',
        });

        const responseJson = await response.json();
        if (!response.ok) {
            console.error("Backend error:", responseJson); // Log detallado
            return rejectWithValue(responseJson.error || "Failed to mark habit as done");
        } else if (responseJson.message === "Habit restarted") {
            return rejectWithValue(responseJson.message);
        } else {
            return responseJson.message;
        }
    } catch (error) {
        console.error("Network error:", error); // Log de errores de red
        return rejectWithValue(error.message);
    }
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
        builder
            .addCase(fetchHabitsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.habits = action.payload;
            });
    }
});

export const { addHabits, addHabit, removeHabit } = habitSlice.actions;
export default habitSlice.reducer;