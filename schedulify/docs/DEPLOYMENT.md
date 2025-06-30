# Deployment Guide

This guide provides instructions for deploying the Schedulify CMS to a production environment.

## Proxmox LXC (Automated)

The `deploy.sh` script in the root of the project can be used to automate the deployment of Schedulify to a Proxmox LXC container.

**Note:** This script is a template and may require modifications to fit your specific Proxmox environment.

## Manual Installation

1.  **Provision a server:**
    *   Ubuntu 22.04 is recommended.
    *   Install Node.js, npm, and MongoDB.

2.  **Clone the repository and install dependencies:**
    Follow the instructions in the [Installation Guide](INSTALLATION.md).

3.  **Build the application:**
    ```bash
    npm run build
    ```

4.  **Configure a process manager:**
    Use a process manager like PM2 to run the server in production.
    ```bash
    pm2 start packages/server/dist/index.js --name schedulify
    ```

5.  **Configure a web server:**
    Use a web server like Nginx to serve the frontend and proxy API requests to the backend.

    Here is an example Nginx configuration:

    ```nginx
    server {
        listen 80;
        server_name your-domain.com;

        location / {
            root /path/to/schedulify/packages/client/build;
            try_files $uri /index.html;
        }

        location /api {
            proxy_pass http://localhost:5000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```
