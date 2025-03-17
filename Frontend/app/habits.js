import React from 'react';

const Habits = ({ habits }) => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6 text-black">Welcome to Habits List</h1>

            <ul className="space-y-4">
                {habits.map((habit) => (
                    <li key={habit._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex flex-col justify-between items-start space-y-2">
                                <h2 className="text-2xl font-semibold text-gray-800">{habit.name}</h2>

                                {/* Barra de progreso más gruesa alineada con el botón */}
                                <div className="relative w-full h-4 bg-gray-200 rounded-full">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full"
                                        style={{ width: `${habit.progress}%` }} // Asumiendo que habit.progress es un porcentaje
                                    ></div>
                                </div>
                            </div>

                            {/* Botón de "Done" al lado de la barra de progreso */}
                            <button className="bg-teal-400 text-black py-2 px-4 rounded-full hover:bg-teal-500 transition duration-300 ml-4">
                                Done
                            </button>
                        </div>

                        {/* Detalles del hábito */}
                        <p className="text-gray-700 mb-2">Description: {habit.description}</p>
                        <p className="text-gray-700 mb-2">Category: {habit.category}</p>
                        <p className="text-gray-700 mb-2">Frequency: {habit.frequency}</p>
                        <p className="text-gray-700">Duration: {habit.duration}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};



export default Habits;