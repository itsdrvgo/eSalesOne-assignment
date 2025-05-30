# Backend (Express.js + Drizzle ORM)

This directory contains the backend application for the eCommerce simulation, built with Express.js and Drizzle ORM.

## Technologies

- **Framework**: Express.js
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL
- **Email**: Nodemailer (with Mailtrap for sandbox testing)
- **Validation**: Zod (schemas for `productSchema` and `orderSchema`)

## API Endpoints

The backend exposes the following RESTful API endpoints:

- `GET /api/products`: Retrieves a list of all available products.
- `GET /api/products/:id`: Retrieves details for a single product by its ID.
- `POST /api/orders`: Creates a new order.
- `GET /api/orders/:id`: Retrieves details for a single order by its ID.

## Data Models

The primary data models are for products and orders.

- **Product Model**:
    - Schemas are derived from a Zod-based `productSchema`.
    - Product `variants` (e.g., color, size) are stored as a `jsonb` object in the database. The typical structure is `{ color: string[], size: string[] }`.
- **Order Model**:
    - Schemas are derived from a Zod-based `orderSchema`.

## Authentication

No authentication mechanisms are implemented in this backend. Endpoints are publicly accessible.

## Email Confirmation

When a new order is successfully created via the `POST /api/orders` endpoint, the backend uses Nodemailer to send an order confirmation email. For development and testing, Mailtrap is used as a sandbox email server.

## Database and Migrations

PostgreSQL is used as the database. Drizzle ORM manages database interactions and schema migrations. Migrations are handled by Drizzle Kit, allowing for version-controlled changes to the database schema.

## Getting Started

To run the backend server locally:

1.  **Navigate to the `server` directory**:
    ```bash
    cd server
    ```
2.  **Install dependencies**:
    ```bash
    bun install
    ```
3.  **Set up environment variables**:
    Create a `.env` file in the `server` directory. You'll need to configure database connection details (e.g., `DATABASE_URL`) and Mailtrap credentials. Refer to `src/env.ts` for required variables.
    Example `.env` structure:
    ```env
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    # Mailtrap SMTP settings
    SMTP_HOST="sandbox.smtp.mailtrap.io"
    SMTP_PORT="2525"
    SMTP_USER="your_mailtrap_user"
    SMTP_PASS="your_mailtrap_password"
    SMTP_FROM_EMAIL="noreply@example.com"
    ```
4.  **Apply database migrations**:
    ```bash
    bun run db:mig
    ```
5.  **Run the development server**:
    ```bash
    bun run dev
    ```
    The server will typically start on the port defined in your environment or a default (e.g., `http://localhost:8080`).

Ensure you have PostgreSQL running and accessible.
