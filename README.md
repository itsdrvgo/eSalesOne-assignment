# Minimal eCommerce Simulation

This project is a minimal eCommerce simulation built as part of an assignment. It demonstrates a full-stack application with a frontend, backend, and database.

## Key Features

-   **Cart Management**: Uses `Nuqs` to store the cart in query parameters, not localStorage.
-   **No Authentication**: For simplicity, user authentication is not implemented.

## Technologies Used

-   **Frontend**: Next.js 15, React 19, Tailwind CSS 4, ShadCN UI, Nuqs, Zod
-   **Backend**: Express.js, Drizzle ORM
-   **Database**: PostgreSQL
-   **Email**: Nodemailer (with Mailtrap for sandbox testing)

## Project Structure

The project is divided into two main folders:

-   `www/`: Contains the frontend application built with Next.js.
-   `server/`: Contains the backend application built with Express.js and Drizzle ORM.

## More Information

-   [Frontend Details (www/README.md)](./www/README.md)
-   [Backend Details (server/README.md)](./server/README.md)

## Getting Started

To run this project locally, you will need to start both the backend server and the frontend development server.

1.  **Start the Backend Server**: Navigate to the `server` directory and follow the instructions in `server/README.md`.
2.  **Start the Frontend Application**: Navigate to the `www` directory and follow the instructions in `www/README.md`.

Make sure you have Node.js and bun installed. You will also need a PostgreSQL database instance running and configured as per the backend setup.
