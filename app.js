const mongoose = require("mongoose");
const readline = require("readline");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/myDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// Define Schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
});

// Create Model
const User = mongoose.model("User", userSchema);

// Set up readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to ask for the operation and handle the CRUD operations
const askForOperation = () => {
  rl.question(
    "What operation would you like to perform? (create, read, update, delete, exit): ",
    (operation) => {
      switch (operation.toLowerCase()) {
        case "create":
          rl.question(
            "Enter name, age, and email separated by a comma: ",
            (input) => {
              const [name, age, email] = input
                .split(",")
                .map((item) => item.trim());
              createUser(name, age, email);
            }
          );
          break;

        case "read":
          getUsers();
          break;

        case "update":
          rl.question(
            "Enter the email of the user to update and the new age (separated by a comma): ",
            (input) => {
              const [email, newAge] = input
                .split(",")
                .map((item) => item.trim());
              updateUserByEmail(email, newAge);
            }
          );
          break;

        case "delete":
          rl.question("Enter the email of the user to delete: ", (email) => {
            deleteUserByEmail(email.trim());
          });
          break;

        case "exit":
          console.log("Exiting the program.");
          rl.close();
          mongoose.connection.close(); // Close the MongoDB connection
          break;

        default:
          console.log(
            "Invalid operation. Please choose create, read, update, delete, or exit."
          );
          askForOperation(); // Ask again if invalid
      }
    }
  );
};

// CRUD Operations

// Create
const createUser = async (name, age, email) => {
  const user = new User({
    name: name,
    age: parseInt(age),
    email: email,
  });
  await user.save();
  console.log("User created:", user);
  askForOperation(); // Ask for the next operation after completion
};

// Read
const getUsers = async () => {
  const users = await User.find();
  console.log("Users:", users);
  askForOperation(); // Ask for the next operation after completion
};

// Update by Email
const updateUserByEmail = async (email, newAge) => {
  const user = await User.findOneAndUpdate(
    { email: email },
    { age: parseInt(newAge) },
    { new: true }
  );
  if (user) {
    console.log("User updated:", user);
  } else {
    console.log("User not found.");
  }
  askForOperation(); // Ask for the next operation after completion
};

// Delete by Email
const deleteUserByEmail = async (email) => {
  const result = await User.findOneAndDelete({ email: email });
  if (result) {
    console.log("User deleted:", result);
  } else {
    console.log("User not found.");
  }
  askForOperation(); // Ask for the next operation after completion
};

// Start the program by asking for the first operation
askForOperation();
