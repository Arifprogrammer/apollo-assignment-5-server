# Reserve Realm - a Meeting Booking System

## Welcome to the Reserve Realm Server

A robust backend for managing and booking meetings. The server manages user accounts, meeting schedules, availability, and booking functionalities.

### Prerequisites

Reserve Realm project require **Node** and **npm** (Npm come out of the box with nodejs)

### Installation

- Make sure you latest version of nodejs installed then run the following commands:

```html
git clone https://github.com/Arifprogrammer/apollo-assignment-5-server.git //
clone the project first npm i // run the command on the root of the project npm
run dev // run the command on the root of the project to start the project
locally
```

then go to: `http://localhost:5000/`

### Key Features

- User Management: User registration and login.
- Room Management: Admin can access, create, update & delete room.
- Meeting Scheduling: Creation, modification, and deletion of meetings.
- Calendar Management: Real-time availability checking and scheduling conflicts detection.
- Booking Functionality: Seamless booking process with payment gateway.

### Technology Stack

- Node.js 🟢
- Express.js 🌐
- Mongoose 🍃
- TypeScript 📘

### Libraries

- Bcrypt
- Cors
- Dotenv
- HTTPS Status
- Json Web Token
- Radash
- Stripe
- TS Node Dev
- Zod

### Configuration

1. Create a .env file in the root directory of the project.
2. Add necessary configuration variables in the .env file. Example:

```html
NODE_ENV=your_node_env PORT=your_port MONGODB_URL==your_db_connection_uri
BCRYPT_SALT_ROUND=your_salt_round JWT_SECRET=your_jwt_secret
ACCESS_TOKEN_EXPIRATION=your_access_token_expiration
PAYMENT_SECRET_KEY=your_stripe_paymet_secret_key
```

### Live

[Link](https://reserve-realm-server.vercel.app)
