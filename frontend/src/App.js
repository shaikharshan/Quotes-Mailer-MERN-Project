
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <>
    <Routes>
      <Route exact path='/' element={<Home/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>

    </Routes>
    </>
  );
}

export default App;
