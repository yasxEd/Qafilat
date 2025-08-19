# Hajj and Umrah Booking System Backend

This is the backend server for the Hajj and Umrah Booking System, built with Node.js, Express, and MongoDB.

## Features

- User authentication and authorization
- Agency management
- Admin panel
- Reservation management
- Document handling
- Role-based access control

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the backend directory and configure the environment variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/hajj-umrah
   JWT_SECRET=your-secret-key
   NODE_ENV=development
   ```

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## API Endpoints

### Users
- POST /api/users/register - Register a new user
- POST /api/users/login - User login
- GET /api/users/profile/:id - Get user profile
- PUT /api/users/profile/:id - Update user profile

### Agencies
- POST /api/agencies/register - Register a new agency
- POST /api/agencies/login - Agency login
- GET /api/agencies/profile/:id - Get agency profile
- PUT /api/agencies/profile/:id - Update agency profile

### Admin
- POST /api/admin/register - Register a new admin
- POST /api/admin/login - Admin login
- GET /api/admin/profile/:id - Get admin profile
- PUT /api/admin/profile/:id - Update admin profile

### Reservations
- POST /api/reservations - Create a new reservation
- GET /api/reservations - Get all reservations
- GET /api/reservations/:id - Get reservation by ID
- PUT /api/reservations/:id - Update reservation
- DELETE /api/reservations/:id - Delete reservation
- GET /api/reservations/user/:userId - Get user's reservations
- GET /api/reservations/agency/:agencyId - Get agency's reservations

## Security

- All passwords are hashed using bcrypt
- JWT tokens are used for authentication
- Role-based access control is implemented
- Environment variables are used for sensitive data

## Error Handling

The API returns appropriate HTTP status codes and error messages:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error 