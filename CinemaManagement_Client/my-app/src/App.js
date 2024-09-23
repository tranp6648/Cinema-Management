import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Account from './components/Account/Account';
import Admin from './components/Admin/AdminPage';
import LostPassword from './components/Account/LostPassword';
import ChangePassword from './components/Account/ChangePasword';
function App() {
  return (
<Router>
     <Routes>
      <Route path='/Admin' element={<Admin/>}/>
    <Route path='/Account' element={<Account/>}/>
    <Route path='/ChangePassword' element={<ChangePassword/>}/>
    <Route path='/LostPassword' element={<LostPassword/>}/>
     </Routes>
   </Router>
  );
}

export default App;
