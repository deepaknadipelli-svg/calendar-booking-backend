Calendar Booking System – Backend API:

This project is a backend service built using Node.js, Express, and Sequelize that allows users to schedule meetings while preventing overlapping time slots.

The main focus of this project is to implement correct business logic, clean API design, and proper database handling as required in the Kraftshala Backend Intern Assignment.

Features:

Create and fetch users

Schedule meetings for users

Prevent overlapping meetings

Proper validation and meaningful error responses

Clean and modular backend structure

Sequelize ORM with SQL database

Foreign key constraints for data integrity

Tech Stack:

Node.js

Express.js

Sequelize ORM

SQLite (used for local development)

JavaScript

SQLite is used to keep the setup simple. The same code can be used with PostgreSQL or MySQL by changing the database configuration.

Project Structure:
src/
 ├── config/
 │   └── database.js
 ├── modules/
 │   ├── user/
 │   │   ├── interface/
 │   │   ├── model/
 │   │   ├── routes/
 │   │   └── service/
 │   └── meeting/
 │       ├── interface/
 │       ├── model/
 │       ├── routes/
 │       └── service/
 ├── app.js
 └── server.js
migrations/
package.json
README.md
 Business Rules
 Meeting Conflict Rule

A meeting cannot be created or updated if it overlaps with an existing meeting for the same user.

Conflict condition:

existing.startTime < new.endTime
AND
existing.endTime > new.startTime

If a conflict is detected:

HTTP Status: 400 Bad Request

Message: "Time slot already booked"

 API Endpoints
 User APIs
Create User
POST /users

Request body:

{
  "name": "Test User",
  "email": "test@example.com"
}
Get User by ID
GET /users/:id
 Meeting APIs
Create Meeting
POST /meetings

Request body:

{
  "userId": 1,
  "title": "Morning Sync",
  "startTime": "2026-02-10T10:00:00.000Z",
  "endTime": "2026-02-10T10:30:00.000Z"
}
List Meetings
GET /meetings

Optional query parameters:

userId

startDate

endDate

Update Meeting
PUT /meetings/:id
Delete Meeting
DELETE /meetings/:id
  Conflict Handling Demo (Key Requirement)

First meeting created: 10:00 → 10:30

Attempted overlapping meeting: 10:15 → 10:45

Response:

{
  "message": "Time slot already booked"
}

This confirms that overlapping meetings are correctly blocked by the backend logic.

  Setup Instructions (Local)
1. Clone the repository
git clone <your-github-repo-url>
cd calendar-booking-backend
2. Install dependencies
npm install
3. Run database migrations
npx sequelize-cli db:migrate
4. Start the server
npm start

The server will run on:

http://localhost:3000

 What This Project Covers:

REST API design using Express

Sequelize ORM with proper models and migrations

Database constraints and relationships

Business logic validation

Clean backend architecture

Author:

Nadipelli Sai Kiran Deepak Rao

Final Note

This project focuses on backend correctness, clean design, and business rule enforcement as required by the assignment. No frontend is included, as the scope is strictly backend.