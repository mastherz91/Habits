// Función para realizar la solicitud GET
export const fetchHabits = async () => {
    const response = await fetch('http://localhost:5000/habits');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
