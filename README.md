# README for MBPlay Project

## Overview
The MBPlay project is a full-stack web application that allows users to upload videos and images to Firebase, collect their URLs, store them in a MongoDB database, and fetch and play them seamlessly.

This project consists of two main parts:
- **Client**: Built with React, Vite, Axios, Material UI, and React Router DOM.
- **Server**: Built with Express, CORS, Morgan, Dotenv, JWT, and MB64-connect for database management.

## Features
- Upload videos and images to Firebase.
- Store URLs of uploaded files in a MongoDB database.
- Fetch and display URLs for playing media.
- Responsive UI with Material UI components.
- Authentication and security with JWT.
  
## Installation

### Step 1: Clone the Repositories

Clone the client and server repositories to your local machine:

```bash
git clone https://github.com/ManojGowda89/mb-play-.git client
git clone https://github.com/ManojGowda89/mb-paly-server.git server
```

### Step 2: Install Dependencies

Navigate into each directory (client and server) and install the necessary dependencies.

#### For Client:
```bash
cd client
npm i
```

#### For Server:
```bash
cd server
npm i
```

### Step 3: Run the Application

#### For Client:
```bash
cd client
npm run dev
```

#### For Server:
```bash
cd server
npm run dev
```

### Step 4: Access the Application

Once both the client and server are running, you can access the application using the following live links:

- **Client**: [https://mb-play.onrender.com](https://mb-play.onrender.com)
- **Server**: [https://mb-paly-server.onrender.com](https://mb-paly-server.onrender.com)

## Tech Stack

### Client
- **React**: For building the user interface.
- **Vite**: For fast bundling and development.
- **Axios**: For making HTTP requests to the server.
- **Material UI**: For UI components and styling.
- **React Router DOM**: For handling routing and navigation.

### Server
- **Express**: A web framework for building the server.
- **CORS**: Middleware to enable cross-origin resource sharing.
- **Morgan**: For logging HTTP requests.
- **Dotenv**: To manage environment variables.
- **JWT**: For JSON Web Token authentication.
- **MB64-connect**: For connecting to the MongoDB database.
- **MongoDB**: Database to store URLs of uploaded media.
- **Cookie-parser**: To parse cookies for authentication.
- **Nodemon**: For automatically restarting the server during development.

## Features of the Packages Used

### **Express**
Express is a minimal web framework for Node.js that simplifies server-side routing, handling requests, and responses.

### **CORS**
CORS is used to handle cross-origin resource sharing, allowing your server to accept requests from different origins.

### **Morgan**
Morgan is a HTTP request logger middleware for node.js. It helps in logging requests to the server for debugging and monitoring.

### **Dotenv**
Dotenv allows you to load environment variables from a `.env` file, keeping sensitive data like API keys and database credentials out of the source code.

### **MB64-connect**
This package is a MongoDB wrapper to easily connect with MongoDB and perform operations without having to deal with complex database queries directly.

### **JWT (JSON Web Token)**
JWT is used to securely transmit information between the client and server as JSON objects. It is commonly used for authentication.

### **Cookie-parser**
Cookie-parser is a middleware for parsing cookies in HTTP requests. It is often used for managing sessions or user authentication.

### **Nodemon**
Nodemon is used to automatically restart the server whenever there are changes to the code, improving the development workflow.

## Conclusion
MBPlay is a simple yet powerful web application that enables users to upload and play media files. With its modern tech stack and seamless user experience, it offers an intuitive way to manage media content.

For more details, check out the [client repository](https://github.com/ManojGowda89/mb-play-) and [server repository](https://github.com/ManojGowda89/mb-paly-server.git).