# RealEstate

A full-stack real estate portal where admins can manage property listings and buyers can browse and save their favourite properties.

## Tech Stack

Frontend - React, TypeScript, Vite, Tailwind CSS
State Management - Redux Toolkit
Backend - Node.js, Express, Sequelize
Database - PostgreSQL (or MySQL)
Auth - JWT (stored in localStorage)
React Router v6 for navigation
Axios for API calls

## How to Run

### Prerequisites

- Node.js v18+
- npm
- PostgreSQL running locally (or your DB of choice)

# 1. Clone the repository

git clone https://github.com/aastharaut/RealEstate.git
cd RealEstate

## 2. Set up the Backend

# Navigate to backend directory

cd backend

# Install dependencies

npm install

# Copy example env file

cp .env.example .env

# Edit .env with your database credentials

# PORT=5000

# DB_HOST=localhost

# DB_USER=postgres

# DB_PASSWORD=yourpassword

# DB_NAME=realestate

# JWT_SECRET=yourkey

## Run database migrations:

npx sequelize-cli db:migrate

# Start the backend server:

npm run dev

Backend runs on `http://localhost:5000`

### 3. Set up the Frontend

# Navigate to frontend directory (open new terminal)

cd frontend

# Install dependencies

npm install

# Create .env file

cp .env.example .env

# Update .env with backend URL

# VITE_SERVER_URL=http://localhost:5000/api

# Start frontend development server

npm run dev

> Frontend runs on `http://localhost:5173`

---

## Roles

ADMIN - Add, edit, delete properties  
BUYER - Browse properties, save and or unsave favourites

# Example Flows

## Flow 1 — Buyer: Sign up -> Browse -> Favourite

Go to /signup and sign up with role BUYER
You are redirected to /login — log in with your credentials
You are redirected to the Properties listings (/property)
Browse the property listings
Click the heart icon on any property card to save it as a favourite
Go to Buyer Dashboard where your saved properties appear under My Favourites
Click heart again on any favourited property to remove it

## Flow 2 — Admin: Login -> Add Property

Go to /signup and sign up with role ADMIN
Go to /login and log in with an ADMIN account
You are redirected to the Admin Dashboard (/admin)
Fill in the Add New Property form:

Title, description, price (in Rs.), address, and an image URL
Paste an image URL from Unsplash or (any other) for a preview
Click Add Property

Navigate to Properties in the navbar to see all listings
Success and error messages appear as toast notifications in the top-right corner

## Flow 3 — Admin: Manage from Properties Page

Log in as ADMIN and navigate to Properties
Hover over any property card — Edit "pencil" and Delete "trash" icons appear
Click the "pencil" Edit icon on any property to update its details
Click the "trash" Delete icon to remove a property
Make changes as you desire and click Update

# Notes

- JWT token is stored in `localStorage` under `accessToken`
- User data is persisted in `localStorage` under `user` and restored into Redux on app load
- Image URLs are stored as plain strings — use [Unsplash](https://unsplash.com) for free property images
- Toast notifications (react-toastify) are used throughout for success and error feedback

# Author

Aastha Raut
