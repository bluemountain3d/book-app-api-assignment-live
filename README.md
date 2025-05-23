# Book API with Secure User Management

## Project Overview

This project is a Book API with a focus on secure user management, developed as a group assignment. The system consists of two parts: an API built with Node.js/Express and a client application built with Vue/Vite. The API is partially password-protected and manages data about books, users, and reviews using MongoDB as the database.

## Assignment Description

The assignment involved creating a REST API to manage books, users, and reviews with the following functionality:

- Secure authentication of users with registration, login, and logout
- CRUD operations for users, books, and reviews
- Password-protected administration of the system
- User-friendly client interface to interact with the API
- Correctly structured data model in MongoDB

The API contains three main data models:

1. Users - with information about username, password, admin status, etc.
2. Books - with information about title, author, description, genres, etc.
3. Reviews - with feedback about books and ratings

## Technical Specification

### Technologies

#### Backend (API)

- Node.js
- Express
- MongoDB
- JWT for authentication

#### Frontend (Client)

- Vue.js
- Vite

### Database (MongoDB)

The database has the following structures:

#### Users Collection

- username: String
- password: String (encrypted)
- is_admin: Boolean
- created_at: Date

#### Books Collection

- title: String
- description: String
- author: String
- genres: Array
- image: String
- published_year: Number
- reviews: Array of references to Reviews Collection

#### Reviews Collection

- name: String
- content: String
- rating: Number (1-5)
- created_at: Date

### API Endpoints

The API exposes the following endpoints:

#### User Management

- GET /users - Get all users
- GET /users/:id - Get specific user
- PATCH /users/:id - Update user (requires token)
- DELETE /users/:id - Delete user (requires token)

#### Authentication

- POST /auth/login - Login user
- POST /auth/logout - Logout user
- POST /auth/register - Register new user

#### Books

- GET /books - Get all books
- GET /books/:id - Get specific book with reviews
- POST /books - Create new book (requires token)
- PATCH /books/:id - Update book (requires token)
- DELETE /books/:id - Delete book (requires token)

#### Reviews

- GET /reviews - Get all reviews
- GET /reviews/:id - Get specific review
- POST /reviews - Create new review (requires token)
- PATCH /reviews/:id - Update review (requires token)
- DELETE /reviews/:id - Delete review (requires token)

## Group Members and Areas of Responsibility

Our group consisted of 3 members, with the following distribution of responsibilities:

### Primary Areas of Responsibility

#### Area 1: User Management

- **MongoDB Schema:** User table with username, password, is_admin, and created_at fields
- **API Endpoints:** CRUD operations for users and authentication (login, logout, register)
- **Client Interface:** Registration form, login form, and admin panel to list all users

#### Area 2: Book Management

- **MongoDB Schema:** Book table with title, description, author, genres (array), image, published_year, and reviews (reference)
- **API Endpoints:** CRUD operations for books
- **Client Interface:** Book listing page for visitors and admin panel to manage books

#### Area 3: Review Management

- **MongoDB Schema:** Review table with name, content, rating (1-5), and created_at
- **API Endpoints:** CRUD operations for reviews
- **Client Interface:** Specific book page showing details and allowing users to create reviews and list existing ones

Each member had primary responsibility for their assigned area but collaborated on overlapping aspects. Member assignments:

- [David Brunni](https://github.com/AgnesWilson): Area of responsibility 1
- [Egil Eskilsson](https://github.com/bluemountain3d): Area of responsibility 2
- [Agnes Wilson](https://github.com/DavidBrunni): Area of responsibility 3

## Post-Submission Enhancements

After the group submission, I continued developing the project with a focus on improved performance, accessibility, and maintainability. Key enhancements include:

### Modern Image Optimization

- Converted images to modern formats (AVIF, WebP, JPEG) with appropriate sizing
- Implemented responsive image loading with the `<picture>` element
- Reorganized image assets from `/src/assets/` to `/public/images/` for better resource management

### Component Architecture Improvements

- Restructured component organization for better maintainability
- Refactored BookShelf as a standalone component with props interface
- Implemented shuffle functionality for randomized book display
- Added responsive grid layouts with hover effects

### Accessibility Enhancements

- Added semantic HTML structure throughout the application (main, section tags)
- Improved form structures with proper labels and fieldsets
- Implemented visually-hidden classes for screen readers
- Ensured consistent keyboard navigation

### UI/UX Improvements

- Converted CSS to SCSS with BEM naming methodology
- Created a sticky header with proper z-index layering
- Improved table components with better structure and action columns
- Enhanced button component with flexible width options
- Added text truncation with ellipsis for book descriptions

### Security Enhancements

- Concealed password hashes in admin interfaces
- Prepared CRUD operations with proper authorization controls

### Code Quality

- Removed redundant styling and empty lines
- Improved component structure and naming conventions
- Enhanced base style templates for better responsiveness
- Standardized layout approaches across components

### Future Enhancements

I plan to continue improving the application with the following features:

#### Make site fully responsive
- Add mobile navigation
- Make components and views responsive

#### Enhanced Admin Interface

- Implement full CRUD functionality in the admin tables with update and delete buttons
- Connect these actions directly to database operations
- Replace the "Add Book" dropdown with a dedicated button that opens a modal form
- Create a similar modal approach for user management

#### Improved Authentication Flow

- Convert the login page to a modal dialog for a more seamless user experience
- Integrate registration functionality within the same modal interface
- Remove the separate registration link from the header menu
- Implement automatic login upon successful registration

#### Advanced User Management in Admin panel

- Add the ability to set admin privileges when creating new users
- Create a checkbox option in the user creation form to toggle the `is_admin` status
- Implement proper authorization checks for admin actions
- Add user profile management capabilities

## Installation

### API (Backend)

1. Clone the project
2. Navigate to the API folder
3. Install dependencies:

```
npm install
```

4. Configure environment variables:
   Create a `.env` file in the API folder with the following variables:

```
MONGODB_URL = mongodb+srv://[user]:[password]@[cluster.identifier].mongodb.net/[Database Name]
JWT_SECRET = [your-jwt-secret-key]

```

Replace values with your own database configuration.

5. Start the API:

```
npm run dev
```

The API will run on `http://localhost:3000`.

### Client (Frontend)

1. Navigate to the Client folder
2. Install dependencies:

```
npm install
```

3. Configure environment variables:
   Create a `.env` file in the Client folder with the following variable:

```
VITE_API_URL = https://localhost:3000/
```

> NOTE! The trailing `/` is important.

4. Start the client:

```
npm run dev
```

The client application will run on `http://localhost:5173` (default Vite port).

## Usage

### For Developers

The API can be tested with tools such as Postman, Insomnia, cURL or Thunder Client. Example of an API request:

```bash
# Login as a user
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "exampleuser", "password": "examplepassword"}'
```

### For Client Users

After both the API and Client have been started, you can use the system by visiting the client URL in your browser:

- Visit `/register` to create a new account
- Log in at `/login` with your credentials
- Browse books on the homepage
- Click on a specific book to see details and reviews
- Create reviews for books you have read

### Admin Access

To access the Admin panel, you need to change the user type to admin in the database. This cannot be done through the standard API endpoints for security reasons.

1. Connect to your MongoDB instance
2. Find the user in the `users` collection
3. Update the `is_admin` field to `true`
4. After this change, the user will have access to the Admin panel and administrative functions

Example MongoDB command:

```javascript
db.users.updateOne({ username: 'your_username' }, { $set: { is_admin: true } });
```

## Important Notes for Assessment

- Make sure MongoDB is running and accessible
- Verify that all environment variables are properly configured
- The API must be started before the client for the system to work properly
