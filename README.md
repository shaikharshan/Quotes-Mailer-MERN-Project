** Quote Generator Major development done on 20-07-24 **

** By Arshan ** 

 The project includes a user registration and subscription management system, a random quote generator, and a scheduled email dispatch feature to ensure users receive their daily dose of motivation.

Technologies Used:
Frontend:

React: For building the user interface.
Axios: For making HTTP requests from the frontend to the backend.
HTML/CSS: For structuring and styling the web pages.
Backend:

Node.js: For the server environment.
Express: For creating the server and handling routes.
MongoDB: For the database to store user information and quotes.
Mongoose: For object data modeling (ODM) to work with MongoDB.
Nodemailer: For sending emails to subscribed users.
Cron: For scheduling the email dispatch.
Other:

dotenv: For managing environment variables.

Features:
User Registration and Login: Users can register and log in to manage their subscription.
Subscription Management: Users can subscribe and unsubscribe from the daily quotes service.
Random Quote Generator: Generates a random quote from a curated list of inspirational quotes.
Automated Email Dispatch: Sends daily quotes to all subscribed users using a cron job.
Admin Panel: (Optional) For managing quotes and viewing user subscriptions.

Installation and Setup:

** To start project 
-> Run VS code terminal / cmd with project folder
-> Go to frontend by 'cd frontend'
->npm install
->npm start

For backend, 
Provide MONGO_URI,JWT_SECRET,JWT_LIMIT in a .env file and also a MONGO_URI.js file in /backend/utils folder
You will need to push the quotesData present in frontend/utils folder to your mongoDB database for this to work

Repeat procedure same as frontend on different terminal for running backend
