import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap-grid.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Navbar from './Component/Navbar';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from './Component/Register';
import Login from './Component/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskList from './Component/TaskList';
import TaskCreation from './Component/TaskCreatingForm';



function App() {
  return (
    <Router>
      <ToastContainer />
        <Navbar/>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/tasklist' element={<TaskList/>}/>
          <Route path='/form' element={<TaskCreation/>}/>
        </Routes>
    </Router>
  );
}

export default App;
