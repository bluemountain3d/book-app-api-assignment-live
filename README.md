# API and Client README

## Project Overview

This project consists of two parts: an API built with Node.js/Express and a client application built with Vue/Vite. The system manages users, books, and reviews through a MongoDB database.

## Database Structure

The database contains the following clusters:

- `users` - User information
- `books` - Book information
- `reviews` - Reviews

## API (Backend)

### Technologies

- Node.js
- Express
- MongoDB

### Installation

1. Clone the project
2. Navigate to the API folder
3. Install dependencies:

```
npm install
```

### Configuration

Create a `.env` file in the API folder with the following variables:

```
DB_USER = admin
DB_PASSWORD = admin1234
DB_CLUSTER = cluster0.abcdefg.mongodb.net
DB_DATABASE = dbName
JWT_SECRET = secret
```

Replace values with your own database configuration.

### Start the API:

```
npm run dev
```

The API will run on `http://localhost:3000`.

## Client (Frontend)

### Technologies

- Vue.js
- Vite

### Installation

1. Navigate to the Client folder
2. Install dependencies:

```
npm install
```

### Configuration

Create a `.env` file in the Client folder with the following variable:

```
VITE_API_URL = http://localhost:3000/
```

> NOTE! The trailing `/` is important.

### Start the client

```
npm run dev
```

The client application will run on `http://localhost:5173` (default Vite port).

## Usage

After both the API and Client have been started, you can use the system by visiting the client URL in your browser. The API handles database interactions and the client provides the user interface.

## Important Notes for Assessment

- Make sure MongoDB is running and accessible
- Verify that all environment variables are properly configured
- The API must be started before the client for the system to work properly
