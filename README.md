# Quiz App

A brief description of what this project does and who it's for

This is a simple CRUD application that allows you to create quizzes, display them, and view a list of all available quizzes. The project was created for educational purposes to familiarize with two popular frameworks: Next.js and Fastify.

Technologies:

- Frontend: Next.js
- Backend: Fastify
- Database: MongoDB

Testing:

- Backend (Fastify): Integration tests with TestContainers
- Frontend (Next.js): Unit tests with Jest and integration with React-Toastify

Running the Application:
To run the application locally, follow these steps:

- In the docker folder, start the Docker containers
- Run the backend (Fastify) in a separate process:
- Navigate to the frontend folder and start the service. Currently, both the frontend and backend must be manually started in separate processes.

Features:

- Create Quizzes: Ability to create new quizzes in the application.
- View Quizzes: Browse the quizzes that have been created.
- List Quizzes: Display all available quizzes in the system.

Testing:
The application uses integration and unit tests to ensure code quality. To run the tests:

- Fastify (Backend): Integration tests with TestContainers
- Next.js (Frontend): Unit tests with Jest and integration with React-Toastify
