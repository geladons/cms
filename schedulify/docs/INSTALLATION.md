# Installation Guide

This guide provides detailed instructions for installing and configuring the Schedulify CMS.

## Prerequisites

*   Node.js (v16 or later)
*   npm
*   MongoDB (either a local installation or a cloud-based service like MongoDB Atlas)
*   Docker (optional, for local development)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/schedulify.git
    cd schedulify
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    cd packages/client && npm install
    cd ../server && npm install
    ```

3.  **Configure environment variables:**
    Create a `.env` file in the `packages/server` directory and add the required environment variables. See the `.env.example` file for a full list.

4.  **Run the development servers:**
    ```bash
    npm run dev
    ```
    This will start the frontend and backend servers concurrently. The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5000`.

## Deployment

For instructions on how to deploy Schedulify to a production environment, please refer to the [Deployment Guide](DEPLOYMENT.md).
