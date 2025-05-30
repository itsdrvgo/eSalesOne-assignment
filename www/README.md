# Frontend (Next.js)

This directory contains the frontend application for the eCommerce simulation, built with Next.js.

## Technologies

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Component Library**: ShadCN UI
- **State Management (Cart)**: Nuqs (stores cart data in URL query parameters)
- **Validation**: Zod

## Routes

- `/`: Displays all products in a grid layout.
- `/products/[id]`: Shows a detailed page for a single product.
- `/orders/new`: Provides a form (using ShadCN components) for creating a new order.
- `/orders/o/[id]`: Displays a "thank you" page with the details of a successfully placed order.

## Cart Management

The shopping cart functionality is managed using `Nuqs`. Instead of relying on localStorage or server-side sessions, cart items are stored directly in the URL query parameters. This approach simplifies state management for this minimal application.

## Forms and Validation

Forms, such as the order creation form, are built using ShadCN UI components. Input validation is handled by Zod, ensuring data integrity before submission.

## Email Confirmation

Upon successful order placement, an email confirmation is sent to the user. This is implemented using Nodemailer, configured to use Mailtrap as a sandbox environment for email testing.

## Getting Started

To run the frontend application locally:

1.  **Navigate to the `www` directory**:
    ```bash
    cd www
    ```
2.  **Install dependencies**:
    ```bash
    bun install
    ```
3.  **Run the development server**:
    ```bash
    bun run dev
    ```
    The application will typically be available at `http://localhost:3000`.

Ensure the backend server is running and accessible, as the frontend relies on it for data.
