# Installation Guide

This guide provides detailed instructions for installing and configuring the Schedulify CMS.

## Recommended Installation (Docker)

The easiest and recommended way to install Schedulify is with Docker.

### Prerequisites

*   [Docker](https://docs.docker.com/get-docker/)
*   [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/schedulify.git
    cd schedulify
    ```

2.  **Configure environment variables:**
    Copy the `.env.example` file to `.env` and fill in your own values.
    ```bash
    cp .env.example .env
    ```

3.  **Run the application:**
    ```bash
    docker-compose up -d
    ```
    This will build the Docker images and start the application. The Schedulify CMS will be available at `http://localhost`.

---

## Advanced Installation

This section provides instructions for installing Schedulify without Docker.

### Manual Installation

1.  **Provision a server:**
    *   Ubuntu 22.04 is recommended.
    *   Install Node.js, npm, and MongoDB.

2.  **Clone the repository and install dependencies:**
    ```bash
    git clone https://github.com/your-username/schedulify.git
    cd schedulify
    npm install
    cd packages/client && npm install
    cd ../server && npm install
    ```

3.  **Configure environment variables:**
    Create a `.env` file in the `packages/server` directory and add the required environment variables. See the `.env.example` file for a full list.

4.  **Build the application:**
    ```bash
    npm run build
    ```

5.  **Run the application:**
    ```bash
    npm start
    ```

### Proxmox LXC (Automated)

The `deploy.sh` script in the root of the project can be used to automate the deployment of Schedulify to a Proxmox LXC container.

**Note:** This script is a template and may require modifications to fit your specific Proxmox environment.
