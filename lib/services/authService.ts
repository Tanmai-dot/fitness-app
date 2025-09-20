const API_BASE_URL = 'http://localhost:3000';

export interface AuthCredentials {
  email: string;
  password: string;
}

export class AuthService {
  static async login(credentials: AuthCredentials): Promise<{ token: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return await response.json();
  }

  static async register(credentials: AuthCredentials): Promise<{ token: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return await response.json();
  }
}