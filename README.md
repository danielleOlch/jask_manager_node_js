This is a Node.js application for managing tasks and users.

File Structure
app.js: Main entry point of the application.
models/tasks.js: Defines the schema and model for tasks.
models/users.js: Defines the schema and model for users.
routes/tasksRouter.js: Defines routes for task-related endpoints.
routes/usersRouter.js: Defines routes for user-related endpoints.

Endpoints

Users
GET /users: Get all users.
GET /users/:id: Get user by ID.
GET /users/email/:email: Get user by email.
POST /users: Create a new user.
POST /users/login: Login user.
POST /users/whoami: Get user by token.
DELETE /users/:id: Delete user by ID.
DELETE /users/email/:email: Delete user by email.
PUT /users/:id: Update user by ID.
PUT /users/email/:email: Update user by email.

Tasks
GET /tasks: Get all tasks.
GET /tasks/category/:category: Get tasks by category.
GET /tasks/:id: Get task by ID.
POST /tasks: Create a new task.
DELETE /tasks/:id: Delete task by ID.
DELETE /tasks/category/:category: Delete tasks by category.
PUT /tasks/:id: Update task by ID.
PUT /tasks/category/:category: Update tasks by category.

Dependencies
Express.js: Web framework for Node.js.
Mongoose: MongoDB object modeling tool.
Bcrypt: Library for hashing passwords.
Jsonwebtoken: Library for generating JSON Web Tokens (JWT).
