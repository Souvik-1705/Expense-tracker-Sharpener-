import { Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import Navbar from './components/Navbar';
import SignUp from './pages/SignUp';

function App() {
  return (
    <div className="App">
      <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/signUp' element={<SignUp/>}/>
     </Routes>
    </div>
  );
}

export default App;
