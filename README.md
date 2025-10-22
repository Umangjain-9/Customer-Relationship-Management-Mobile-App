Mini CRM - React Native Mobile App

A lightweight, feature-rich Customer Relationship Management (CRM) mobile application built with React Native and Expo. This app provides a clean interface for managing customers and their associated leads on the go.

✨ Features

Authentication: Secure user registration and login with persistent sessions.

Customer Management: Full CRUD (Create, Read, Update, Delete) functionality for customer profiles.

Lead Tracking: Manage sales leads associated with each customer, including status and value.

Search & Pagination: Easily find customers with a real-time search and infinite scroll for long lists.

Dashboard: Visual reporting with charts to track lead status and total sales value.

Form Validation: Robust client-side validation for all user inputs.

Dark/Light Mode: Automatic theme switching based on system settings.

🛠️ Tech Stack

Framework: React Native (Expo)

State Management: Redux Toolkit

Navigation: React Navigation (Stack & Bottom Tabs)

UI Components: React Native Paper

API Client: Axios

Form Handling: Formik & Yup

Charting: React Native Chart Kit

Mock API: json-server

🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Node.js (LTS version)

json-server CLI (npm install -g json-server)

Expo Go app on your mobile device

Installation
Clone the repository

Bash

git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
Install dependencies

Bash

npm install
Set up environment variables

Create a .env file in the project root.

Add your local IP address for the API URL:

API_URL=http://<YOUR_COMPUTER_IP_ADDRESS>:3001
▶️ How to Run
You need to run two processes in separate terminals: the mock API server and the Expo development server.

Start the API Server

Bash

npx json-server --watch db.json --port 3001
Start the Application

Bash

npx expo start
Scan the QR code with the Expo Go app on your phone.
