const API_BASE_URL = 'http://localhost:3000';

export interface ProfileData {
  weight: string;
  weightPhoto?: string;
  height: string;
  age: string;
  gender: string;
  location: string;
  state: string;
  village: string;
}

export interface UserData {
  fullName?: string;
  phone?: string;
  profile: ProfileData;
}

export class ProfileService {
  static async updateProfile(userData: UserData, token: string): Promise<any> {
    // ✅ remove empty/undefined fields before sending
    const cleanData = JSON.parse(JSON.stringify(userData));

    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(cleanData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update profile: ${errorText}`);
    }

    return await response.json();
  }

  static async getProfile(token: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch profile: ${errorText}`);
    }

    return await response.json();
  }
}
