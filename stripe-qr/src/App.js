import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Success from './pages/Success';
import Error from './pages/Error';
import CoffeeShop from './pages/CoffeeShop';
import Navbar from './components/Nav';
import Checkout from './pages/Checkout';


function App() {

  return (
    <BrowserRouter>
      <Navbar/>

      <Routes>
          <Route path="/error" element={<Error/>}/>

          <Route path="/success" element={<Success />}/>
    
          <Route  element={<Home/>} path="/"/>

          <Route element={<CoffeeShop/>} path="/shop"/>

          <Route element={<Checkout/>} path="/checkout"/>
            
        </Routes>
    </BrowserRouter>
   
  );
}

export default App;
