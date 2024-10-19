import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Account from './components/Account/Account';
import Admin from './components/Admin/AdminPage';
import LostPassword from './components/Account/LostPassword';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ChangePassword from './components/Account/ChangePasword';
import Profile from './components/Account/Profile';
import SuperAdmin from './components/SuperAdmin/SuperAdmin';
import CAM from './components/SuperAdmin/Category/CAM';
import LayoutSuperAdmin from './components/LayoutSuperAdmin/LayoutSuperAdmin';
import DetailMovie from './components/SuperAdmin/Category/DetailMovie';
import Cinema from './components/SuperAdmin/Cinema/Cinema';
import ManagerAdmin from './components/SuperAdmin/ManagerAdmin/ManagerAdmin';
import HomePage from './components/Homepage/Homepage';
import Blog from './components/SuperAdmin/Blog/Blog';
import About from './components/About/About';
import AllMovies from './components/AllMovies/AllMovies';
import Detail from './components/Detail/Detail';
import DescriptionMovie from './components/SuperAdmin/Category/DescriptionMovie';
import ComboMovie from './components/SuperAdmin/Combo/Combo';
function App() {
  return (
<Router>
     <Routes>
      <Route path='/Admin' element={<ProtectedRoute Element={Admin} RoleRequired="Admin"/>}/>
      <Route path='/SuperAdmin' element={< ProtectedRoute Element={LayoutSuperAdmin} RoleRequired="SuperAdmin" />}>
          <Route index element={<ProtectedRoute Element={SuperAdmin}  RoleRequired="SuperAdmin"/>} />
          <Route path='CAM' element={<ProtectedRoute Element={CAM} RoleRequired="SuperAdmin"/>}/>
          <Route path='Cinema' element={<ProtectedRoute Element={Cinema} RoleRequired="SuperAdmin"/>}/>
          <Route path='DetailMovie/:id' element={<ProtectedRoute Element={DetailMovie} RoleRequired="SuperAdmin"/>}/>
          <Route path='ManagerAdmin' element={<ProtectedRoute Element={ManagerAdmin} RoleRequired="SuperAdmin"/>}/>
          <Route path='Blog' element={<ProtectedRoute Element={Blog} RoleRequired="SuperAdmin"/>}/>
          <Route path='DescriptionMovie/:id' element={<ProtectedRoute Element={DescriptionMovie} RoleRequired="SuperAdmin"/>}/>
          <Route path='ComboFood' element={<ProtectedRoute Element={ComboMovie} RoleRequired="SuperAdmin"/>}/>
        </Route>
        <Route path='/About' element={<About/>}/>
        <Route path='/AllMovie' element={<AllMovies/>}/>
        <Route path='/Home' element={<HomePage/>}/>
        <Route path='/Detail/:id' element={<Detail/>}/>
      <Route path='/ProfileAdmin' element={<Profile/>}/>
    <Route path='/Account' element={<Account/>}/>
    <Route path='/ChangePassword' element={<ChangePassword/>}/>
    <Route path='/LostPassword' element={<LostPassword/>}/>
     </Routes>
   </Router>
  );
}

export default App;
