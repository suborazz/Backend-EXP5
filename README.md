# Backend-EXP5

Getting Started

1. Clone the Repository
   bash
   Copy code
   git clone https://github.com/your-username/mongodb-crud-nodejs.git
   cd mongodb-crud-nodejs
2. Install Dependencies
   Once inside the project directory, install the necessary dependencies using npm:

bash
Copy code
npm install
This will install mongoose and readline.

3. Start MongoDB Server
   Ensure that you have MongoDB running on your system. The default connection string for the local MongoDB server is used in the code:

bash
Copy code
mongodb://localhost:27017/myDatabase
If MongoDB is not running on the default port or if you have a custom configuration, make sure to update the connection string in index.js:

js
Copy code
mongoose.connect("mongodb://localhost:27017/myDatabase", { ... }) 4. Run the Application
To start the application, run the following command:

bash
Copy code
node index.js 5. Perform CRUD Operations
After launching the application, you will be prompted with the following options to perform operations:

Create: Add a new user by providing name, age, and email.
Read: View all users in the MongoDB database.
Update: Update a user's age by providing their email and new age.
Delete: Delete a user by providing their email.
Exit: Close the application and MongoDB connection.
Example Workflow
Create a User:

Input: create
Prompt: Enter name, age, and email separated by a comma:
Example: John Doe, 25, john@example.com
Read Users:

Input: read
Displays all users stored in the database.
Update a User's Age:

Input: update
Prompt: Enter the email of the user to update and the new age (separated by a comma):
Example: john@example.com, 30
Delete a User:

Input: delete
Prompt: Enter the email of the user to delete:
Example: john@example.com

Exit:

Input: exit
Closes the application and disconnects from MongoDB.
