export const fetchReisterUser = async (username, password) => {
    const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": username,
            "password": password,
        }),
    });
    if (!response.ok) {
        throw new Error('Failed to register user');
    }
    return response.json();
}

export const fetchLoginUser = async (username, password) => {
    const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": username,
            "password": password,
        }),
    });
    if (!response.ok) {
        throw new Error('Failed to login user');
    }
    return response.json();
}