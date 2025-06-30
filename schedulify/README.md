# Schedulify

![Schedulify Logo](https://your-logo-url.com/logo.png)

**Schedulify is a free and open-source content management system (CMS) for single-page booking and payment systems.** It's designed to be a powerful and flexible platform for businesses that need to manage hourly bookings with a fixed fee.

## Features

*   **User Management:** Separate personal accounts for clients, employees, and administrators.
*   **Booking System:** An interactive calendar for booking sessions.
*   **Payment Integration:** Secure payment processing with Stripe.
*   **Admin Panel:** A comprehensive dashboard for managing users, bookings, and system settings.
*   **Plugin Architecture:** A modular system that allows for extending the CMS with new features.
*   **Multiple Authentication Methods:** Support for email/password, Google, Apple, and SMS-based authentication.
*   **Customizable Theming:** Easily change the look and feel of the application with custom themes.
*   **One-Command Installation:** Get the entire Schedulify system running with a single command using Docker.

## Getting Started

The easiest way to get started with Schedulify is with Docker.

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

## Documentation

*   [User Guide](docs/USER_GUIDE.md)
*   [Developer Guide](docs/DEVELOPER_GUIDE.md)
*   [Theme Development](docs/THEME_DEVELOPMENT.md)
*   [API Reference](docs/API_REFERENCE.md)
*   [Advanced Installation](docs/INSTALLATION.md)

## Contributing

We welcome contributions from the community! Please see our [Contributing Guide](CONTRIBUTING.md) for more information.

## License

Schedulify is open-source software licensed under the [MIT license](LICENSE).
