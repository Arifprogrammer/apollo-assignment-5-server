# Meeting Booking System

## Welcome to Meeting Booking System

Meeting Booking System project require **Node** and **npm** (Npm come out of the box with nodejs)

## Installation

- Make sure you latest version of nodejs installed then run the following commands:

## Run Locally

Clone the project

```bash
  git clone https://github.com/Arifprogrammer/apollo-assignment-3.git
```

Go to the project directory

```bash
  cd apollo-assignment-3
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

then go to: `http://localhost:5000/`

## Live

[Link](https://meeting-room-booking-system-coral.vercel.app/)

## Features

**Auth**

- Authentication
- Authorization

**Admin**

- Access, create, update & delete room.
- Access & create slots.
- Update & delete booking.

**User**

- Access rooms.
- Access slots.
- Make & get booking.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV`

`PORT`

`MONGODB_URL`

`BCRYPT_SALT_ROUND`

`JWT_SECRET`

`ACCESS_TOKEN_EXPIRATION`

## Tech Stack

**Server:** Node, Express, MongoDB, Mongoose, TypeScript
