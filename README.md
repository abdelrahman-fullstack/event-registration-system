# Event Registration System API

A RESTful API built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose** that allows users to view events, register for them, and manage their registrations with secure JWT Authentication.

---

## Features
- **User Authentication:** Register & Login with encrypted passwords (`bcryptjs`) and JWT token issuing.
- **Event Management:** Create, view, and retrieve single event details.
- **Registration System:** 
  - Register for events with capacity check.
  - Prevent duplicate registrations.
  - View user's personal registrations (`populate` event data).
  - Cancel registration with authorization check.
- **Security:** Protected routes using custom Express Middleware.

---

## Tech Stack
- **Node.js** & **Express.js**
- **MongoDB** & **Mongoose ODM**
- **JSON Web Tokens (JWT)** & **bcryptjs**
- **Cors** & **dotenv**

---

## Project Structure
```text
event-registration-system/
│
├── src/
│   ├── config/          # Database setup
│   ├── controllers/     # API Business Logic
│   ├── models/          # Mongoose Schemas (User, Event, Registration)
│   ├── routes/          # Express Routes
│   ├── middleware/      # Auth Protection Middleware
│   └── app.js           # Express App Server Entry point
│
├── .env                 # Environment Variables (Ignored)
├── .gitignore
└── package.json
