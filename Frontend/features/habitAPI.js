export const fetchHabits = async () => {
    const response = await fetch('http://your-backend-url/api/habits');
    if (!response.ok) {
        throw new Error('Failed to fetch habits');
    }
    const data = await response.json();
    return data;
};