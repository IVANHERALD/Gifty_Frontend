import logo from './logo.svg';
import './App.css';
import Login from './component/Login';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './component/Register';
import Home from './component/Home';
import { AuthProvider } from './component/AuthContext';
import ViewResult from './component/ViewResult';
import Cart from './component/Cart'
import { useState } from 'react';
import UserDetails from './component/UserDetails'
function App() {
  const [currentemail, setcurrentemail] = useState(null);
  const[searchvalue,setsearchvalue]=useState([]);
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div className="App">
      <AuthProvider value={{currentemail,setcurrentemail,searchvalue,setsearchvalue,searchResults,setSearchResults}}>
    <Router>
      <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/Cart" element={<Cart/>}/>
      <Route path="/searchresult" element={<ViewResult/>}/>
      <Route path="/UserDetails" element={<UserDetails/>}/>

      </Routes>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
