# Fitness App MongoDB Integration

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd fitness-backend
   npm install
   ```

2. **Configure MongoDB**
   - Replace `<db_username>` and `<db_password>` in the `.env` file with your actual MongoDB credentials
   - The MongoDB URI is already configured for your Atlas cluster

3. **Start the Backend Server**
   ```bash
   cd fitness-backend
   npm start
   ```

4. **Install Frontend Dependencies**
   ```bash
   npm install @react-native-async-storage/async-storage
   ```

## Features Implemented

- **MongoDB Atlas Integration**: Connected to your cluster using the provided connection string
- **User Authentication**: Login/register with JWT tokens
- **Profile Management**: Save and retrieve user profile data including:
  - Weight with photo upload capability
  - Height, age, gender
  - Location details (city, state, village)
- **Secure Token Management**: Authentication tokens stored securely using AsyncStorage

## API Endpoints

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /profile` - Get user profile (requires auth)
- `PUT /profile` - Update user profile (requires auth)

## Usage

The profile form now integrates with MongoDB to save user data. Users need to be authenticated to update their profiles. The form includes validation and error handling for a smooth user experience.