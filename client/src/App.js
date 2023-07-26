import './App.css';
import {Routes,Route} from "react-router-dom";
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Route/Private';
import ForgotPassword from './pages/auth/ForgotPassword';

function App() {
  return (
    <>
   <Routes>

<Route path='/' element={<HomePage/>} />
<Route path='/about' element={<About/>} />

<Route path='/dashboard' element={<PrivateRoute/>}>

<Route path='' element={<Dashboard/>} />

</Route>
<Route path='/register' element={<Register/>} />
<Route path='/login' element={<Login/>} />
<Route path='/contact' element={<Contact/>} />
<Route path='/Policy' element={<Policy/>} />
<Route path='/forgot-password' element={<ForgotPassword/>} />

<Route path='/*' element={<Pagenotfound/>} />

   </Routes>
    
    </>
  );
}

export default App;
