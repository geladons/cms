# API Reference

The Schedulify API is a RESTful API that uses JSON for communication.

## Authentication

The API uses JSON Web Tokens (JWTs) for authentication. To authenticate with the API, you'll need to include a valid JWT in the `Authorization` header of your requests.

```
Authorization: Bearer <your-jwt>
```

## Endpoints

The following is a list of the available API endpoints.

### Authentication

*   `POST /api/auth/register`: Register a new user.
*   `POST /api/auth/login`: Log in a user.
*   `GET /api/auth/google`: Authenticate with Google.
*   `GET /api/auth/apple`: Authenticate with Apple.
*   `POST /api/sms/send-otp`: Send an OTP to a user's phone number.
*   `POST /api/sms/verify-otp`: Verify an OTP.

### Bookings

*   `GET /api/bookings`: Get all bookings.
*   `GET /api/bookings/my-bookings`: Get the bookings for the currently authenticated user.
*   `GET /api/bookings/my-assigned-bookings`: Get the bookings assigned to the currently authenticated employee.
*   `POST /api/bookings`: Create a new booking.
*   `GET /api/bookings/:id`: Get a single booking.
*   `PUT /api/bookings/:id/status`: Update the status of a booking.
*   `PUT /api/bookings/:id/assign`: Assign a booking to an employee.

### Users

*   `GET /api/users`: Get all users.

### Settings

*   `GET /api/settings/auth`: Get the authentication settings.
*   `PUT /api/settings/auth`: Update the authentication settings.
*   `GET /api/settings/theme`: Get the theme settings.
*   `PUT /api/settings/theme`: Update the theme settings.
