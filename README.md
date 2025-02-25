Car Rental API

This is a simple REST API built using Node.js, Express, and MongoDB for managing car rentals. It allows users to:
- Register and log in to the system.
- View their profile information.
- Browse available rental cars with sorting and filtering options.

Technologies Used:
- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens) for authentication
- bcrypt for password hashing


Installation and Setup:

Prerequisites:
- Node.js and npm installed on your system.
- MongoDB installed and running on your local machine.


Clone the Repository:
git clone https://github.com/YOUR_USERNAME/car-rental-api.git
cd car-rental-api

Install Dependencies:
 npm install


Setup Environment Variables
Create a .env file in the root directory with the following variables:
PORT=3000
ACCESS_TOKEN_SECRET=your_secret_key
DB_URL=mongodb://localhost:27017

**Replace your_secret_key with your own secret key for JWT.

Starting the Application
To start the server, run:
node rent.js
The server will start on http://localhost:3000.

Testing the Endpoints
You can use tools like Postman or Insomnia to test the API endpoints.

1. Register
Endpoint:
POST /register

Request Body:
{
  "fullName": "Arta Zejnullahi",
  "email": "arta@egmail.com",
  "username": "artazej",
  "password": "arta12341234"
}

Response:
{
    "message": "User registered successfully",
    "userId": "67bdd06d7385ab147ecc5e01"
}

2. Login
Endpoint:
POST /login

Request Body:
{
  "username": "artazej",
  "password": "arta12341234"
}

Response:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFydGF6ZWoiLCJmdWxsTmFtZSI6IkFydGEgWmVqbnVsbGFoaSIsImVtYWlsIjoiYXJ0YUBlZ21haWwuY29tIiwiaWF0IjoxNzQwNDM1Njg1LCJleHAiOjE3NDA0MzkyODV9.E1NA6ilQWtVGXkyOPzFahzOj7DB5Z4NoIxP4Rc-Yx5s"
}

3. Get Profile (Protected)
Endpoint:
GET /my-profile

Headers:
Authorization: Bearer your_jwt_token

Response:
{
    "fullName": "Arta Zejnullahi",
    "username": "artazej",
    "email": "arta@egmail.com"
}

4. Get Rental Cars
Endpoint:
GET /rental-cars
Optional Query Parameters:
year: Filter by car year
color: Filter by color
steering: Filter by steering type
seats: Filter by number of seats

Example Request:
GET /rental-cars?color=black&year=2015

Response:
[
    {
        "_id": "67bcd3a06826bcc769d44fa6",
        "name": "Golf mk8",
        "price_per_day": 50,
        "year": 2015,
        "color": "black",
        "steering_type": "automatic",
        "number_of_seats": 5
    }
]

Environment Variables:
The application uses the following environment variables:

PORT: The port on which the server will run (default: 3000)
ACCESS_TOKEN_SECRET: Secret key for signing JWT tokens
DB_URL: MongoDB connection string (default: mongodb://localhost:27017)

Example .env file:
PORT=3000
ACCESS_TOKEN_SECRET=your_secret_key
DB_URL=mongodb://localhost:27017


API Endpoints
POST /register: Register a new user
POST /login: Authenticate user and get a JWT token
GET /my-profile: Get logged-in user's profile (Protected)
GET /rental-cars: Get a list of available rental cars with optional filters


Author
Created by Albana Zejnullahi
