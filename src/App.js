import { Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import Navbar from './components/Navbar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import CompleteProfile from "./pages/CompleteProfile";


function App() {
  return (
    <div className="App">
      <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/signUp' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/welcome' element={<Welcome/>}/>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/complete-profile" element={<CompleteProfile />} />
     </Routes>
    </div>
  );
}

export default App;
