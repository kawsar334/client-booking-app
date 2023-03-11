
import './App.css';
import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import Home from './pages/home/Home';
import {Routes, Route,} from "react-router-dom"
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newuser/NewUser';
import ProductLis from './pages/productList/ProductLis';
import Product from './pages/product/Product';
import NewProduct from './pages/newproduct/NewProduct';
import Login from './pages/login/Login';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import {Navigate} from "react-router-dom";
function App() {
  const ProtectedRoute = ({children})=>{
    const { user } = useContext(AuthContext);
    if(!user?.isAdmin ==true){
      return <Navigate to="/login" />
      
    }
    return children ;
   
  }
  const { user } = useContext(AuthContext);

  return (
    <>
   {user?.isAdmin && <Topbar />}

  
 <div className='main_container'>
   {user?.isAdmin && <Sidebar />}
<Routes>
          <Route path='/' element={
            <ProtectedRoute>
            {/* <Home /> */}
              <UserList />

            </ProtectedRoute>
          } />
          <Route path='/user' element={
            <ProtectedRoute>
            <UserList />
            </ProtectedRoute>
          } />
          <Route path='/user/:id' element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          } />
          <Route path='/newuser' element={
              <NewUser />
          } />
          <Route path='/produclist' element={
            <ProtectedRoute>

              <ProductLis />
            </ProtectedRoute>
          } />
          <Route path='/product/:id' element={
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
          } />
          <Route path='/newproduct' element={
            <ProtectedRoute>
              <NewProduct />
            </ProtectedRoute>
          } />
          <Route path='/login' element={<Login />} />
</Routes>
 </div>
    </> 
  );
}

export default App;