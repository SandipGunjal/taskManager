
import "../node_modules/bootstrap/dist/css/bootstrap-grid.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Component/Navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "./Component/Register";
import Login from "./Component/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskList from "./Component/TaskList";
import TaskForm from "./Component/TaskForm";
// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/new" element={<TaskForm />} />
        <Route path="/tasks/edit/:id" element={<TaskForm />} />
      </Routes>
    </Router>
  );
}

export default App;
