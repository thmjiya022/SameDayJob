const API_URL = 'http://localhost:5004/api/auth';

interface RegisterData 
{
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
}

interface LoginData 
{
    email: string;
    password: string;
}

export const register = async (data: RegisterData) => {

    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();

        throw new Error(errorData.message || 'Registration failed');
    }

    return await response.json();
};

export const login = async (data: LoginData) => {

    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();

        throw new Error(errorData.message || 'Login failed');
    }

    const result = await response.json();
    localStorage.setItem('token', result.token);

    return result;
};

export const getCurrentUser = () => {
    const token = localStorage.getItem('token');

    if (!token) 
    {
        return null;
    }

    return { token };
};

export const logout = () => {
    localStorage.removeItem('token');

};