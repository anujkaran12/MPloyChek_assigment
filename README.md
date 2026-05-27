# MPloyChek Assignment

Angular SPA plus Node.js/TypeScript API using MongoDB.

## Features

- Login with User ID, Password, and Role.
- Seeded Admin and General User accounts.
- JWT session restored on app load.
- Role-based dashboard with user details.
- Async record loading with `delay` query parameter.
- Admin-only user list and update screen for users already in the DB.
- MongoDB persistence with Mongoose.

## Default Users

- Admin: `admin@example.com` / `admin123` / `Admin`
- General User: `user@example.com` / `user123` / `General User`

## Run Locally

1. Start MongoDB locally on `mongodb://127.0.0.1:27017`.
2. Install dependencies:

```bash
npm.cmd install
npm.cmd run install:all
```

3. Start both apps:

```bash
npm.cmd run dev
```

Frontend: `http://localhost:4200`

Backend: `http://localhost:5000`

Set a custom Mongo URI by creating `backend/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/mploycheck_assignment
JWT_SECRET=replace-with-a-local-secret
PORT=5000
```
