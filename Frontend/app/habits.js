"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { markHabitDoneThunk, fetchHabitsThunk } from "@/features/habitSlice";

export default function Habits() {
    const dispatch = useDispatch();
    const habits = useSelector((state) => state.habits.habits);
    const status = useSelector((state) => state.habits.status);
    const error = useSelector((state) => state.habits.error);

    // Estado para mostrar mensajes individuales por hábito
    const [messages, setMessages] = useState({});

    const calculatedProgress = (days) => {
        return Math.min((days / 66) * 100, 100);
    };

    const handleMarkDone = async (id) => {
        try {
            const result = await dispatch(markHabitDoneThunk(id));
            if (markHabitDoneThunk.fulfilled.match(result)) {
                const message = result.payload;
                setMessages((prev) => ({ ...prev, [id]: message }));
                await dispatch(fetchHabitsThunk());
            } else if (markHabitDoneThunk.rejected.match(result)) {
                const errorMsg = result.payload || "Error updating habit";
                console.error("Error in markHabitDoneThunk:", errorMsg); // Log detallado
                setMessages((prev) => ({ ...prev, [id]: `Error: ${errorMsg}` }));
            }
        } catch (error) {
            console.error("Unexpected error:", error); // Log de errores inesperados
            setMessages((prev) => ({ ...prev, [id]: "Unexpected error occurred" }));
        }



        // Limpia el mensaje después de 4 segundos
        setTimeout(() => {
            setMessages((prev) => {
                const copy = { ...prev };
                delete copy[id];
                return copy;
            });
        }, 4000);
    };

    if (status === "loading") return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6 text-black">
                Welcome to Habits List
            </h1>

            <ul className="space-y-4">
                {habits.map((habit) => (
                    <li
                        key={habit._id}
                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex flex-col justify-between items-start space-y-2 w-full">
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {habit.name}
                                </h2>
                                {/* Barra de progreso */}
                                <div className="relative w-full h-4 bg-gray-200 rounded-full">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full"
                                        style={{
                                            width: `${calculatedProgress(
                                                habit.days || 0
                                            )}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>

                            {/* Botón activo todo el tiempo */}
                            <button
                                className="bg-teal-400 text-black py-2 px-4 rounded-full hover:bg-teal-500 transition duration-300 ml-4"
                                onClick={() => handleMarkDone(habit._id)}
                            >
                                Done
                            </button>
                        </div>

                        {/* Mensaje dinámico para cada hábito */}
                        {messages[habit._id] && (
                            <p className="text-sm text-green-600 font-medium mb-2">
                                {messages[habit._id]}
                            </p>
                        )}

                        {/* Detalles del hábito */}
                        <p className="text-gray-700 mb-2">
                            Description: {habit.description}
                        </p>
                        <p className="text-gray-700 mb-2">
                            Category: {habit.category}
                        </p>
                        <p className="text-gray-700 mb-2">
                            Frequency: {habit.frequency}
                        </p>
                        <p className="text-gray-700">
                            Duration: {habit.duration}
                        </p>
                        <p className="text-gray-700">
                            Fecha de inicio: {habit.startedaAt}
                        </p>
                        <p className="text-gray-700">
                            Ultima actualización: {habit.lastUpdate}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
