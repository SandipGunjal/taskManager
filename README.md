Project Setup
Create a React project:

npx create-react-app task-management-system
cd task-management-system
npm install axios react-router-dom

Frontend 

src/
├── components/
│   ├── TaskForm.js
│   ├── TaskList.js
│   ├── Login.js
│   ├── Register.js
│   ├── Navbar.js
├── App.js
├── index.js
└── CSS/
    └── TaskForm.css
    └── TaskList.css

// Backend Project Structure

task-management-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── taskModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
└── package.json


Initialize the Backend:

Create a directory for the backend and initialize it with Node.js.
Install necessary dependencie

mkdir backend
cd backend
npm init -y
npm install express mongoose bcryptjs jsonwebtoken dotenv nodemon
npm install --save-dev nodemon

