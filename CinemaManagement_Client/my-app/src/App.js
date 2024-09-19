import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Account from './components/Account/Account';
import Admin from './components/Admin/AdminPage'
function App() {
  return (
<Router>
     <Routes>
      <Route path='/Admin' element={<Admin/>}/>
    <Route path='/Account' element={<Account/>}/>
     </Routes>
   </Router>
  );
}

export default App;
