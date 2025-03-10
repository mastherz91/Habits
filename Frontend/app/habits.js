import React from 'react';

const Habits = ({ habits }) => {
    return (
        <div>
            <h1>Habits</h1>
            <ul>
                {habits.map((habit) => (
                    <li key={habit._id}>
                        <h2>{habit.name}</h2>
                        <p>{habit.description}</p>
                        <p>Category: {habit.category}</p>
                        <p>Frequency: {habit.frequency}</p>
                        <p>Duration: {habit.duration}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Habits;