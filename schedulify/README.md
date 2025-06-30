# Schedulify

Schedulify is a free and open-source content management system (CMS) for single-page booking and payment systems. It's designed to be a powerful and flexible platform for businesses that need to manage hourly bookings with a fixed fee.

## Features

*   **User Management:** Separate personal accounts for clients, employees, and administrators.
*   **Booking System:** An interactive calendar for booking sessions.
*   **Payment Integration:** Secure payment processing with Stripe.
*   **Admin Panel:** A comprehensive dashboard for managing users, bookings, and system settings.
*   **Plugin Architecture:** A modular system that allows for extending the CMS with new features.
*   **Multiple Authentication Methods:** Support for email/password, Google, Apple, and SMS-based authentication.

## Technology Stack

*   **Frontend:** React, TypeScript, Material-UI
*   **Backend:** Node.js, Express, TypeScript, MongoDB
*   **Real-time:** Socket.IO
*   **Authentication:** Passport.js

## Getting Started

### Prerequisites

*   Node.js (v16 or later)
*   npm
*   MongoDB (either a local installation or a cloud-based service like MongoDB Atlas)
*   Docker (optional, for local development)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://your-git-repository/schedulify.git
    cd schedulify
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    cd packages/client && npm install
    cd ../server && npm install
    ```

3.  **Configure environment variables:**
    Create a `.env` file in the `packages/server` directory and add the following variables. See the `.env.example` file for a full list.
    ```
    MONGO_URI=your-mongodb-connection-string
    JWT_SECRET=your-jwt-secret
    ```

4.  **Run the development servers:**
    ```bash
    npm run dev
    ```
    This will start the frontend and backend servers concurrently. The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5000`.

## Deployment

### Proxmox LXC (Automated)

The `deploy.sh` script in the root of the project can be used to automate the deployment of Schedulify to a Proxmox LXC container.

**Note:** This script is a template and may require modifications to fit your specific Proxmox environment.

### Manual Installation

1.  **Provision a server:**
    *   Ubuntu 22.04 is recommended.
    *   Install Node.js, npm, and MongoDB.

2.  **Clone the repository and install dependencies:**
    Follow the installation steps above.

3.  **Build the application:**
    ```bash
    cd packages/client && npm run build
    cd ../server && npm run build
    ```

4.  **Configure a process manager:**
    Use a process manager like PM2 to run the server in production.
    ```bash
    pm2 start packages/server/dist/index.js --name schedulify
    ```

5.  **Configure a web server:**
    Use a web server like Nginx to serve the frontend and proxy API requests to the backend.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.
